import * as React from "react"

export type ToastOptions = {
  id?: string | number
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

type ToastState = ToastOptions & { id: string | number }

const listeners = new Set<React.Dispatch<React.SetStateAction<ToastState[]>>>()
let toasts: ToastState[] = []

function notify() {
  for (const l of listeners) l(toasts)
}

function addToast(opts: ToastOptions) {
  const id = opts.id ?? Date.now()
  const next: ToastState = { id, ...opts }
  toasts = [...toasts, next]
  notify()
  if (opts.duration && opts.duration > 0) {
    setTimeout(() => dismiss(id), opts.duration)
  }
}

export function dismiss(id?: string | number) {
  toasts = id == null ? [] : toasts.filter(t => t.id !== id)
  notify()
}

export function useToast() {
  const [state, setState] = React.useState<ToastState[]>(toasts)
  React.useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])
  return {
    toasts: state,
    toast: addToast,
    dismiss,
  }
}
