'use client'

import React, { useState } from 'react'
import Collaborateur from './Collaborateur'
import AnnivAncien from './AnnivAncien'
import Reporting from './Reporting'
import NewCollaboratorModal from './NewCollaboratorModal'

function Entete() {
    const [activeTab, setActiveTab] = useState('collaborateurs')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    
    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleModalSuccess = () => {
        setRefreshKey(prev => prev + 1) // Force refresh of collaborators list
        setIsModalOpen(false)
    }
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-xl font-bold'>Encodage RH</h1>
                    <button 
                        onClick={handleOpenModal}
                        className='flex items-center gap-2 bg-violet-900 text-white px-4 py-2 rounded-md text-xs hover:bg-violet-800 transition-colors'
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Nouveau collaborateur
                    </button>
                </div>
                <div className='flex items-center gap-6 text-sm'>
                    <button onClick={() => handleTabClick('collaborateurs')} className={`${activeTab === 'collaborateurs' ? 'border-b-2 pb-1 border-violet-900' : 'text-gray-500'}`}>Collaborateurs</button>
                    <button onClick={() => handleTabClick('reporting')} className={`${activeTab === 'reporting' ? 'border-b-2 pb-1 border-violet-900' : 'text-gray-500'}`}>Reporting</button>
                    <button onClick={() => handleTabClick('anniversaire-anciennete')} className={`${activeTab === 'anniversaire-anciennete' ? 'border-b-2 pb-1 border-violet-900' : 'text-gray-500'}`}>Anniversaire ancienneté</button>
                </div>
            </div>
            <div className='w-full'>
                {activeTab === 'reporting' && <Reporting />}
                {activeTab === 'collaborateurs' && <Collaborateur key={refreshKey} />}
                {activeTab === 'anniversaire-anciennete' && <AnnivAncien />}
            </div>

            <NewCollaboratorModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleModalSuccess}
            />
        </div>
    )
}

export default Entete