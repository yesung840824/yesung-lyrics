import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'zh'
    return localStorage.getItem('yesung-lang') || 'zh'
  })

  useEffect(() => {
    localStorage.setItem('yesung-lang', lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en'
  }, [lang])

  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
