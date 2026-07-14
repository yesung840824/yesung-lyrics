import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import HomePage from './pages/HomePage'
import AlbumPage from './pages/AlbumPage'
import PlayerPage from './pages/PlayerPage'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <SiteHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/album/:albumSlug" element={<AlbumPage />} />
            <Route path="/album/:albumSlug/:trackSlug" element={<PlayerPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </BrowserRouter>
    </LangProvider>
  )
}
