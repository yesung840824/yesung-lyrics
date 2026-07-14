import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

export default function AlbumCard({ album }) {
  const navigate = useNavigate()
  const { lang, t } = useLang()
  const [imgError, setImgError] = useState(false)

  const title = lang === 'zh' ? album.titleZh : album.titleEn
  const showFallback = imgError || !album.cover
  const langTag = album.lang === 'jp' ? t.common.jp : t.common.kr

  return (
    <div className="album-card" onClick={() => navigate(`/album/${album.slug}`)}>
      <div
        className="album-card__cover"
        style={showFallback ? { background: album.coverGradient } : undefined}
      >
        {!showFallback && (
          <img
            src={album.cover}
            alt={title}
            onError={() => setImgError(true)}
          />
        )}
        {showFallback && (
          <div className={album.coverTitleEn ? 'album-card__title-overlay serif-en' : 'album-card__title-overlay'}>
            {title}
          </div>
        )}
        <span className={`album-card__lang-tag ${album.lang}`}>{langTag}</span>
      </div>
      <div className="album-card__info">
        <div>
          <div className="album-card__title">{title}</div>
          <div className="album-card__meta">
            {lang === 'zh' ? album.typeZh : album.typeEn} · {album.year}
          </div>
        </div>
        {album.tracks.length > 0 && (
          <div className="album-card__track-count">{album.tracks.length}</div>
        )}
      </div>
    </div>
  )
}
