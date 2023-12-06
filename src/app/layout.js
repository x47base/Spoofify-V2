import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spoofify V2',
  description: 'A better version of Spoofify V1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="./scripts/DOMScript.js" defer></script>
        <script src="./scripts/DOMScript2.js" defer></script>
      </head>
      <body className={inter.className}>{children}</body>

    </html>
  )
}
