"use client"

import { MODELS, BIAS_OPTIONS, type ModelId, type BiasType } from "@/lib/sample-data"

interface StatsPanelProps {
  // annotations[modelId] = list of selected bias types
  annotations: Record<ModelId, BiasType[]>
}

const MODEL_COLORS: Record<ModelId, string> = {
  gpt: "var(--chart-1)",
  claude: "var(--chart-2)",
  gemini: "var(--chart-3)",
}

export function StatsPanel({ annotations }: StatsPanelProps) {
  const modelCounts = MODELS.map((m) => ({
    ...m,
    count: annotations[m.id]?.length ?? 0,
  }))
  const maxModelCount = Math.max(1, ...modelCounts.map((m) => m.count))
  const totalBias = modelCounts.reduce((s, m) => s + m.count, 0)

  const biasCounts = BIAS_OPTIONS.map((opt) => {
    const count = MODELS.reduce(
      (s, m) => s + (annotations[m.id]?.filter((b) => b === opt.id).length ?? 0),
      0,
    )
    return { ...opt, count }
  })
  const maxBiasCount = Math.max(1, ...biasCounts.map((b) => b.count))

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-sm border border-border bg-card p-4">
        <div className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
          <h3 className="font-serif text-base font-semibold text-foreground">
            偏差统计
          </h3>
          <span className="text-xs text-muted-foreground">
            共标注 {totalBias} 项
          </span>
        </div>

        {/* 各模型偏差数量 */}
        <section className="mb-5">
          <h4 className="mb-3 text-sm font-medium text-foreground">
            各模型偏差数量
          </h4>
          <div className="flex flex-col gap-2.5">
            {modelCounts.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <span className="w-12 shrink-0 text-xs text-muted-foreground">
                  {m.name}
                </span>
                <div className="relative h-5 flex-1 overflow-hidden rounded-sm bg-secondary">
                  <div
                    className="h-full rounded-sm transition-all duration-500"
                    style={{
                      width: `${(m.count / maxModelCount) * 100}%`,
                      backgroundColor: MODEL_COLORS[m.id],
                      minWidth: m.count > 0 ? "0.5rem" : 0,
                    }}
                  />
                </div>
                <span className="w-5 shrink-0 text-right text-sm font-medium tabular-nums text-foreground">
                  {m.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 各类偏差出现次数 */}
        <section>
          <h4 className="mb-3 text-sm font-medium text-foreground">
            各类偏差出现次数
          </h4>
          <div className="flex flex-col gap-2.5">
            {biasCounts.map((b) => (
              <div key={b.id} className="flex items-center gap-2">
                <span className="w-28 shrink-0 truncate text-xs text-muted-foreground" title={b.label}>
                  {b.label}
                </span>
                <div className="relative h-4 flex-1 overflow-hidden rounded-sm bg-secondary">
                  <div
                    className="h-full rounded-sm bg-primary transition-all duration-500"
                    style={{
                      width: `${(b.count / maxBiasCount) * 100}%`,
                      minWidth: b.count > 0 ? "0.5rem" : 0,
                    }}
                  />
                </div>
                <span className="w-5 shrink-0 text-right text-sm font-medium tabular-nums text-foreground">
                  {b.count}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="rounded-sm border border-dashed border-border bg-secondary/30 p-4">
        <h4 className="mb-2 font-serif text-sm font-semibold text-foreground">
          研究说明
        </h4>
        <p className="text-xs leading-relaxed text-muted-foreground">
          本工具用于比较不同大语言模型在解读魏晋古文时的文化偏差。请研究者逐条审读各模型解读，勾选所属偏差类型，右侧统计将实时更新，辅助量化分析模型在中国古典文本理解上的系统性偏向。
        </p>
      </div>
    </aside>
  )
}
