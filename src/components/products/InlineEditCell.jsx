import { useState, useRef, useEffect } from 'react'

export function InlineEditCell({ value, onSave, type = 'text', className = '' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(value))
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commit = () => {
    const parsed = type === 'number' ? parseFloat(draft) || 0 : draft
    onSave(parsed)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(String(value))
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') cancel()
        }}
        className={`border border-orange-400 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
      />
    )
  }

  return (
    <span
      onClick={() => {
        setDraft(String(value))
        setEditing(true)
      }}
      className={`cursor-pointer hover:bg-orange-50 rounded px-1 py-0.5 transition-colors ${className}`}
      title="Duzenlemek icin tikla"
    >
      {value}
    </span>
  )
}
