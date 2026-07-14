import { useState, useMemo } from 'react'
import { albums } from '../data/albums'
import { useLang } from '../contexts/LangContext'
import AlbumCard from '../components/AlbumCard'

export default function HomePage() {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return albums
    return albums.filter(a => a.lang === filter)
  }, [filter])

  return (
    <div className="page-wrap">
      <div className="filter-bar">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          {t.home.filterAll}
        </button>
        <button
          className={filter === 'kr' ? 'active' : ''}
          onClick={() => setFilter('kr')}
        >
          {t.home.filterKR}
        </button>
        <button
          className={filter === 'jp' ? 'active' : ''}
          onClick={() => setFilter('jp')}
        >
          {t.home.filterJP}
        </button>
      </div>

      <div className="album-grid">
        {filtered.map(album => (
          <AlbumCard key={album.slug} album={album} />
        ))}
      </div>
    </div>
  )
}
