import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import NavBar from './NavBar';
import UserBar from './UserBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ABC Bank App',
  description: 'The perfect bank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-[var(--primary-black)]'>
          <Theme>
            <NavBar />
            <UserBar />
            {children}
          </Theme>
        </div>
      </body>
    </html>
  )
}
