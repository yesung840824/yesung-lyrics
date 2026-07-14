// 自動掃描 lyrics 資料夾所有 .js 檔
// 你新增歌詞檔後，會自動被偵測到

const modules = import.meta.glob('./lyrics/*.js', { eager: true })

const lyricsMap = {}
for (const path in modules) {
  const data = modules[path].default
  if (data && data.albumSlug && data.trackSlug) {
    lyricsMap[`${data.albumSlug}__${data.trackSlug}`] = data
  }
}

export function getLyrics(albumSlug, trackSlug) {
  return lyricsMap[`${albumSlug}__${trackSlug}`] || null
}
