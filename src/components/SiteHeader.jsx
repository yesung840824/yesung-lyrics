import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

export default function SiteHeader() {
  const navigate = useNavigate()
  const { lang, setLang, t } = useLang()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand" onClick={() => navigate('/')}>
          <div className="site-header__overline">{t.site.overline}</div>
          <div className="site-header__title">{t.site.title}</div>
        </div>
        <div className="lang-switch">
          <button
            className={lang === 'zh' ? 'active' : ''}
            onClick={() => setLang('zh')}
          >
            JA
          </button>
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  )
}
