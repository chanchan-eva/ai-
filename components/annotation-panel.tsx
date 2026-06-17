"use client"

import { BIAS_OPTIONS, type BiasType } from "@/lib/sample-data"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface AnnotationPanelProps {
  selected: BiasType[]
  onToggle: (bias: BiasType) => void
  note: string
  onNoteChange: (note: string) => void
}

export function AnnotationPanel({
  selected,
  onToggle,
  note,
  onNoteChange,
}: AnnotationPanelProps) {
  return (
    <div className="mt-4 rounded-sm border border-dashed border-border bg-secondary/40 p-3">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-block h-3 w-1 bg-primary" aria-hidden />
        <h4 className="text-sm font-medium text-foreground">人工标注</h4>
        {selected.length > 0 && (
          <span className="ml-auto rounded-sm bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
            {selected.length} 项
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        {BIAS_OPTIONS.map((opt) => {
          const checked = selected.includes(opt.id)
          return (
            <label
              key={opt.id}
              className={cn(
                "flex cursor-pointer items-start gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                checked ? "bg-primary/10" : "hover:bg-secondary",
              )}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() => onToggle(opt.id)}
                className="mt-0.5"
              />
              <span className="leading-tight">
                <span
                  className={cn(
                    "font-medium",
                    checked ? "text-primary" : "text-foreground",
                  )}
                >
                  {opt.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {opt.description}
                </span>
              </span>
            </label>
          )
        })}
      </div>

      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder="批注（可选）：记录具体偏差之处与理由……"
        rows={2}
        className="mt-2 w-full resize-none rounded-sm border border-input bg-card px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
    </div>
  )
}
