import { useLang } from '../contexts/LangContext'

export default function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      — {t.footer} —
    </footer>
  )
}
