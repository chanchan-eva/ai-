"use client"

import { useMemo, useState } from "react"
import {
  MODELS,
  SAMPLE_ENTRIES,
  type ModelId,
  type BiasType,
  type SampleEntry,
} from "@/lib/sample-data"
import { InterpretationColumn } from "@/components/interpretation-column"
import { StatsPanel } from "@/components/stats-panel"
import { Button } from "@/components/ui/button"

const ACCENT: Record<ModelId, string> = {
  gpt: "var(--chart-1)",
  claude: "var(--chart-2)",
  gemini: "var(--chart-3)",
}

type Annotations = Record<ModelId, BiasType[]>
type Notes = Record<ModelId, string>

const emptyAnnotations = (): Annotations => ({ gpt: [], claude: [], gemini: [] })
const emptyNotes = (): Notes => ({ gpt: "", claude: "", gemini: "" })

export default function Page() {
  const [activeId, setActiveId] = useState(SAMPLE_ENTRIES[0].id)
  const [inputText, setInputText] = useState("")
  const [entry, setEntry] = useState<SampleEntry>(SAMPLE_ENTRIES[0])
  const [annotations, setAnnotations] = useState<Annotations>(emptyAnnotations)
  const [notes, setNotes] = useState<Notes>(emptyNotes)

  const switchEntry = (e: SampleEntry) => {
    setActiveId(e.id)
    setEntry(e)
    setInputText("")
    setAnnotations(emptyAnnotations())
    setNotes(emptyNotes())
  }

  const runDemo = () => {
    // 原型：使用示例数据。若用户输入了文本，则以输入替换原文展示，解读仍用示例。
    const base = SAMPLE_ENTRIES.find((e) => e.id === activeId) ?? SAMPLE_ENTRIES[0]
    setEntry({
      ...base,
      source: inputText.trim()
        ? { title: "自定义文本", author: "—", text: inputText.trim() }
        : base.source,
    })
    setAnnotations(emptyAnnotations())
    setNotes(emptyNotes())
  }

  const toggleBias = (model: ModelId, bias: BiasType) => {
    setAnnotations((prev) => {
      const cur = prev[model]
      return {
        ...prev,
        [model]: cur.includes(bias)
          ? cur.filter((b) => b !== bias)
          : [...cur, bias],
      }
    })
  }

  const setNote = (model: ModelId, note: string) => {
    setNotes((prev) => ({ ...prev, [model]: note }))
  }

  const totalBias = useMemo(
    () => MODELS.reduce((s, m) => s + annotations[m.id].length, 0),
    [annotations],
  )

  return (
    <main className="min-h-screen bg-background">
      {/* 顶部标题栏 */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-1 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary font-serif text-lg text-primary-foreground">
              偏
            </span>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-wide text-foreground">
                AI 文化偏差测试器
              </h1>
              <p className="text-sm text-muted-foreground">
                魏晋古文 · 多模型解读对照 · 文化偏差人工标注
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-6">
        {/* 输入与示例选择 */}
        <section className="mb-6 rounded-sm border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-4 w-1 bg-primary" aria-hidden />
            <h2 className="font-serif text-base font-semibold text-foreground">
              输入魏晋文本
            </h2>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="在此粘贴一段魏晋时期的中文文本，或选择下方示例……（原型演示中，解读结果使用示例数据）"
            className="w-full resize-y rounded-sm border border-input bg-background px-3 py-2 font-serif text-base leading-relaxed text-foreground placeholder:font-sans placeholder:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">示例文本：</span>
            {SAMPLE_ENTRIES.map((e) => (
              <button
                key={e.id}
                onClick={() => switchEntry(e)}
                className={`rounded-sm border px-2.5 py-1 text-xs transition-colors ${
                  activeId === e.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50"
                }`}
              >
                {e.source.title}
              </button>
            ))}
            <Button onClick={runDemo} size="sm" className="ml-auto">
              解读对照
            </Button>
          </div>
        </section>

        {/* 主体：四栏 + 统计 */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {/* 原文栏 */}
            <div className="flex flex-col rounded-sm border border-border bg-card">
              <div className="border-b-2 border-t-2 border-border border-t-primary px-4 py-2.5">
                <h3 className="font-serif text-base font-semibold text-foreground">
                  原文
                </h3>
                <p className="text-xs text-muted-foreground">
                  {entry.source.title}
                  {entry.source.author !== "—" && ` · ${entry.source.author}`}
                </p>
              </div>
              <div className="flex-1 p-4">
                <p className="whitespace-pre-wrap font-serif text-base leading-loose text-foreground">
                  {entry.source.text}
                </p>
              </div>
            </div>

            {/* 三模型解读栏 */}
            {MODELS.map((m) => (
              <InterpretationColumn
                key={m.id}
                model={m}
                text={entry.interpretations[m.id]}
                selected={annotations[m.id]}
                note={notes[m.id]}
                onToggle={(b) => toggleBias(m.id, b)}
                onNoteChange={(n) => setNote(m.id, n)}
                accentColor={ACCENT[m.id]}
              />
            ))}
          </div>

          {/* 右侧统计 */}
          <StatsPanel annotations={annotations} />
        </div>
      </div>

      <footer className="border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground">
          原型演示 · 解读结果为示例数据，未连接真实模型接口 · 当前已标注 {totalBias} 项偏差
        </p>
      </footer>
    </main>
  )
}
