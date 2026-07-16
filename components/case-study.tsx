import type {
  CuratedCase,
  ModelId,
  ResearchStats,
  SelectedCaseStats,
} from "@/lib/research"
import { MODEL_COLORS } from "@/lib/research"

interface CaseStudyProps {
  index: number
  stats: SelectedCaseStats
  content: CuratedCase
  data: ResearchStats
}

export function CaseStudy({ index, stats, content, data }: CaseStudyProps) {
  return (
    <article className="research-card overflow-hidden">
      <div className="grid border-b border-border lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
        <div className="border-b border-border bg-secondary/35 p-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-primary">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/35 font-mono tracking-normal">
                {String(index + 1).padStart(2, "0")}
              </span>
              {content.shortCategory}
            </span>
            <span className="font-mono text-xs text-muted-foreground">合计 {stats.total} 次</span>
          </div>
          <h3 className="font-serif text-xl font-semibold leading-snug text-foreground">{stats.title}</h3>
          <p className="mt-2 text-xs text-muted-foreground">文本编号 {stats.textId}</p>
        </div>
        <blockquote className="relative p-5 font-serif text-[15px] leading-loose text-foreground sm:p-6">
          <span className="absolute left-5 top-4 text-3xl leading-none text-primary/25" aria-hidden>
            「
          </span>
          <p className="pl-7">{stats.sourceText}</p>
        </blockquote>
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-3">
        {data.models.map((model) => {
          const modelStats = stats.models[model.id]
          const activeBiases = data.biases.filter((bias) => modelStats.biases[bias.id] > 0)
          return (
            <section key={model.id} className="bg-card p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-serif text-base font-semibold text-foreground">{model.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{model.version}</p>
                </div>
                <span
                  className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 font-mono text-xs text-white"
                  style={{ backgroundColor: MODEL_COLORS[model.id] }}
                  title="该回答的偏差出现次数合计"
                >
                  {modelStats.total}
                </span>
              </div>

              <p className="min-h-24 text-sm leading-relaxed text-foreground">
                {content.summaries[model.id as ModelId]}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`${model.name} 的偏差标签`}>
                {activeBiases.map((bias) => (
                  <span key={bias.id} className="bias-tag">
                    {bias.label}
                    <strong>{modelStats.biases[bias.id]}</strong>
                  </span>
                ))}
              </div>

              {modelStats.note && (
                <p className="mt-4 border-l-2 border-primary/45 pl-3 text-xs leading-relaxed text-muted-foreground">
                  标注说明：{modelStats.note}
                </p>
              )}
            </section>
          )
        })}
      </div>

      <div className="border-t border-border bg-primary/[0.045] px-5 py-4 sm:px-6">
        <div className="grid gap-2 sm:grid-cols-[6rem_1fr]">
          <h4 className="font-serif text-sm font-semibold text-primary">人工分析</h4>
          <p className="text-sm leading-relaxed text-foreground">{content.analysis}</p>
        </div>
      </div>
    </article>
  )
}
