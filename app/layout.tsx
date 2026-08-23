import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata={title:'NEROX AISO',description:'NEROX AISO digital rewards platform'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}