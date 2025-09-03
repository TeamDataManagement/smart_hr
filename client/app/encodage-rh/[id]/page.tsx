'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { IEmployee } from '@/models/Employee'
import EmployeeHeader from './components/EmployeeHeader'
import TabsNavigation from './components/TabsNavigation'
import ProfessionalInfo from './components/ProfessionalInfo'
import PersonalInfo from './components/PersonalInfo'
import DocumentsInfo from './components/DocumentsInfo'

export default function EmployeeDetailPage() {
  const params = useParams()
  const [employee, setEmployee] = useState<IEmployee | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('professionnel')
  const [error, setError] = useState<string | null>(null)

  const handleEmployeeUpdate = () => {
    // Recharger les données de l'employé après une mise à jour
    fetchEmployee()
  }

  const fetchEmployee = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/employees/${params.id}`)
        const data = await response.json()
        
        if (data.success) {
          setEmployee(data.data)
        } else {
          setError(data.error || 'Erreur lors du chargement des données')
        }
      } catch (error) {
        console.error('Erreur:', error)
        setError('Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    if (params.id) {
      fetchEmployee()
    }
  }, [params.id])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="w-8 h-8 animate-spin text-violet-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Chargement...</h3>
              <p className="text-sm text-gray-600">Récupération des informations du collaborateur</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.href = '/encodage-rh'}
              className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborateur non trouvé</h3>
            <p className="text-gray-600 mb-6">Le collaborateur demandé n'existe pas ou a été supprimé.</p>
            <button
              onClick={() => window.location.href = '/encodage-rh'}
              className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-8">
        {/* En-tête avec profil du collaborateur */}
        <EmployeeHeader employee={employee} />

        {/* Navigation par onglets */}
        <TabsNavigation activeTab={activeTab} onTabClick={handleTabClick} />

        {/* Contenu des onglets */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'professionnel' && <ProfessionalInfo employee={employee} onEmployeeUpdate={handleEmployeeUpdate} />}
          {activeTab === 'personnel' && <PersonalInfo employee={employee} onEmployeeUpdate={handleEmployeeUpdate} />}
          {activeTab === 'documents' && <DocumentsInfo employee={employee} />}
        </motion.div>
      </div>
    </motion.div>
  )
}