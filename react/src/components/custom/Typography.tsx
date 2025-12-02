import type { ReactNode } from "react"

export const Typography = {
  H1({ children }: { children: ReactNode }) {
    return (
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        {children}
      </h1>
    )
  },

  P({ children, className }: { children: ReactNode, className?: string }) {
    return (
      <p className={`leading-7 not-first:mt-6 ${className}`}>
        {children}
      </p>
    )
  },
}