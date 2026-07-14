# 藝聲跟唱小屋 · Yesung Sing Along

藝聲日韓個人專輯的歌詞跟唱網站。純白底 + 藍紫點綴 + 明朝體標題的雜誌風視覺。

---

## 一、本機跑起來

### 安裝 Node.js
從 [nodejs.org](https://nodejs.org/) 下載 LTS 版本，一路點下一步安裝。

### 啟動
打開終端機，進到專案資料夾：

```bash
npm install    # 第一次要跑，1–2 分鐘
npm run dev    # 啟動本機伺服器
```

瀏覽器打開 `http://localhost:5173` 就會看到網站。要關掉按 `Ctrl+C`。

---

## 二、新增／編輯專輯

編輯 `src/data/albums.js`，在 `albums` 陣列裡加一筆：

```js
{
  slug: 'my-album',                             // 網址用，全小寫、用 - 連接
  titleZh: '中文專輯名',
  titleEn: 'English Album Name',
  lang: 'kr',                                    // 'kr' 或 'jp'
  typeZh: '迷你四輯',
  typeEn: '4th Mini Album',
  year: 2021,
  cover: '/covers/my-album.jpg',                // 封面放 public/covers/
  coverGradient: 'linear-gradient(135deg, #XXX 0%, #YYY 100%)',  // 沒圖時的漸層
  coverTitleEn: false,                          // false=用日文粗明朝 / true=用英文斜體
  descZh: '專輯介紹...',
  descEn: 'Album description...',
  tracks: [
    {
      slug: 'song-one',
      titleOrig: '문 열어봐',                    // 原文歌名（韓/日）
      titleEn: 'Here I Am',                     // 英文歌名（沒有可省略）
      duration: '4:28',
      isTitleTrack: true,                        // 主打曲加這個會顯示 TITLE TRACK 標籤
      tag: 'feat. XXX',                          // 特別標註（合作、featuring）
      youtubeId: 'SNVxS7DPADI',                  // YouTube ID
    },
  ],
}
```

### 沒有封面圖也 OK
不放檔案的話，會自動顯示 `coverGradient` 漸層底 + 專輯名。

### `youtubeId` 怎麼找
YouTube 網址 `https://www.youtube.com/watch?v=SNVxS7DPADI` 的 `v=` 後那串就是。填了之後：
- 專輯頁的歌曲縮圖會自動用 YouTube 官方縮圖
- 歌曲頁播放器會直接嵌入這個影片

---

## 三、新增歌詞

### 檔案位置
在 `src/data/lyrics/` 建一個 JS 檔，檔名格式：`{albumSlug}__{trackSlug}.js`

例：Here I Am 專輯的主打曲 → `here-i-am__here-i-am.js`

### 內容格式
複製 `here-i-am__here-i-am.js` 當範本，重點：

```js
export default {
  albumSlug: 'here-i-am',           // 對應 albums.js 的 slug
  trackSlug: 'here-i-am',           // 對應該專輯 tracks 裡的 slug
  titleOrig: '문 열어봐',
  titleEn: 'Here I Am',
  titleZh: '請開門',
  titleRomanized: 'Mun yeoreobwa',   // 副標題用
  langOrig: 'kr',                    // 'kr' 或 'jp'
  youtubeId: 'SNVxS7DPADI',

  lines: [
    {
      start: 12.0,                   // 這句在影片第幾秒
      original: '핑계가 필요 했었나 봐',
      translation_zh: '或許需要一個藉口',
      translation_en: 'Maybe I needed an excuse',
      kongor_zh: '碰給嘎 匹料 黑搜那 拔',
      // 日文歌另外可填：
      // romaji: '...',
      // kongor_kr: '...',
    },
  ],
}
```

### 時間軸校對訣竅
1. 先大略估算每句秒數
2. 開啟本機網站播放，看高亮跟得上不上
3. 高亮太早 → `start` 加 0.5 秒；太晚 → 減 0.5 秒
4. 一首歌 15 分鐘可以校準

---

## 四、部署到 Vercel（免費 + 自動更新）

### 第一次部署
1. 註冊 [GitHub](https://github.com/) 和 [Vercel](https://vercel.com/)（用 GitHub 登入）
2. 在 GitHub 建新 repository
3. 把專案推上去：
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git remote add origin https://github.com/你的帳號/repo名.git
   git push -u origin main
   ```
4. Vercel → New Project → 選你剛建的 repo → 直接 Deploy
5. 1–2 分鐘拿到 `xxx.vercel.app` 網址

### 之後更新
每次推 GitHub，Vercel 會自動偵測並重新部署：
```bash
git add .
git commit -m "新增 Pink Magic 專輯"
git push
```

不會 Git 也可以直接在 GitHub 網頁改檔案，一樣會觸發自動部署。

---

## 五、綁定自己的網域

1. [Cloudflare](https://www.cloudflare.com/products/registrar/) 或 [Namecheap](https://www.namecheap.com/) 買網域（一年約 300–500 台幣）
2. Vercel 專案 → Settings → Domains → Add → 輸入網域
3. 照 Vercel 指示到網域商設定 DNS
4. 10 分鐘到幾小時內生效，HTTPS 自動配置

---

## 六、加入 Google Analytics 4

1. [analytics.google.com](https://analytics.google.com/) 建立 GA4 資源
2. 拿到測量 ID（`G-XXXXXXXXXX` 格式）
3. 編輯 `index.html`，找到 GA4 註解區塊
4. 移除 `<!--` 和 `-->` 註解符號，把 `G-XXXXXXXXXX` 換成你的 ID
5. Push 到 GitHub 就開始收資料

---

## 七、檔案結構

```
yesung-sing-along/
├─ public/
│  ├─ covers/                  ← 專輯封面放這（沒有也 OK）
│  └─ favicon.svg
├─ src/
│  ├─ data/
│  │  ├─ albums.js             ← 專輯總目錄
│  │  ├─ loader.js             ← 自動載入歌詞（不用動）
│  │  └─ lyrics/               ← 每首歌一個檔案
│  │     └─ here-i-am__here-i-am.js
│  ├─ i18n/
│  │  └─ translations.js       ← 介面文字（中英）
│  ├─ pages/                   ← 三個頁面
│  ├─ components/              ← UI 元件
│  ├─ contexts/                ← 語言切換
│  ├─ App.jsx                  ← 路由
│  ├─ main.jsx
│  └─ index.css                ← 所有樣式
├─ index.html                  ← GA4 設定處
├─ package.json
├─ vite.config.js
└─ vercel.json
```

---

## 八、Here I Am 專輯目前狀態

已建好完整曲目清單（7 首），但只有主打曲「문 열어봐」有示範歌詞（且是佔位內容，需替換為真實歌詞）。

### 接下來每首歌的完成流程

1. 到歌詞網站找該首歌的完整韓文歌詞
2. 貼給 Claude，一次產出：中譯 + 英譯 + 中文空耳 + JSON 檔
3. 把檔案放進 `src/data/lyrics/`
4. 開網站校對時間軸

已建好結構的專輯：Here I Am、Spring Falling、Story、Pink Magic、Beautiful Night、咲き誇る時を待つのは

---

## 常見問題

**Q: MV 沒有播放？**  
確認 `youtubeId` 是否正確。若該影片有版權地區限制，可能需要換個來源。

**Q: 專輯頁的 MV 縮圖顯示不出來？**  
`youtubeId` 空的話會用漸層 fallback，正常。填了正確 ID 就會顯示 YouTube 官方縮圖。

**Q: 空耳切換不見了？**  
韓文歌只顯示「中文空耳」一個按鈕；日文歌會顯示三個。這是設計，不是 bug。

**Q: 想加第三種語言介面？**  
在 `src/i18n/translations.js` 加一組 `ko`，然後在 `SiteHeader.jsx` 加按鈕。
