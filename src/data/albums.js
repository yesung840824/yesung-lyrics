// =========================================================
// 專輯目錄
//
// 新增專輯：在 albums 陣列加一筆，把封面放進 public/covers/
// 新增歌曲：在對應專輯的 tracks 加一筆，YouTube 縮圖會自動顯示
// =========================================================

export const albums = [
  {
    slug: 'here-i-am',
    titleZh: 'Here I Am',
    titleEn: 'Here I Am',
    lang: 'kr',
    typeZh: '迷你一輯',
    typeEn: '1st Mini Album',
    year: 2016,
    cover: '/covers/here-i-am.jpg',
    coverGradient: 'linear-gradient(135deg, #E8DFF5 0%, #B8A5E8 100%)',
    coverTitleEn: false, // false = 用日文粗明朝體 / true = 用英文斜體
    descZh: '藝聲的首張個人迷你專輯，以暖色調的抒情為主軸。共 7 首歌、總長 27:38。',
    descEn: 'Yesung\'s debut solo mini album, anchored in warm-toned ballads. 7 tracks, 27:38 total.',
    tracks: [
      {
        slug: 'here-i-am',
        titleOrig: '문 열어봐',
        titleEn: 'Here I Am',
        duration: '4:28',
        isTitleTrack: true,
        youtubeId: 'SNVxS7DPADI', // 官方 MV
      },
      {
        slug: 'spring-in-me',
        titleOrig: '벚꽃잎',
        titleEn: 'Spring in Me',
        duration: '3:52',
        tag: 'feat. 달총 of CHEEZE',
        youtubeId: '',
      },
      {
        slug: 'between',
        titleOrig: 'Between',
        titleEn: '',
        duration: '3:47',
        youtubeId: '',
      },
      {
        slug: 'we',
        titleOrig: '우리',
        titleEn: 'We',
        duration: '3:38',
        youtubeId: '',
      },
      {
        slug: 'your-echo',
        titleOrig: '메아리',
        titleEn: 'Your Echo',
        duration: '3:45',
        youtubeId: '',
      },
      {
        slug: 'confession',
        titleOrig: '어떤 말로도',
        titleEn: 'Confession',
        duration: '4:20',
        tag: 'feat. 찬열 of EXO',
        youtubeId: '',
      },
      {
        slug: 'my-dear',
        titleOrig: '달의 노래',
        titleEn: 'My Dear',
        duration: '3:48',
        youtubeId: '',
      },
    ],
  },
  {
    slug: 'spring-falling',
    titleZh: 'Spring Falling',
    titleEn: 'Spring Falling',
    lang: 'kr',
    typeZh: '迷你二輯',
    typeEn: '2nd Mini Album',
    year: 2017,
    cover: '/covers/spring-falling.jpg',
    coverGradient: 'linear-gradient(135deg, #D9C5F5 0%, #9B7BE8 100%)',
    coverTitleEn: true,
    descZh: '迷你二輯，主打曲〈Paper Umbrella〉。',
    descEn: '2nd mini album, lead single "Paper Umbrella".',
    tracks: [],
  },
  {
    slug: 'story',
    titleZh: 'Story',
    titleEn: 'Story',
    lang: 'jp',
    typeZh: '日語正規一輯',
    typeEn: '1st Japanese Album',
    year: 2018,
    cover: '/covers/story.jpg',
    coverGradient: 'linear-gradient(135deg, #E8E0DC 0%, #A88F82 100%)',
    coverTitleEn: true,
    descZh: '日語正規一輯，收錄多首暖心抒情之作。',
    descEn: '1st full-length Japanese album, a collection of heartfelt ballads.',
    tracks: [],
  },
  {
    slug: 'pink-magic',
    titleZh: 'Pink Magic',
    titleEn: 'Pink Magic',
    lang: 'kr',
    typeZh: '迷你三輯',
    typeEn: '3rd Mini Album',
    year: 2019,
    cover: '/covers/pink-magic.jpg',
    coverGradient: 'linear-gradient(135deg, #F5D9E8 0%, #E89BB8 100%)',
    coverTitleEn: true,
    descZh: '迷你三輯，主打曲〈Pink Magic〉的明亮輕快。',
    descEn: '3rd mini album, lead single "Pink Magic" with a bright, breezy mood.',
    tracks: [],
  },
  {
    slug: 'beautiful-night',
    titleZh: 'Beautiful Night',
    titleEn: 'Beautiful Night',
    lang: 'jp',
    typeZh: '日語正規二輯',
    typeEn: '2nd Japanese Album',
    year: 2020,
    cover: '/covers/beautiful-night.jpg',
    coverGradient: 'linear-gradient(135deg, #1a1a2e 0%, #3B3B6B 100%)',
    coverTitleEn: true,
    descZh: '日語正規二輯，夜晚主題的成熟之作。',
    descEn: '2nd Japanese album, a mature meditation on the night.',
    tracks: [],
  },
  {
    slug: 'unfading-sensation',
    titleZh: '咲き誇る時を待つのは',
    titleEn: 'Unfading Sensation',
    lang: 'jp',
    typeZh: '日語正規二輯',
    typeEn: '2nd Japanese Full Album',
    year: 2024,
    cover: '/covers/unfading-sensation.jpg',
    coverGradient: 'linear-gradient(135deg, #C5D4F5 0%, #7B95E8 100%)',
    coverTitleEn: false,
    descZh: '最新日語正規專輯，等待盛放的時刻。',
    descEn: 'The latest Japanese full album, awaiting the moment of blossoming.',
    tracks: [],
  },
]

// --- 工具函式 ---

export function getAlbumBySlug(slug) {
  return albums.find(a => a.slug === slug)
}

// 從 YouTube ID 取縮圖，沒有 videoId 就回 null（讓元件顯示漸層 fallback）
export function getYouTubeThumb(videoId) {
  if (!videoId) return null
  // hqdefault 是 YouTube 官方的 480x360 縮圖，任何影片都有
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
