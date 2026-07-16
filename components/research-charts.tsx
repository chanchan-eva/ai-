import type { BiasId, ModelId, ResearchStats } from "@/lib/research"
import {
  BIAS_COLORS,
  CATEGORY_SAMPLE,
  CATEGORY_SHORT,
  MODEL_COLORS,
} from "@/lib/research"

interface ChartsProps {
  data: ResearchStats
}

function ChartHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="relative border-b border-border px-5 py-4 pr-16">
      <p className="mb-1 text-[11px] font-medium tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{subtitle}</p>
      <span className="chart-blossom" aria-hidden>
        ❖
      </span>
    </div>
  )
}

export function ModelBiasBars({ data }: ChartsProps) {
  const maximum = Math.max(
    ...data.models.flatMap((model) =>
      data.biases.map((bias) => data.summary.byModel[model.id][bias.id]),
    ),
  )

  return (
    <article className="research-card overflow-hidden lg:col-span-7">
      <ChartHeading
        eyebrow="图 01 · 次数比较"
        title="三个模型的偏差类型总次数"
        subtitle="横轴为人工标注的出现次数；所有柱形从零开始，数值来自 15 篇文本的 45 条回答。"
      />
      <div className="p-5">
        <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {data.models.map((model) => (
            <span key={model.id} className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: MODEL_COLORS[model.id] }}
                aria-hidden
              />
              {model.name} · 总计 {data.summary.byModel[model.id].total}
            </span>
          ))}
        </div>

        <div className="space-y-5">
          {data.biases.map((bias) => (
            <div key={bias.id}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{bias.label}</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  合计 {data.summary.byBias[bias.id].total}
                </span>
              </div>
              <div className="space-y-1.5">
                {data.models.map((model) => {
                  const value = data.summary.byModel[model.id][bias.id]
                  return (
                    <div key={model.id} className="grid grid-cols-[3.2rem_1fr_2rem] items-center gap-2">
                      <span className="text-xs text-muted-foreground">{model.name}</span>
                      <div className="h-2.5 overflow-hidden rounded-sm bg-secondary" aria-hidden>
                        <div
                          className="h-full rounded-sm"
                          style={{
                            width: `${(value / maximum) * 100}%`,
                            backgroundColor: MODEL_COLORS[model.id],
                          }}
                        />
                      </div>
                      <span className="text-right font-mono text-xs text-foreground">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export function RadarComparison({ data }: ChartsProps) {
  const width = 520
  const height = 430
  const centerX = 260
  const centerY = 190
  const radius = 132
  const domainMax = 0.3
  const axisCount = data.biases.length
  const angleFor = (index: number) => -Math.PI / 2 + (index * Math.PI * 2) / axisCount
  const pointAt = (index: number, scale: number) => {
    const angle = angleFor(index)
    return [centerX + Math.cos(angle) * radius * scale, centerY + Math.sin(angle) * radius * scale]
  }
  const polygonFor = (scale: number) =>
    data.biases.map((_, index) => pointAt(index, scale).join(",")).join(" ")
  const modelLineStyle: Record<ModelId, string | undefined> = {
    gpt: undefined,
    claude: "9 5",
    gemini: "3 4",
  }

  return (
    <article className="research-card overflow-hidden lg:col-span-5">
      <ChartHeading
        eyebrow="图 02 · 结构比较"
        title="不同模型的偏差结构"
        subtitle="各轴表示该偏差占模型全部偏差次数的比例，外圈为 30%；采用占比而非原始总数比较结构。"
      />
      <div className="px-3 pb-5 pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto h-auto w-full max-w-[34rem]"
          role="img"
          aria-labelledby="radar-title radar-desc"
        >
          <title id="radar-title">GPT、Claude 与 Gemini 的六类偏差占比雷达图</title>
          <desc id="radar-desc">
            雷达图按模型内部总偏差次数归一化。GPT 分布较均衡，Claude 更集中于历史背景遗漏和情感倾向偏差，Gemini 在过度现代化解释上的占比最高。
          </desc>

          {[1 / 3, 2 / 3, 1].map((scale, index) => (
            <polygon
              key={scale}
              points={polygonFor(scale)}
              fill={index % 2 === 0 ? "var(--secondary)" : "transparent"}
              fillOpacity="0.35"
              stroke="var(--border-strong)"
              strokeWidth="1"
            />
          ))}

          {data.biases.map((bias, index) => {
            const [x, y] = pointAt(index, 1)
            const [labelX, labelY] = pointAt(index, 1.27)
            const anchor = labelX < centerX - 8 ? "end" : labelX > centerX + 8 ? "start" : "middle"
            return (
              <g key={bias.id}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="var(--border-strong)"
                  strokeWidth="1"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="fill-foreground text-[12px]"
                >
                  {bias.label.replace("解释", "").replace("偏差", "")}
                </text>
              </g>
            )
          })}

          {[0.1, 0.2, 0.3].map((value) => (
            <text
              key={value}
              x={centerX + 5}
              y={centerY - (value / domainMax) * radius + 12}
              className="fill-muted-foreground font-mono text-[10px]"
            >
              {Math.round(value * 100)}%
            </text>
          ))}

          {data.models.map((model) => {
            const points = data.biases.map((bias, index) => {
              const share = data.summary.byModel[model.id][bias.id] / data.summary.byModel[model.id].total
              return pointAt(index, Math.min(share / domainMax, 1))
            })
            return (
              <g key={model.id}>
                <polygon
                  points={points.map((point) => point.join(",")).join(" ")}
                  fill={MODEL_COLORS[model.id]}
                  fillOpacity="0.08"
                  stroke={MODEL_COLORS[model.id]}
                  strokeWidth="2.5"
                  strokeDasharray={modelLineStyle[model.id]}
                  strokeLinejoin="round"
                />
                {points.map(([x, y], index) => (
                  <circle
                    key={`${model.id}-${data.biases[index].id}`}
                    cx={x}
                    cy={y}
                    r="3.2"
                    fill="var(--card)"
                    stroke={MODEL_COLORS[model.id]}
                    strokeWidth="2"
                  />
                ))}
              </g>
            )
          })}
        </svg>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {data.models.map((model) => (
            <span key={model.id} className="inline-flex items-center gap-2">
              <span
                className="w-7 border-t-2"
                style={{
                  borderColor: MODEL_COLORS[model.id],
                  borderTopStyle: model.id === "gpt" ? "solid" : model.id === "claude" ? "dashed" : "dotted",
                }}
                aria-hidden
              />
              {model.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function CategoryStackedBars({ data }: ChartsProps) {
  const maximum = Math.max(...data.categories.map((category) => data.summary.byCategory[category].total))

  return (
    <article className="research-card overflow-hidden lg:col-span-12">
      <ChartHeading
        eyebrow="图 03 · 类别分布"
        title="四类文本中的偏差分布"
        subtitle="堆叠长度表示原始出现次数，色块表示六类偏差构成；社会结构类含 3 篇，其余类别各含 4 篇。"
      />
      <div className="p-5">
        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {data.biases.map((bias) => (
            <span key={bias.id} className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ backgroundColor: BIAS_COLORS[bias.id] }}
                aria-hidden
              />
              {bias.label}
            </span>
          ))}
        </div>

        <div className="space-y-6">
          {data.categories.map((category) => {
            const counts = data.summary.byCategory[category]
            const width = (counts.total / maximum) * 100
            return (
              <div key={category}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-serif text-sm font-semibold text-foreground">
                      {CATEGORY_SHORT[category]}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">{CATEGORY_SAMPLE[category]}</span>
                  </div>
                  <span className="font-mono text-xs text-foreground">{counts.total} 次</span>
                </div>
                <div className="h-7 overflow-hidden rounded-sm bg-secondary">
                  <div className="flex h-full min-w-[2px]" style={{ width: `${width}%` }}>
                    {data.biases.map((bias) => {
                      const value = counts[bias.id]
                      return (
                        <div
                          key={bias.id}
                          className="relative h-full border-r border-card/40 last:border-r-0"
                          style={{
                            width: `${(value / counts.total) * 100}%`,
                            backgroundColor: BIAS_COLORS[bias.id],
                          }}
                          title={`${bias.label}：${value} 次`}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  {data.biases.map((bias) => (
                    <span key={bias.id}>
                      {bias.label.replace("解释", "").replace("偏差", "")} {counts[bias.id]}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}
