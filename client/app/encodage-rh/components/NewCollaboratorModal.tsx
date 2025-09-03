'use client'

import React, { useState, useEffect } from 'react'
import { IEmployee } from '@/models/Employee'

interface NewCollaboratorModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

function NewCollaboratorModal({ isOpen, onClose, onSuccess }: NewCollaboratorModalProps) {
  const [poles, setPoles] = useState<string[]>([])
  const [benchs, setBenchs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // États pour le formulaire
  const [formData, setFormData] = useState({
    matricule: '',
    pseudo: '',
    email: '',
    fonction: '',
    pole: '',
    bench: '',
    dateEmbauche: '',
    typeContrat: 'CDI',
    couleur: '#3B82F6',
    nom: '',
    prenoms: '',
    genre: 'Homme',
    dateNaissance: '',
    situationMatrimoniale: 'Célibataire',
    nombreEnfants: 0,
    niveau: 'Junior'
  })

  // Récupérer les pôles et benchs
  useEffect(() => {
    if (isOpen) {
      const fetchPolesBenchs = async () => {
        try {
          const response = await fetch('/api/employees/poles-benchs')
          const data = await response.json()
          if (data.success) {
            setPoles(data.data.poles.list)
            setBenchs(data.data.benchs.list)
          }
        } catch (error) {
          console.error('Erreur fetch poles-benchs:', error)
        }
      }
      fetchPolesBenchs()
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Supprimer l'erreur si l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.matricule.trim()) newErrors.matricule = 'Le matricule est requis'
    if (!formData.pseudo.trim()) newErrors.pseudo = 'Le pseudo est requis'
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis'
    if (!formData.email.includes('@')) newErrors.email = 'Format d\'email invalide'
    if (!formData.fonction.trim()) newErrors.fonction = 'La fonction est requise'
    if (!formData.pole) newErrors.pole = 'Le pôle est requis'
    if (!formData.bench) newErrors.bench = 'Le bench est requis'
    if (!formData.dateEmbauche) newErrors.dateEmbauche = 'La date d\'embauche est requise'
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (!formData.prenoms.trim()) newErrors.prenoms = 'Le prénom est requis'
    if (!formData.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Préparer les données selon le modèle Employee
      const employeeData = {
        MATRICULE: formData.matricule,
        'INFORMATION PROFESSIONNELLE': {
          pseudo: formData.pseudo,
          email: formData.email,
          fonction: formData.fonction,
          pole: formData.pole,
          bench: formData.bench,
          dateEmbauche: formData.dateEmbauche,
          rangs: {
            junior: { date: formData.niveau === 'Junior' ? formData.dateEmbauche : '' },
            medior: { date: formData.niveau === 'Medior' ? formData.dateEmbauche : '' },
            senior: { date: formData.niveau === 'Senior' ? formData.dateEmbauche : '' },
            manager: { date: formData.niveau === 'Manager' ? formData.dateEmbauche : '' },
            director: { date: formData.niveau === 'Director' ? formData.dateEmbauche : '' }
          },
          typeContrat: formData.typeContrat,
          couleur: formData.couleur
        },
        'INFORMATION PERSONNELLE': {
          nom: formData.nom,
          prenoms: formData.prenoms,
          genre: formData.genre,
          dateNaissance: formData.dateNaissance,
          situationMatrimoniale: formData.situationMatrimoniale,
          nombreEnfants: formData.nombreEnfants
        },
        'DOCUMENT PERSONNELLE': {
          documents: []
        },
        Status: {
          statut: 'Actif',
          debauche: {
            date: '',
            raison: ''
          }
        }
      }

      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      })

      const data = await response.json()

      if (data.success) {
        onSuccess()
        handleClose()
      } else {
        setErrors({ general: data.error || 'Erreur lors de la création du collaborateur' })
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      setErrors({ general: 'Erreur lors de la création du collaborateur' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      matricule: '',
      pseudo: '',
      email: '',
      fonction: '',
      pole: '',
      bench: '',
      dateEmbauche: '',
      typeContrat: 'CDI',
      couleur: '#3B82F6',
      nom: '',
      prenoms: '',
      genre: 'Homme',
      dateNaissance: '',
      situationMatrimoniale: 'Célibataire',
      nombreEnfants: 0,
      niveau: 'Junior'
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="p-2 bg-violet-100 rounded-lg">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Nouveau Collaborateur</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations Professionnelles */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-8 4h8a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Informations Professionnelles</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Matricule *
                  </label>
                  <input
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.matricule ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Ex: EMP001"
                  />
                  {errors.matricule && <p className="text-red-500 text-xs mt-1">{errors.matricule}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pseudo *
                  </label>
                  <input
                    type="text"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.pseudo ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Nom d'utilisateur"
                  />
                  {errors.pseudo && <p className="text-red-500 text-xs mt-1">{errors.pseudo}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fonction *
                  </label>
                  <input
                    type="text"
                    name="fonction"
                    value={formData.fonction}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.fonction ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Ex: Développeur, Manager..."
                  />
                  {errors.fonction && <p className="text-red-500 text-xs mt-1">{errors.fonction}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pôle *
                  </label>
                  <select
                    name="pole"
                    value={formData.pole}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.pole ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Sélectionner un pôle</option>
                    {poles.map((pole) => (
                      <option key={pole} value={pole}>{pole}</option>
                    ))}
                  </select>
                  {errors.pole && <p className="text-red-500 text-xs mt-1">{errors.pole}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bench *
                  </label>
                  <select
                    name="bench"
                    value={formData.bench}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.bench ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Sélectionner un bench</option>
                    {benchs.map((bench) => (
                      <option key={bench} value={bench}>{bench}</option>
                    ))}
                  </select>
                  {errors.bench && <p className="text-red-500 text-xs mt-1">{errors.bench}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'embauche *
                  </label>
                  <input
                    type="date"
                    name="dateEmbauche"
                    value={formData.dateEmbauche}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.dateEmbauche ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.dateEmbauche && <p className="text-red-500 text-xs mt-1">{errors.dateEmbauche}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau
                  </label>
                  <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Medior">Medior</option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de contrat
                  </label>
                  <select
                    name="typeContrat"
                    value={formData.typeContrat}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="Prestataire">Prestataire</option>
                    <option value="Employé(e)">Employé(e)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Couleur
                  </label>
                  <input
                    type="color"
                    name="couleur"
                    value={formData.couleur}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-10"
                  />
                </div>
              </div>
            </div>

            {/* Informations Personnelles */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Informations Personnelles</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Nom de famille"
                  />
                  {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénoms *
                  </label>
                  <input
                    type="text"
                    name="prenoms"
                    value={formData.prenoms}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.prenoms ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Prénom(s)"
                  />
                  {errors.prenoms && <p className="text-red-500 text-xs mt-1">{errors.prenoms}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                  </label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="H">Homme</option>
                    <option value="F">Femme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de naissance *
                  </label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-3 py-2 text-sm ${errors.dateNaissance ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.dateNaissance && <p className="text-red-500 text-xs mt-1">{errors.dateNaissance}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Situation matrimoniale
                  </label>
                  <select
                    name="situationMatrimoniale"
                    value={formData.situationMatrimoniale}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié(e)">Marié(e)</option>
                    <option value="Divorcé(e)">Divorcé(e)</option>
                    <option value="Veuf(ve)">Veuf(ve)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre d'enfants
                  </label>
                  <input
                    type="number"
                    name="nombreEnfants"
                    value={formData.nombreEnfants}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-3 pt-4">
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-violet-900 rounded-md hover:bg-violet-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Créer le collaborateur
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewCollaboratorModal