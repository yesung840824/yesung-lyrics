import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getAlbumBySlug, getYouTubeThumb } from '../data/albums'
import { useLang } from '../contexts/LangContext'

// 單一歌曲列項目
function TrackItem({ track, index, onClick, t }) {
  const [thumbError, setThumbError] = useState(false)
  const thumbUrl = getYouTubeThumb(track.youtubeId)
  const showFallback = !thumbUrl || thumbError

  return (
    <div className="track-item" onClick={onClick}>
      <div className="track-item__num">{String(index + 1).padStart(2, '0')}</div>
      <div className="track-item__thumb">
        {!showFallback && (
          <img
            src={thumbUrl}
            alt=""
            onError={() => setThumbError(true)}
          />
        )}
        <div className="track-item__thumb-play" />
      </div>
      <div>
        <div className="track-item__title">
          {track.titleOrig}
          {track.titleEn && track.titleEn !== track.titleOrig && (
            <span className="track-item__title-en">{track.titleEn}</span>
          )}
        </div>
        {track.isTitleTrack && (
          <div className="track-item__tag">{t.album.titleTrack}</div>
        )}
        {track.tag && !track.isTitleTrack && (
          <div className="track-item__tag mute">{track.tag}</div>
        )}
      </div>
      <div className="track-item__duration">{track.duration}</div>
    </div>
  )
}

export default function AlbumPage() {
  const { albumSlug } = useParams()
  const navigate = useNavigate()
  const { lang, t } = useLang()
  const [coverError, setCoverError] = useState(false)

  const album = getAlbumBySlug(albumSlug)

  if (!album) {
    return (
      <div className="page-wrap">
        <div className="empty-state">
          <div className="empty-state__title">{t.common.notFoundTitle}</div>
          <div className="empty-state__text">{t.common.notFoundText}</div>
          <div className="empty-state__back" onClick={() => navigate('/')}>
            ← {t.common.backHome}
          </div>
        </div>
      </div>
    )
  }

  const title = lang === 'zh' ? album.titleZh : album.titleEn
  const type = lang === 'zh' ? album.typeZh : album.typeEn
  const desc = lang === 'zh' ? album.descZh : album.descEn
  const showCoverFallback = coverError || !album.cover

  return (
    <div className="page-wrap album-page">
      <div className="breadcrumb">
        <Link to="/">{t.player.breadcrumbHome}</Link>
        <span className="sep">/</span>
        <span className="current">{title.toUpperCase()}</span>
      </div>

      <div className="album-hero">
        <div
          className="album-hero__cover"
          style={showCoverFallback ? { background: album.coverGradient } : undefined}
        >
          {!showCoverFallback && (
            <img
              src={album.cover}
              alt={title}
              onError={() => setCoverError(true)}
            />
          )}
          {showCoverFallback && (
            <div className={album.coverTitleEn ? 'album-hero__cover-title serif-en' : 'album-hero__cover-title'}>
              {title}
            </div>
          )}
          <span className={`album-hero__lang-tag ${album.lang}`}>
            {album.lang === 'jp' ? t.common.jp : t.common.kr}
          </span>
        </div>
        <div>
          <div className="album-hero__overline">
            ━━ {type.toUpperCase()} · {album.year}
          </div>
          <h1 className="album-hero__title">{title}</h1>
          <p className="album-hero__desc">{desc}</p>
        </div>
      </div>

      <div className="track-list">
        <div className="track-list__heading">
          <span>{t.album.tracksLabel}</span>
          <span>{String(album.tracks.length).padStart(2, '0')}</span>
        </div>

        {album.tracks.length === 0 && (
          <div className="track-list__empty">{t.album.empty}</div>
        )}

        {album.tracks.map((track, i) => (
          <TrackItem
            key={track.slug}
            track={track}
            index={i}
            t={t}
            onClick={() => navigate(`/album/${album.slug}/${track.slug}`)}
          />
        ))}
      </div>
    </div>
  )
}
