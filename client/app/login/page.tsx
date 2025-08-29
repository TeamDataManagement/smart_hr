import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex max-w-[40%] mx-auto flex-col gap-4 justify-center h-[calc(100vh-100px)]'>
        <div className='flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-2xl font-bold'>Connexion</h1>
            <span>Connectez-vous à votre compte</span>
        </div>
        <form className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email" className='text-sm'>Email</label>
                <input type="email" id="email" name="email" placeholder='your@email.com' className='border border-stone-300 rounded-md p-2 outline-none text-sm'/>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="password" className='text-sm'>Mot de passe</label>
                <input type="password" id="password" name="password" placeholder='********' className='border border-stone-300 rounded-md p-2 outline-none text-sm'/>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember" className='text-sm'>Se souvenir de moi</label>
                </div>
                <Link href="/forgot-password" className='text-sm text-purple-950 hover:underline'>Mot de passe oublié ?</Link>
            </div>
            <button type='submit' className='bg-purple-950 hover:bg-purple-900 text-sm text-white px-4 py-2 rounded-md transition-colors font-medium'>Connexion</button>
            <span className='text-sm text-center'>Ou</span>
            <button className='flex items-center justify-between border border-stone-400 rounded-md w-full'>
                <Image src="/google.svg" alt="google" width={30} height={30} className='pl-2'/>
                <span className='text-sm text-black px-4 py-2 rounded-md transition-colors font-medium'>Se connecter avec Google</span>
                <div></div>
            </button>
        </form> 
    </div>
  )
}
