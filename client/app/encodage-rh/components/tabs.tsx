'use client'

import React, { useState } from 'react'
import Reporting from './Reporting'
import Encodage from './Encodage'
import AnnivColab from './AnnivColab'
import AnnivAncien from './AnnivAncien'

function Tabs() {
  const [activeTab, setActiveTab] = useState('REPORTING')

  const tabs = [
    { id: 'REPORTING', label: 'REPORTING', component: <Reporting /> },
    { id: 'ENCODAGE', label: 'ENCODAGE', component: <Encodage /> },
    { id: 'ANNIV_COLAB', label: 'ANNIVERSAIRE (Collaborateur)', component: <AnnivColab /> },
    { id: 'ANNIV_ANCIEN', label: 'ANNIVERSAIRE (Ancienneté)', component: <AnnivAncien /> }
  ]

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Tabs Navigation */}
      <div className='flex items-center gap-2 mb-8 border-b border-gray-200'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-xs transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-purple-950 border-purple-950'
                : 'text-gray-600 border-transparent hover:text-purple-700 hover:border-purple-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className='min-h-96'>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  )
}

export default Tabs