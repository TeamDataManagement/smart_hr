'use client'

import React, { useEffect, useState } from 'react'
import { FaArrowTrendDown, FaArrowTrendUp, FaPeopleGroup, FaUser } from 'react-icons/fa6'
import { SlUser, SlUserFemale } from 'react-icons/sl'
import Histogram from './Histogram'
import { IEmployee } from '@/models/Employee'

function Reporting() {
  // Données des employés
  const [data, setData] = useState<IEmployee[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/employees')
      .then(response => response.json())
      .then(data => setData(data.data))
  }, []);

  const getStats = () => {
    const global = data.length;
    const active = data.filter((item) => item.Status.statut === 'Actif').length;
    const male = data.filter((item) => item['INFORMATION PERSONNELLE'].genre === 'H' && item.Status.statut === "Actif").length;
    const female = data.filter((item) => item['INFORMATION PERSONNELLE'].genre === 'F' && item.Status.statut === "Actif").length;
    return { global, active, male, female };
  }

  const buildHistogramData = (field: 'pole' | 'fonction' | 'typeContrat' | 'bench' | 'departure') => {
    const activeEmployees = data.filter((item) => item.Status.statut === 'Actif');
    const counts = new Map<string, number>();
    
    for (const employee of activeEmployees) {
      let value = '';
      if (field === 'departure') {
        value = employee.Status.debauche.raison || 'Actif';
      } else {
        const fieldValue = employee['INFORMATION PROFESSIONNELLE'][field];
        value = typeof fieldValue === 'string' ? fieldValue : '';
      }
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    
    return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
  }
  

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
          <span className='text-gray-500 text-3xl font-bold'>{getStats().global}</span>
        </div>
        <div className='col-span-1 flex flex-col gap-2 border border-stone-300 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm'>Collaborateur Actif</h2>
            <FaUser size={18} />
          </div>
          <span className='text-gray-500 text-3xl font-bold'>{getStats().active}</span>
        </div>
        <div className='col-span-1 flex flex-col gap-2 border border-stone-300 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm'>Effectif masculin</h2>
            <SlUser size={20} />
          </div>
          <span className='text-gray-500 text-3xl font-bold'>{getStats().male}</span>
        </div>
        <div className='col-span-1 flex flex-col gap-2 border border-stone-300 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm'>Effectif féminin</h2>
            <SlUserFemale size={20} />
          </div>
          <span className='text-gray-500 text-3xl font-bold'>{getStats().female}</span>
        </div>
      </div>

      {/* Histogrammes ligne par ligne */}
      <div className='space-y-6'>
        {/* Histogramme des pôles */}
        <Histogram
          data={buildHistogramData('pole')}
          title="Répartition des Effectifs Actifs par Pôle"
        />

        {/* Histogramme des contrats */}
        <Histogram
          data={buildHistogramData('typeContrat')}
          title="Répartition des Effectifs Actifs par Type de Contrat"
        />

        {/* Histogramme des bench */}
        <Histogram
          data={buildHistogramData('bench')}
          title="Répartition des Effectifs Actifs par Bench"
        />
      </div>
    </div>
  )
}

export default Reporting