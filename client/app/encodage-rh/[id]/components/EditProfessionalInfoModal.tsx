'use client'

import React, { useState } from 'react'
import { IEmployee } from '@/models/Employee'

interface EditProfessionalInfoModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  employee: IEmployee
}

function EditProfessionalInfoModal({ isOpen, onClose, onSuccess, employee }: EditProfessionalInfoModalProps) {
  const [formData, setFormData] = useState({
    pseudo: employee['INFORMATION PROFESSIONNELLE']?.pseudo || '',
    email: employee['INFORMATION PROFESSIONNELLE']?.email || '',
    fonction: employee['INFORMATION PROFESSIONNELLE']?.fonction || '',
    pole: employee['INFORMATION PROFESSIONNELLE']?.pole || '',
    bench: employee['INFORMATION PROFESSIONNELLE']?.bench || '',
    dateEmbauche: employee['INFORMATION PROFESSIONNELLE']?.dateEmbauche || '',
    typeContrat: employee['INFORMATION PROFESSIONNELLE']?.typeContrat || '',
    couleur: employee['INFORMATION PROFESSIONNELLE']?.couleur || '#4F46E5'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/employees/${employee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'INFORMATION PROFESSIONNELLE': {
            ...employee['INFORMATION PROFESSIONNELLE'],
            ...formData
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      pseudo: employee['INFORMATION PROFESSIONNELLE']?.pseudo || '',
      email: employee['INFORMATION PROFESSIONNELLE']?.email || '',
      fonction: employee['INFORMATION PROFESSIONNELLE']?.fonction || '',
      pole: employee['INFORMATION PROFESSIONNELLE']?.pole || '',
      bench: employee['INFORMATION PROFESSIONNELLE']?.bench || '',
      dateEmbauche: employee['INFORMATION PROFESSIONNELLE']?.dateEmbauche || '',
      typeContrat: employee['INFORMATION PROFESSIONNELLE']?.typeContrat || '',
      couleur: employee['INFORMATION PROFESSIONNELLE']?.couleur || '#4F46E5'
    })
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Modifier les informations professionnelles</h2>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700 mb-1">
                  Pseudo
                </label>
                <input
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  value={formData.pseudo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="fonction" className="block text-sm font-medium text-gray-700 mb-1">
                  Fonction
                </label>
                <input
                  type="text"
                  id="fonction"
                  name="fonction"
                  value={formData.fonction}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="pole" className="block text-sm font-medium text-gray-700 mb-1">
                  Pôle
                </label>
                <input
                  type="text"
                  id="pole"
                  name="pole"
                  value={formData.pole}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="bench" className="block text-sm font-medium text-gray-700 mb-1">
                  Bench
                </label>
                <input
                  type="text"
                  id="bench"
                  name="bench"
                  value={formData.bench}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="dateEmbauche" className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'embauche
                </label>
                <input
                  type="date"
                  id="dateEmbauche"
                  name="dateEmbauche"
                  value={formData.dateEmbauche}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="typeContrat" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de contrat
                </label>
                <select
                  id="typeContrat"
                  name="typeContrat"
                  value={formData.typeContrat}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Sélectionner</option>
                  <option value="Prestataire">Prestataire</option>
                  <option value="Employé(e)">Employé(e)</option>
                </select>
              </div>

              <div>
                <label htmlFor="couleur" className="block text-sm font-medium text-gray-700 mb-1">
                  Couleur
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="couleur"
                    name="couleur"
                    value={formData.couleur}
                    onChange={handleChange}
                    className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.couleur}
                    onChange={handleChange}
                    name="couleur"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfessionalInfoModal