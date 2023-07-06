import './globals.css'
import NavBar from './NavBar'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'הכנה למבחן עיצוב מערכות מידע',
  description: 'all the rights reserved to ben rosenbaum',
}

export default function RootLayout({ children }) {

  return (
<html lang='en' >
<body>
  {children}  
</body>

   </html>
  )
}
