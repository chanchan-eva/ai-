"use client"

import type { ModelInfo, BiasType } from "@/lib/sample-data"
import { AnnotationPanel } from "@/components/annotation-panel"

interface InterpretationColumnProps {
  model: ModelInfo
  text: string
  selected: BiasType[]
  note: string
  onToggle: (bias: BiasType) => void
  onNoteChange: (note: string) => void
  accentColor: string
}

export function InterpretationColumn({
  model,
  text,
  selected,
  note,
  onToggle,
  onNoteChange,
  accentColor,
}: InterpretationColumnProps) {
  return (
    <div className="flex flex-col rounded-sm border border-border bg-card">
      <div
        className="flex items-center justify-between border-b border-border px-4 py-2.5"
        style={{ borderTopColor: accentColor, borderTopWidth: 2 }}
      >
        <div>
          <h3 className="font-serif text-base font-semibold text-foreground">
            {model.name}
          </h3>
          <p className="text-xs text-muted-foreground">{model.fullName}</p>
        </div>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: accentColor }}
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm leading-relaxed text-foreground">{text}</p>
        <AnnotationPanel
          selected={selected}
          onToggle={onToggle}
          note={note}
          onNoteChange={onNoteChange}
        />
      </div>
    </div>
  )
}
