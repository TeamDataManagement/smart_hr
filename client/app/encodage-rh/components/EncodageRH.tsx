'use client'

import React, { useState } from 'react'
import Collaborateur from './Collaborateur'
import AnnivAncien from './AnnivAncien'
import Stagiaire from './Stagiaire'
import Reporting from './Reporting'

function Entete() {
    const [activeTab, setActiveTab] = useState('reporting')
    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-xl font-bold'>Encodage RH</h1>
                    <button className='bg-violet-900 text-white px-4 py-2 rounded-md text-xs'>Nouveau collaborateur</button>
                </div>
                <div className='flex items-center gap-6 text-sm'>
                    <button onClick={() => handleTabClick('reporting')} className={`${activeTab === 'reporting' ? 'border-b-2 pb-1 border-violet-900' : 'text-gray-500'}`}>Reporting</button>
                    <button onClick={() => handleTabClick('collaborateurs')} className={`${activeTab === 'collaborateurs' ? 'border-b-2 pb-1 border-violet-900' : 'text-gray-500'}`}>Collaborateurs</button>
                    <button onClick={() => handleTabClick('anniversaire-anciennete')} className={`${activeTab === 'anniversaire-anciennete' ? 'border-b-2 pb-1 border-violet-900' : 'text-gray-500'}`}>Anniversaire ancienneté</button>
                    <button onClick={() => handleTabClick('suivi-stagiaire')} className={`${activeTab === 'suivi-stagiaire' ? 'border-b-2 pb-1 border-violet-900' : 'text-gray-500'}`}>Suivi stagiaire</button>
                </div>
            </div>
            <div className='w-full'>
                {activeTab === 'reporting' && <Reporting />}
                {activeTab === 'collaborateurs' && <Collaborateur />}
                {activeTab === 'anniversaire-anciennete' && <AnnivAncien />}
                {activeTab === 'suivi-stagiaire' && <Stagiaire />}
            </div>

        </div>
    )
}

export default Entete