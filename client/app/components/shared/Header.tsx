import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'>
      <div className='max-w-7xl mx-auto flex items-center justify-between p-4'>
        <Link href='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <Image src='/logo.png' alt='Smart HR' width={40} height={40} />
          <h1 className='text-lg font-bold text-gray-900'>Smart HR</h1>
        </Link>
        <nav className='hidden md:flex items-center gap-8 text-sm'>
          <Link href='/' className='text-gray-600 hover:text-purple-600 transition-colors font-medium'>
            Home
          </Link>
          <Link href='/encodage-rh' className='text-gray-600 hover:text-purple-600 transition-colors font-medium'>
            Encodage RH
          </Link>
          <Link href='/encodage-conges' className='text-gray-600 hover:text-purple-600 transition-colors font-medium'>
            Encodage Congés
          </Link>
          <Link href='/suivi-loop' className='text-gray-600 hover:text-purple-600 transition-colors font-medium'>
            Suivi LOOP
          </Link>
        </nav>
        <Link href='/login' className='bg-purple-950 hover:bg-purple-900 text-sm text-white px-4 py-2 rounded-md transition-colors font-medium'>
          Se connecter
        </Link>
      </div>
    </header>
  )
}

export default Header