import statsJson from "@/data/research-stats.json"
import casesJson from "@/data/cases.json"

export type ModelId = "gpt" | "claude" | "gemini"
export type BiasId =
  | "modernization"
  | "westernFrame"
  | "contextOmission"
  | "allusionMisread"
  | "sentimentBias"
  | "other"

export interface BiasCounts extends Record<BiasId, number> {
  total: number
}

export interface ModelInfo {
  id: ModelId
  name: string
  version: string
}

export interface ResearchStats {
  meta: {
    sourceWorkbook: string
    sheet: string
    range: string
    textCount: number
    recordCount: number
    modelCount: number
    categoryCount: number
    biasCount: number
    totalBiasOccurrences: number
    unit: string
  }
  models: ModelInfo[]
  biases: { id: BiasId; label: string }[]
  categories: string[]
  summary: {
    byModel: Record<ModelId, BiasCounts>
    byCategory: Record<string, BiasCounts>
    byCategoryAndModel: Record<string, Record<ModelId, BiasCounts>>
    byBias: Record<BiasId, { label: string; total: number }>
  }
  selectedCases: SelectedCaseStats[]
}

export interface SelectedCaseStats {
  textId: string
  title: string
  sourceText: string
  category: string
  total: number
  models: Record<
    ModelId,
    { total: number; biases: Omit<BiasCounts, "total">; note: string }
  >
}

export interface CuratedCase {
  textId: string
  shortCategory: string
  summaries: Record<ModelId, string>
  analysis: string
}

export const researchStats = statsJson as unknown as ResearchStats
export const caseContent = casesJson as {
  selectionRule: string
  cases: CuratedCase[]
}

export const MODEL_COLORS: Record<ModelId, string> = {
  gpt: "var(--chart-1)",
  claude: "var(--chart-2)",
  gemini: "var(--chart-3)",
}

export const BIAS_COLORS: Record<BiasId, string> = {
  modernization: "var(--chart-1)",
  westernFrame: "var(--chart-2)",
  contextOmission: "var(--chart-3)",
  allusionMisread: "var(--chart-4)",
  sentimentBias: "var(--chart-5)",
  other: "var(--chart-6)",
}

export const CATEGORY_SHORT: Record<string, string> = {
  "伦理观念与价值判断": "伦理价值",
  "人际关系与社会结构": "社会结构",
  "审美意象与文学表达": "审美表达",
  "历史典故与文化知识": "典故知识",
}

export const CATEGORY_SAMPLE: Record<string, string> = {
  "伦理观念与价值判断": "4 篇 · 12 条回答",
  "人际关系与社会结构": "3 篇 · 9 条回答",
  "审美意象与文学表达": "4 篇 · 12 条回答",
  "历史典故与文化知识": "4 篇 · 12 条回答",
}
