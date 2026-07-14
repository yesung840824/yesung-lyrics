import { useEffect, useRef } from 'react'
import { useLang } from '../contexts/LangContext'

/**
 * Props:
 *   lines: 歌詞陣列
 *   activeIndex: 當前該高亮的索引
 *   onLineClick(line): 點擊某句的回調
 *   assistMode: 目前選中的空耳模式 'kongorZh' / 'romaji' / 'kongorKr' / 'none'
 */
export default function LyricsDisplay({
  lines,
  activeIndex,
  onLineClick,
  assistMode,
}) {
  const { lang } = useLang()
  const boxRef = useRef(null)
  const lineRefs = useRef([])

  // 自動捲動到目前高亮
  useEffect(() => {
    if (activeIndex < 0) return
    const el = lineRefs.current[activeIndex]
    const box = boxRef.current
    if (!el || !box) return

    const boxRect = box.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const offset = elRect.top - boxRect.top - boxRect.height / 2 + elRect.height / 2
    box.scrollBy({ top: offset, behavior: 'smooth' })
  }, [activeIndex])

  return (
    <div className="lyrics-box" ref={boxRef}>
      {lines.map((line, i) => {
        const isActive = i === activeIndex

        // 依語言選翻譯
        const translation = lang === 'zh'
          ? line.translation_zh
          : (line.translation_en || line.translation_zh)

        // 依選中的模式選出要顯示的空耳/羅馬字
        let assistText = null
        if (assistMode === 'kongorZh') assistText = line.kongor_zh
        else if (assistMode === 'romaji') assistText = line.romaji
        else if (assistMode === 'kongorKr') assistText = line.kongor_kr

        return (
          <div
            key={i}
            ref={el => lineRefs.current[i] = el}
            className={`lyric-line ${isActive ? 'active' : ''}`}
            onClick={() => onLineClick(line)}
          >
            {/* 原文（永遠顯示） */}
            <div className="lyric-line__orig">{line.original}</div>

            {/* 空耳/羅馬字（依選項顯示） */}
            {assistText && (
              <div className="lyric-line__assist">{assistText}</div>
            )}

            {/* 中文/英文翻譯（永遠顯示） */}
            {translation && (
              <div className="lyric-line__trans">{translation}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
