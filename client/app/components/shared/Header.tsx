import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='max-w-7xl mx-auto flex items-center justify-between p-4'>
        <Link href='/' className='flex items-center gap-2'>
            <Image src='/logo.png' alt='Smart HR' width={40} height={40} />
            <h1 className='text-xl font-bold'>Smart HR</h1>
        </Link>
        <div className='flex items-center gap-8 text-sm'>
            <Link href='/'>Home</Link>
            <Link href='/encodage-rh'>Encodage RH</Link>
            <Link href='/encodage-conges'>Encodage Cong&eacute;s</Link>
            <Link href='/suivi-loop'>Suivi LOOP</Link>
        </div>
        <button className='bg-purple-950 text-sm text-white px-4 py-2 rounded-md'>
            Se connecter
        </button>
    </div>
  )
}

export default Header