import { useState, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAlbumBySlug } from '../data/albums'
import { getLyrics } from '../data/loader'
import { useLang } from '../contexts/LangContext'
import YouTubePlayer from '../components/YouTubePlayer'
import LyricsDisplay from '../components/LyricsDisplay'

export default function PlayerPage() {
  const { albumSlug, trackSlug } = useParams()
  const navigate = useNavigate()
  const { lang, t } = useLang()
  const playerRef = useRef(null)

  // 空耳模式：'none' | 'kongorZh' | 'romaji' | 'kongorKr'
  const [assistMode, setAssistMode] = useState('none')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)

  const album = getAlbumBySlug(albumSlug)
  const lyrics = getLyrics(albumSlug, trackSlug)

  // 找出當前該高亮哪一句
  const handleTimeUpdate = useCallback((seconds) => {
    if (!lyrics) return
    const lines = lyrics.lines
    let idx = -1
    for (let i = lines.length - 1; i >= 0; i--) {
      if (seconds >= lines[i].start) { idx = i; break }
    }
    setActiveIndex(prev => prev === idx ? prev : idx)
  }, [lyrics])

  const handleLineClick = (line) => {
    if (playerRef.current) playerRef.current.seekTo(line.start)
  }

  const handlePauseToggle = () => {
    if (playerRef.current) playerRef.current.toggle()
  }

  if (!album || !lyrics) {
    return (
      <div className="page-wrap">
        <div className="empty-state">
          <div className="empty-state__title">{t.common.notFoundTitle}</div>
          <div className="empty-state__text">{t.common.notFoundText}</div>
          <div className="empty-state__text" style={{ marginTop: 4 }}>
            {t.common.notFoundHint}
          </div>
          <div className="empty-state__back" onClick={() => navigate('/')}>
            ← {t.common.backHome}
          </div>
        </div>
      </div>
    )
  }

  const albumTitle = lang === 'zh' ? album.titleZh : album.titleEn
  const isJp = lyrics.langOrig === 'jp'

  // 決定歌名顯示
  const displayTitle = lyrics.titleOrig
  const displayRomanized = lyrics.titleRomanized
    || (lang === 'zh' ? lyrics.titleZh : lyrics.titleEn)

  // 空耳選項（日文歌顯示 3 個、韓文歌顯示 1 個）
  const assistOptions = [
    { key: 'kongorZh', label: t.player.assistKongorZh, always: true },
    { key: 'romaji', label: t.player.assistRomaji, always: false, jpOnly: true },
    { key: 'kongorKr', label: t.player.assistKongorKr, always: false, jpOnly: true },
  ]

  return (
    <div className="page-wrap player-page">
      <button className="back-btn" onClick={() => navigate(`/album/${album.slug}`)}>
        {t.player.backToAlbum}
      </button>

      <div className="player-title">
        <h1 className="player-title__name">{displayTitle}</h1>
        {displayRomanized && displayRomanized !== displayTitle && (
          <div className="player-title__romanized">{displayRomanized}</div>
        )}
      </div>

      <YouTubePlayer
        ref={playerRef}
        videoId={lyrics.youtubeId}
        onTimeUpdate={handleTimeUpdate}
        onPlayStateChange={setIsPlaying}
      />

      {/* 空耳選項列 + 暫停按鈕 */}
      <div className="assist-bar">
        <div className="assist-bar__group">
          <span className="assist-bar__label">{t.player.assistLabel}</span>
          {assistOptions
            .filter(opt => opt.always || (opt.jpOnly && isJp))
            .map(opt => (
              <button
                key={opt.key}
                className={`assist-bar__btn ${assistMode === opt.key ? 'active' : ''}`}
                onClick={() =>
                  setAssistMode(prev => prev === opt.key ? 'none' : opt.key)
                }
              >
                {opt.label}
              </button>
            ))}
        </div>

        <button
          className="assist-bar__pause"
          onClick={handlePauseToggle}
          aria-label={isPlaying ? t.player.pause : t.player.play}
          title={isPlaying ? t.player.pause : t.player.play}
        >
          {isPlaying ? <span className="pause-icon" /> : <span className="play-icon" />}
        </button>
      </div>

      <LyricsDisplay
        lines={lyrics.lines}
        activeIndex={activeIndex}
        onLineClick={handleLineClick}
        assistMode={assistMode}
      />

      <div className="helper-text">— {t.player.tipClick} —</div>
    </div>
  )
}
