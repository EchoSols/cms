import { createContext, useContext, useMemo, useState } from 'react'

type Toast = { id: number; type: 'success' | 'error' | 'info'; message: string }
type ToastContextValue = {
  notify: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const notify = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }
  const value = useMemo(() => ({ notify }), [])
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(t => (
          <div key={t.id} className={`rounded-md px-4 py-3 shadow text-white ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-slate-800'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}


