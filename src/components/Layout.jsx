import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import NetworkCanvas from './NetworkCanvas'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="app">
      <NetworkCanvas dimmed={!isHome} />
      <Nav />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}
