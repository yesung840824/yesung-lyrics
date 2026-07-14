import { createContext, useContext } from 'react'
import { translations } from '../i18n/translations'

// 目前只有中文，未來可以再加英文
const LangContext = createContext(null)

export function LangProvider({ children }) {
  const lang = 'zh'
  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
