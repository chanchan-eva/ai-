import fs from "node:fs/promises";

const stats = JSON.parse(await fs.readFile(new URL("../data/research-stats.json", import.meta.url), "utf8"));
const cases = JSON.parse(await fs.readFile(new URL("../data/cases.json", import.meta.url), "utf8"));

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const biasIds = stats.biases.map((bias) => bias.id);
const sumBiases = (item) => biasIds.reduce((sum, id) => sum + item[id], 0);

assert(stats.records.length === 45, "Expected 45 model-response records");
assert(new Set(stats.records.map((record) => record.textId)).size === 15, "Expected 15 texts");
assert(new Set(stats.records.map((record) => record.modelId)).size === 3, "Expected 3 models");
assert(new Set(stats.records.map((record) => record.category)).size === 4, "Expected 4 categories");

for (const record of stats.records) {
  for (const id of biasIds) {
    const value = record.biases[id];
    assert(Number.isInteger(value) && value >= 0, `${record.textId}/${record.modelId}/${id} must be a non-negative integer`);
  }
  assert(record.total === sumBiases(record.biases), `${record.textId}/${record.modelId} total mismatch`);
}

const grandTotal = stats.records.reduce((sum, record) => sum + record.total, 0);
assert(grandTotal === 263, "Grand total must equal 263");
assert(grandTotal === stats.meta.totalBiasOccurrences, "Metadata grand total mismatch");

const modelTotal = stats.models.reduce((sum, model) => sum + stats.summary.byModel[model.id].total, 0);
const categoryTotal = stats.categories.reduce((sum, category) => sum + stats.summary.byCategory[category].total, 0);
const biasTotal = biasIds.reduce((sum, id) => sum + stats.summary.byBias[id].total, 0);
assert(modelTotal === grandTotal, "Model summaries do not reconcile");
assert(categoryTotal === grandTotal, "Category summaries do not reconcile");
assert(biasTotal === grandTotal, "Bias summaries do not reconcile");

for (const category of stats.categories) {
  const totalsByText = new Map();
  for (const record of stats.records.filter((item) => item.category === category)) {
    totalsByText.set(record.textId, (totalsByText.get(record.textId) ?? 0) + record.total);
  }
  const maximum = Math.max(...totalsByText.values());
  const selected = stats.selectedCases.find((item) => item.category === category);
  assert(selected, `Missing selected case for ${category}`);
  assert(selected.total === maximum, `Selected case for ${category} is not the highest-count text`);
}

assert(
  JSON.stringify(stats.selectedCases.map((item) => item.textId).sort()) ===
    JSON.stringify(cases.cases.map((item) => item.textId).sort()),
  "Curated cases and statistical cases do not match",
);

console.log(
  JSON.stringify(
    {
      status: "passed",
      records: stats.records.length,
      texts: stats.meta.textCount,
      totalBiasOccurrences: grandTotal,
      byModel: Object.fromEntries(stats.models.map((model) => [model.name, stats.summary.byModel[model.id].total])),
      byCategory: Object.fromEntries(stats.categories.map((category) => [category, stats.summary.byCategory[category].total])),
      selectedCases: stats.selectedCases.map((item) => ({ textId: item.textId, title: item.title, total: item.total })),
    },
    null,
    2,
  ),
);
