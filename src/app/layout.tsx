'use client'
import { CardNavigation } from '@/components/CardNavigation'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './../styles/globals.css'
import { ReactQueryProvider } from './ReactQueryProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} min-w-screen min-h-screen overflow-hidden`}
      >
        <div className="flex px-[182px] top-[113px] absolute">
          <aside>
            <nav className="flex flex-col gap-3">
              <Link prefetch href="/">
                <CardNavigation
                  icon="user"
                  title="Devs"
                  active={pathname === '/'}
                />
              </Link>
              <Link prefetch href="/level">
                <CardNavigation
                  icon="level"
                  title="Níveis"
                  active={pathname === '/level'}
                />
              </Link>
            </nav>
          </aside>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
        <ToastContainer />
      </body>
    </html>
  )
}
