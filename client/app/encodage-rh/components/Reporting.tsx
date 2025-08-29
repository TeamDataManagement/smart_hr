import React from 'react'
import { FaArrowTrendDown, FaArrowTrendUp, FaPeopleGroup, FaUser } from 'react-icons/fa6'
import { SlUser, SlUserFemale } from 'react-icons/sl'
import Histogram from './Histogram'

function Reporting() {
  // Données des pôles pour l'histogramme
  const poleData = [
    { name: 'POLE BUSINESS SUPPORT', value: 13 },
    { name: 'POLE DELEG', value: 21 },
    { name: 'POLE DIGITAL', value: 3 },
    { name: 'POLE FINANCE', value: 42 },
    { name: 'POLE INTERCO', value: 91 },
    { name: 'POLE SUPPORT', value: 31 }
  ]

  // Données des niveaux pour l'histogramme
  const levelData = [
    { name: 'Chief', value: 1 },
    { name: 'Director', value: 3 },
    { name: 'Junior', value: 34 },
    { name: 'Manager', value: 8 },
    { name: 'Medior', value: 107 },
    { name: 'Senior', value: 48 }
  ]

  // Données des départs pour l'histogramme
  const departureData = [
    { name: 'Licenciement', value: 79 },
    { name: 'Démission', value: 351 },
    { name: 'Rupture à l\'amiable', value: 79 },
    { name: 'Démission pour état de santé', value: 24 },
    { name: 'Essai non concluant', value: 163 },
    { name: 'Abandon de poste', value: 40 },
    { name: 'Fin de contrat CDD', value: 6 },
    { name: 'Démission pour étude', value: 8 },
    { name: 'Retraite', value: 1 },
    { name: 'Décès', value: 1 },
    { name: 'Inaptitude', value: 14 }
  ]

  const contractData = [
    { name: 'Employé(e)', value: 13 },
    { name: 'Prestataire', value: 188 }
  ]

  return (
    <div className='flex flex-col gap-6'>
      <h1>Reporting RH</h1>

      {/* Statistiques générales */}
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-1 flex flex-col gap-2 border border-stone-300 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm'>Effectif Global</h2>
            <FaPeopleGroup size={20} />
          </div>
          <span className='text-gray-500 text-3xl font-bold'>951</span>
          <div className='flex items-center justify-between'>
            <span className='text-green-600 text-sm'>+20 (2.1%)</span>
            <FaArrowTrendUp className='text-green-600'/>
          </div>
        </div>
        <div className='col-span-1 flex flex-col gap-2 border border-stone-300 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm'>Collaborateur Actif</h2>
            <FaUser size={18} />
          </div>
          <span className='text-gray-500 text-3xl font-bold'>201</span>
          <div className='flex items-center justify-between'>
            <span className='text-red-600 text-sm'>-3 (2.1%)</span>
            <FaArrowTrendDown className='text-red-600'/>
          </div>
        </div>
        <div className='col-span-1 flex flex-col gap-2 border border-stone-300 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm'>Effectif masculin</h2>
            <SlUser size={20} />
          </div>
          <span className='text-gray-500 text-3xl font-bold'>100</span>
          <div className='flex items-center justify-between'>
            <span className='text-red-600 text-sm'>-50 (2.1%)</span>
            <FaArrowTrendDown className='text-red-600'/>
          </div>
        </div>
        <div className='col-span-1 flex flex-col gap-2 border border-stone-300 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm'>Effectif féminin</h2>
            <SlUserFemale size={20} />
          </div>
          <span className='text-gray-500 text-3xl font-bold'>101</span>
          <div className='flex items-center justify-between'>
            <span className='text-green-600 text-sm'>+20 (2.1%)</span>
            <FaArrowTrendUp className='text-green-600'/>
          </div>
        </div>
      </div>

      {/* Histogrammes ligne par ligne */}
      <div className='space-y-6'>
        {/* Histogramme des pôles */}
        <Histogram
          data={poleData}
          title="Répartition des Effectifs par Pôle"
        />

        {/* Histogramme des niveaux */}
        <Histogram
          data={levelData}
          title="Répartition des Effectifs par Niveau"
        />

        {/* Histogramme des départs */}
        <Histogram
          data={departureData}
          title="Répartition des Départs par Motif"
        />

        {/* Histogramme des contrats */}
        <Histogram
          data={contractData}
          title="Répartition des Effectifs par Type de Contrat"
        />
      </div>
    </div>
  )
}

export default Reporting