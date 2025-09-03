import { IEmployee } from '@/models/Employee';
import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion';

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
    const router = useRouter()
    const [collaborateurs, setCollaborateurs] = useState<IEmployee[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

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

    // Paginer les résultats
    const paginatedCollaborateurs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredCollaborateurs.slice(startIndex, endIndex);
    }, [filteredCollaborateurs, currentPage, itemsPerPage]);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(filteredCollaborateurs.length / itemsPerPage);

    // Réinitialiser la page quand les filtres changent
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedPole, selectedBench, selectedStatus, selectedNiveau]);

    return (
        <div className='flex flex-col gap-3'>
            {/* Pagination en haut */}
            {totalPages > 1 && (
                <div className='flex items-center justify-between px-2 py-2 bg-gray-50 rounded-md'>
                    <div className='text-sm text-gray-600'>
                        Page {currentPage} sur {totalPages} - {filteredCollaborateurs.length} collaborateur{filteredCollaborateurs.length > 1 ? 's' : ''} au total
                    </div>
                    
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className='flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                            </svg>
                            Précédent
                        </button>
                        
                        <span className='text-sm text-gray-600 px-2'>
                            {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCollaborateurs.length)} - {Math.min(currentPage * itemsPerPage, filteredCollaborateurs.length)} sur {filteredCollaborateurs.length}
                        </span>
                        
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className='flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        >
                            Suivant
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

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
            <AnimatePresence mode="wait">
                <motion.div 
                    className='flex flex-col gap-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {loading ? (
                        <motion.div 
                            className='flex items-center justify-center py-12'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className='w-8 h-8 border-2 border-b-white border-t-violet-900 rounded-full animate-spin'></div>
                        </motion.div>
                    ) : filteredCollaborateurs.length === 0 ? (
                        <motion.div 
                            className='text-center py-8 text-gray-500'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Aucun collaborateur trouvé avec ces critères
                        </motion.div>
                    ) : (
                        paginatedCollaborateurs.map((collaborateur, index) => (
                            <motion.div
                                key={collaborateur._id as string}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
                            >
                                <Link href={`/encodage-rh/${collaborateur._id as string}`}
                                    className='grid grid-cols-12 items-center gap-3 p-2 border border-gray-200 rounded-md cursor-pointer transition-colors block'
                                >
                        <input 
                            type="checkbox" 
                            className='col-span-1 size-4' 
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className='col-span-1 flex justify-center'>
                            <div 
                                className='w-8 h-8 rounded-full flex items-center justify-center bg-black text-white text-xs font-bold'
                                style={{ backgroundColor: collaborateur['INFORMATION PROFESSIONNELLE']?.couleur || '#6366F1' }}
                            >
                                {(collaborateur['INFORMATION PERSONNELLE']?.prenoms?.charAt(0) || '') + (collaborateur['INFORMATION PERSONNELLE']?.nom?.charAt(0) || '')}
                            </div>
                        </div>
                        <span className='col-span-2 text-sm text-center'>{collaborateur.MATRICULE}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur['INFORMATION PROFESSIONNELLE']?.pseudo || '-'}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur['INFORMATION PROFESSIONNELLE']?.pole || '-'}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur['INFORMATION PROFESSIONNELLE']?.bench || '-'}</span>
                        <span className='col-span-2 text-sm text-center'>{collaborateur.Status?.statut || '-'}</span>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </AnimatePresence>


            {/* Compteur de résultats */}
            <div className='text-sm text-gray-600 mt-2'>
                Affichage de {paginatedCollaborateurs.length} collaborateur{paginatedCollaborateurs.length > 1 ? 's' : ''} sur {filteredCollaborateurs.length} trouvé{filteredCollaborateurs.length > 1 ? 's' : ''} ({collaborateurs.length} total)
            </div>
        </div>
    )
}

export default ListingCollaborator