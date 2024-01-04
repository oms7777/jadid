import { Nunito } from 'next/font/google'

import Navbar from './Components/Navbar.tsx/Navbar'
import LoginModal from './Components/modals/LoginModal'
import RegisterModal from './Components/modals/RegisterModal'
import RentModal from './Components/modals/RentModal'

import ToasterProvider from './providers/ToasterProvider'

import './globals.css'
import ClientOnly from './Components/ClientOnly'
import getCurrentUser from "./actions/getCurrentUser"
import SearchModal from './Components/modals/SearchModal'



export const metadata = {
  title: 'Jadid',
  description: 'Jadid power',
}
const font = Nunito ({
    subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
        {children}
        </div>
      </body>
    </html>
  )
}
