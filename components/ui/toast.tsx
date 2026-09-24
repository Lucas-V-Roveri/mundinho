"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

type ToastVariant = "advancement" | "info" | "warning" | "error";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastRecord = Required<Pick<ToastInput, "title" | "variant" | "duration">> &
  Pick<ToastInput, "description"> & { id: number };

type ToastContextValue = {
  toast: (input: ToastInput) => number;
  dismiss: (id: number) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);
let toastSequence = 0;

const variantClasses: Record<ToastVariant, string> = {
  advancement: "border-torch-700 bg-night-900 text-paper-50 before:bg-torch-500",
  info: "border-stone-700 bg-paper-100 text-ink-900 before:bg-stone-500",
  warning: "border-torch-700 bg-torch-100 text-ink-900 before:bg-torch-500",
  error: "border-redstone-900 bg-redstone-100 text-ink-900 before:bg-redstone-500",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const timers = React.useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = React.useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = React.useCallback(
    ({ title, description, variant = "advancement", duration = 4200 }: ToastInput) => {
      const id = ++toastSequence;
      setToasts((current) => [...current, { id, title, description, variant, duration }]);
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
      return id;
    },
    [dismiss],
  );

  React.useEffect(
    () => () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div
        role="region"
        aria-label="Conquistas e avisos"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-3 top-3 z-[100] flex flex-col items-end gap-3 sm:left-auto sm:w-[25rem]"
      >
        {toasts.map((item) => (
          <article
            key={item.id}
            className={cn(
              "pixel-toast pointer-events-auto relative w-full overflow-hidden border-4 p-4 pl-5 shadow-pixel before:absolute before:inset-y-0 before:left-0 before:w-2",
              variantClasses[item.variant],
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <strong className="block font-label text-xl leading-none">{item.title}</strong>
                {item.description ? <p className="mt-2 text-sm leading-5 opacity-85">{item.description}</p> : null}
              </div>
              <button
                type="button"
                className="font-label text-xl leading-none opacity-70 hover:opacity-100"
                aria-label={`Fechar aviso: ${item.title}`}
                onClick={() => dismiss(item.id)}
              >
                ×
              </button>
            </div>
          </article>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast precisa estar dentro de ToastProvider");
  return context;
}
