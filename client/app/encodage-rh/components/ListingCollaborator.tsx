import { IEmployee } from '@/models/Employee';
import React, { useEffect, useState, useMemo } from 'react'

interface ListingCollaboratorProps {
  searchTerm: string;
  selectedPole: string;
  selectedBench: string;
  selectedStatus: string;
  selectedNiveau: string;
}

function ListingCollaborator({ 
  searchTerm, 
  selectedPole, 
  selectedBench, 
  selectedStatus, 
  selectedNiveau 
}: ListingCollaboratorProps) {
    const [collaborateurs, setCollaborateurs] = useState<IEmployee[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCollaborateurs = async () => {
            setLoading(true);
            const response = await fetch('/api/employees')
            const data = await response.json()
            setCollaborateurs(data.data)
            setLoading(false);
        }
        fetchCollaborateurs()
    }, []);

    // Fonction pour obtenir le niveau actuel d'un collaborateur
    const getCurrentLevel = (collaborateur: IEmployee): string => {
        const rangs = collaborateur['INFORMATION PROFESSIONNELLE']?.rangs;
        if (rangs?.director?.date) return 'Director';
        if (rangs?.manager?.date) return 'Manager';
        if (rangs?.senior?.date) return 'Senior';
        if (rangs?.medior?.date) return 'Medior';
        if (rangs?.junior?.date) return 'Junior';
        return '';
    };

    // Filtrer les collaborateurs
    const filteredCollaborateurs = useMemo(() => {
        return collaborateurs.filter((collaborateur) => {
            // Filtre de recherche (matricule, pseudo, nom, prénoms)
            const searchMatch = searchTerm === '' || 
                collaborateur.MATRICULE?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                collaborateur['INFORMATION PROFESSIONNELLE']?.pseudo?.toLowerCase().includes(searchTerm.toLowerCase())
            // Filtre pôle
            const poleMatch = selectedPole === 'All' || 
                collaborateur['INFORMATION PROFESSIONNELLE']?.pole === selectedPole;

            // Filtre bench
            const benchMatch = selectedBench === 'All' || 
                collaborateur['INFORMATION PROFESSIONNELLE']?.bench === selectedBench;

            // Filtre status
            const statusMatch = selectedStatus === 'All' || 
                collaborateur.Status?.statut === selectedStatus;

            // Filtre niveau
            const niveauMatch = selectedNiveau === 'All' || 
                getCurrentLevel(collaborateur) === selectedNiveau;

            return searchMatch && poleMatch && benchMatch && statusMatch && niveauMatch;
        });
    }, [collaborateurs, searchTerm, selectedPole, selectedBench, selectedStatus, selectedNiveau]);

    return (
        <div className='flex flex-col gap-3'>
            {/* Entêtes */}
            <div className='grid grid-cols-12 items-center gap-3 bg-gray-100 p-2 rounded-md font-medium'>
                <input type="checkbox" className='col-span-1 size-4' />
                <span className='col-span-1 text-sm text-center'>Avatar</span>
                <span className='col-span-2 text-sm text-center'>Matricule</span>
                <span className='col-span-2 text-sm text-center'>Pseudo</span>
                <span className='col-span-2 text-sm text-center'>Pôle</span>
                <span className='col-span-2 text-sm text-center'>Bench</span>
                <span className='col-span-2 text-sm text-center'>Status</span>
            </div>
            {/* Liste des collaborateurs */}
            <div className='flex flex-col gap-2'>
                {loading ? (
                    <div className='flex items-center justify-center py-12'>
                        <div className='w-8 h-8 border-2 border-b-white border-t-violet-900 rounded-full animate-spin'></div>
                    </div>
                ) : filteredCollaborateurs.length === 0 ? (
                    <div className='text-center py-8 text-gray-500'>
                        Aucun collaborateur trouvé avec ces critères
                    </div>
                ) : (
                    filteredCollaborateurs.map((collaborateur) => (
                    <div key={collaborateur._id as string} className='grid grid-cols-12 items-center gap-3 p-2 border border-gray-200 rounded-md hover:bg-gray-50'>
                        <input type="checkbox" className='col-span-1 size-4' />
                        <div className='col-span-1 flex justify-center'>
                            <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
                        </div>
                        <span className='col-span-2 text-sm text-center'>{collaborateur.MATRICULE}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur['INFORMATION PROFESSIONNELLE']?.pseudo || '-'}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur['INFORMATION PROFESSIONNELLE']?.pole || '-'}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur['INFORMATION PROFESSIONNELLE']?.bench || '-'}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur.Status?.statut || '-'}</span>
                    </div>
                    ))
                )}
            </div>
            
            {/* Compteur de résultats */}
            <div className='text-sm text-gray-600 mt-2'>
                {filteredCollaborateurs.length} collaborateur{filteredCollaborateurs.length > 1 ? 's' : ''} affiché{filteredCollaborateurs.length > 1 ? 's' : ''} sur {collaborateurs.length} total
            </div>
        </div>
    )
}

export default ListingCollaborator