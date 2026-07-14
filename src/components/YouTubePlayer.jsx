import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react'

// 全域只載入一次 YouTube IFrame API
let apiPromise = null
function loadYouTubeAPI() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT)
  })
  return apiPromise
}

/**
 * Props:
 *   videoId: YouTube 影片 ID
 *   onTimeUpdate(seconds): 每 ~250ms 回報播放秒數
 *   onPlayStateChange(isPlaying): 播放狀態變化時觸發
 *
 * Methods (透過 ref):
 *   seekTo(seconds): 跳到指定秒數並播放
 *   pause(): 暫停
 *   play(): 播放
 *   toggle(): 切換播放/暫停
 */
const YouTubePlayer = forwardRef(function YouTubePlayer(
  { videoId, onTimeUpdate, onPlayStateChange },
  ref
) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const intervalRef = useRef(null)

  useImperativeHandle(ref, () => ({
    seekTo: (seconds) => {
      const p = playerRef.current
      if (p && typeof p.seekTo === 'function') {
        p.seekTo(seconds, true)
        if (typeof p.playVideo === 'function') p.playVideo()
      }
    },
    pause: () => {
      const p = playerRef.current
      if (p && typeof p.pauseVideo === 'function') p.pauseVideo()
    },
    play: () => {
      const p = playerRef.current
      if (p && typeof p.playVideo === 'function') p.playVideo()
    },
    toggle: () => {
      const p = playerRef.current
      if (!p) return
      const state = typeof p.getPlayerState === 'function' ? p.getPlayerState() : -1
      // 1 = playing
      if (state === 1) p.pauseVideo()
      else p.playVideo()
    },
  }), [])

  useEffect(() => {
    let cancelled = false

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !containerRef.current) return

      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            intervalRef.current = setInterval(() => {
              const p = playerRef.current
              if (p && typeof p.getCurrentTime === 'function') {
                const s = p.getCurrentTime()
                if (typeof s === 'number' && onTimeUpdate) onTimeUpdate(s)
              }
            }, 250)
          },
          onStateChange: (e) => {
            // 1 = playing, 2 = paused
            if (onPlayStateChange) {
              onPlayStateChange(e.data === 1)
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  return (
    <div className="video-wrap">
      <div ref={containerRef} />
    </div>
  )
})

export default YouTubePlayer
