import { useNavigate } from 'react-router-dom'

export default function SiteHeader() {
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand" onClick={() => navigate('/')}>
          <h1 className="site-header__title">
            <span className="site-header__dot">•</span> Yesung's Songs
          </h1>
          <div className="site-header__sub">sing along to every song, 2016 – 2024</div>
        </div>
      </div>
    </header>
  )
}
