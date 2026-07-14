// =========================================================
// 歌詞資料 — 範本
//
// 檔名格式：{album-slug}__{track-slug}.js
// 例如：story__ame-nochi-hare.js
//
// 每行歌詞欄位說明：
//   start: 必填。這句歌詞在 YouTube 影片的第幾秒（小數可）
//   end: 選填。這句結束的秒數。沒填的話會自動用下一句的 start。
//   original: 必填。原文歌詞（日文或韓文）
//   translation_zh: 中文翻譯
//   translation_en: 英文翻譯
//   romaji: 羅馬字（日文歌用）
//   kongor_zh: 中文空耳
//   kongor_kr: 韓文空耳（日文歌可用）
// =========================================================

export default {
  // 基本資訊
  albumSlug: 'story',
  trackSlug: 'ame-nochi-hare',
  titleZh: '雨のち晴れの空の色',
  titleEn: 'Ame Nochi Hare',
  langOrig: 'jp', // 'jp' or 'kr' — 決定原文要用哪套字型

  // YouTube 影片 ID（網址裡 ?v= 後面那一串）
  // 例如 https://www.youtube.com/watch?v=dQw4w9WgXcQ → 'dQw4w9WgXcQ'
  youtubeId: 'dQw4w9WgXcQ', // 之後換成正式的

  // 歌詞陣列（按時間順序）
  lines: [
    {
      start: 8.5,
      original: '遠くで聞こえる 君の歌声',
      translation_zh: '在遠方聽見了 你的歌聲',
      translation_en: 'I hear your singing voice from afar',
      romaji: 'tooku de kikoeru kimi no utagoe',
      kongor_zh: '偷哭 累 key扣A路 key咪no 烏他狗A',
    },
    {
      start: 14.2,
      original: '雨上がりの空 虹がかかる',
      translation_zh: '雨後的天空 掛起了彩虹',
      translation_en: 'After the rain, a rainbow appears in the sky',
      romaji: 'ameagari no sora niji ga kakaru',
      kongor_zh: '阿妹阿嘎里no 搜啦 你及嘎 卡卡魯',
    },
    {
      start: 20.8,
      original: 'いつかまた 君に会えるなら',
      translation_zh: '如果有一天 還能再見到你',
      translation_en: 'If someday I could meet you again',
      romaji: 'itsuka mata kimi ni aeru nara',
      kongor_zh: '一資卡 媽他 key咪你 阿A魯 那啦',
    },
    {
      start: 27.5,
      original: 'この想いを伝えたい',
      translation_zh: '想要傳達這份心意',
      translation_en: 'I want to tell you how I feel',
      romaji: 'kono omoi wo tsutaetai',
      kongor_zh: '口no 歐謀A 偶 資他A 太一',
    },
    {
      start: 34.1,
      original: '空の色が変わるように',
      translation_zh: '就像天空的顏色變化般',
      translation_en: 'Just as the colors of the sky change',
      romaji: 'sora no iro ga kawaru you ni',
      kongor_zh: '搜啦 no 一摟嘎 卡哇路 又you 你',
    },
  ],
}
