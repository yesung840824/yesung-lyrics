// =========================================================
// 歌詞資料範本
//
// 檔名格式：{albumSlug}__{trackSlug}.js
//
// 每行歌詞欄位：
//   start: 這句歌詞在 YouTube 影片的第幾秒（小數可）
//   original: 原文（韓文/日文）
//   translation_zh: 中文翻譯
//   translation_en: 英文翻譯（選填）
//   romaji: 羅馬字（日文歌用）
//   kongor_zh: 中文空耳
//   kongor_kr: 韓文空耳（日文歌用）
// =========================================================

export default {
  albumSlug: 'here-i-am',
  trackSlug: 'here-i-am',
  titleOrig: '문 열어봐',
  titleEn: 'Here I Am',
  titleZh: '請開門',
  titleRomanized: 'Mun yeoreobwa',
  langOrig: 'kr', // 'kr' 韓文 / 'jp' 日文

  youtubeId: 'SNVxS7DPADI', // 官方 MV

  // ⚠️ 佔位歌詞。等你貼真的歌詞我會替換整份
  lines: [
    {
      start: 12.0,
      original: '핑계가 필요 했었나 봐',
      translation_zh: '或許需要一個藉口',
      translation_en: 'Maybe I needed an excuse',
      kongor_zh: '碰給嘎 匹料 黑搜那 拔',
    },
    {
      start: 17.5,
      original: '편의점 앞에서 술을 조금 마셨어',
      translation_zh: '在便利商店前喝了點酒',
      translation_en: 'I had a bit of a drink in front of the convenience store',
      kongor_zh: '匹niE曾 阿配搜 蘇嚕 揪跟 媽休搜',
    },
    {
      start: 24.0,
      original: '정말 조금 인데도 세상이 흐려지는 게',
      translation_zh: '明明只喝了一點 世界卻開始模糊',
      translation_en: 'Even though it was just a little, the world grows hazy',
      kongor_zh: '從馬 揪跟 in day多 sE傷一 呵溜幾能 給',
    },
    {
      start: 30.5,
      original: '좀 취한 것 같아',
      translation_zh: '好像有點醉了',
      translation_en: 'I think I\'m a little drunk',
      kongor_zh: '從 娶憨 勾 卡他',
    },
  ],
}
