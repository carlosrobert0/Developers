import { CardNavigation } from '@/components/CardNavigation'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desenvolvedores de Software',
  description: 'Desenvolvedores de software com niveis de experiencia variados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-w-screen min-h-screen overflow-hidden`}
      >
        <div className="flex px-[182px] top-[113px] absolute">
          <aside>
            <nav className="flex flex-col gap-3">
              <Link prefetch href="/">
                <CardNavigation icon="user" title="Devs" active />
              </Link>
              <Link prefetch href="/level">
                <CardNavigation icon="level" title="Níveis" active={false} />
              </Link>
            </nav>
          </aside>
          {children}
        </div>
      </body>
    </html>
  )
}
