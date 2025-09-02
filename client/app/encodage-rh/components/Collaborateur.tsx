import { IEmployee } from '@/models/Employee';
import React, { useEffect, useState } from 'react'
import ListingCollaborator from './ListingCollaborator'

function Collaborateur() {
  const [poles, setPoles] = useState<string[]>([]);
  const [benchs, setBenchs] = useState<string[]>([]);
  
  // États temporaires pour les filtres (avant validation)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPole, setSelectedPole] = useState('All');
  const [selectedBench, setSelectedBench] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Actif');
  const [selectedNiveau, setSelectedNiveau] = useState('All');
  
  // États appliqués (après validation)
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [appliedSelectedPole, setAppliedSelectedPole] = useState('All');
  const [appliedSelectedBench, setAppliedSelectedBench] = useState('All');
  const [appliedSelectedStatus, setAppliedSelectedStatus] = useState('Actif');
  const [appliedSelectedNiveau, setAppliedSelectedNiveau] = useState('All');

  useEffect(() => {
    const fetchPolesBenchs = async () => {
      try {
        const response = await fetch('/api/employees/poles-benchs')
        const data = await response.json()
        console.log('Response poles-benchs:', data)
        if (data.success) {
          setPoles(data.data.poles.list)
          setBenchs(data.data.benchs.list)
        } else {
          console.error('Erreur API:', data.error)
        }
      } catch (error) {
        console.error('Erreur fetch poles-benchs:', error)
      }
    }
    fetchPolesBenchs()
  }, []);

  // Fonction pour valider les filtres
  const handleValidate = () => {
    setAppliedSearchTerm(searchTerm);
    setAppliedSelectedPole(selectedPole);
    setAppliedSelectedBench(selectedBench);
    setAppliedSelectedStatus(selectedStatus);
    setAppliedSelectedNiveau(selectedNiveau);
  };

  // Fonction pour réinitialiser les filtres
  const handleReset = () => {
    setSearchTerm('');
    setSelectedPole('All');
    setSelectedBench('All');
    setSelectedStatus('Actif');
    setSelectedNiveau('All');
    setAppliedSearchTerm('');
    setAppliedSelectedPole('All');
    setAppliedSelectedBench('All');
    setAppliedSelectedStatus('Actif');
    setAppliedSelectedNiveau('All');
  };

  console.log(poles, benchs)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-12 gap-3'>
          <input 
            type="text" 
            placeholder='Pseudo et/ou Matricule' 
            className='col-span-3 border border-stone-300 rounded-md p-2 outline-none text-sm placeholder:text-sm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className='col-span-2 text-sm border border-stone-300 rounded-md p-2 outline-none'
            value={selectedPole}
            onChange={(e) => setSelectedPole(e.target.value)}
          >
            <option value="All">Pole</option>
            {poles.map((pole) => (
              <option key={pole} value={pole}>{pole}</option>
            ))}
          </select>
          <select 
            className='col-span-2 text-sm border border-stone-300 rounded-md p-2 outline-none'
            value={selectedBench}
            onChange={(e) => setSelectedBench(e.target.value)}
          >
            <option value="All">Bench</option>
            {benchs.map((bench) => (
              <option key={bench} value={bench}>{bench}</option>
            ))}
          </select>
          <select 
            className='col-span-2 text-sm border border-stone-300 rounded-md p-2 outline-none'
            value={selectedNiveau}
            onChange={(e) => setSelectedNiveau(e.target.value)}
          >
            <option value="All">Niveau</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
          </select>
          <select 
            className='col-span-1 text-sm border border-stone-300 rounded-md p-2 outline-none'
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
          <button 
            onClick={handleValidate}
            className='col-span-1 bg-violet-900 text-sm text-white rounded-md p-2 hover:bg-blue-600 transition-colors'
          >
            Valider
          </button>
          <button 
            onClick={handleReset}
            className='col-span-1 bg-stone-500 text-sm text-white rounded-md p-2 hover:bg-stone-600 transition-colors'
          >
            Réinitialiser
          </button>
        </div>
      </div>
      <ListingCollaborator 
        searchTerm={appliedSearchTerm}
        selectedPole={appliedSelectedPole}
        selectedBench={appliedSelectedBench}
        selectedStatus={appliedSelectedStatus}
        selectedNiveau={appliedSelectedNiveau}
      />
    </div>
  )
}

export default Collaborateur