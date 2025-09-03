'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { IEmployee } from '@/models/Employee'

interface EmployeeHeaderProps {
  employee: IEmployee
}

function EmployeeHeader({ employee }: EmployeeHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/encodage-rh')
  }

  const getCurrentLevel = (employee: IEmployee): string => {
    const rangs = employee['INFORMATION PROFESSIONNELLE']?.rangs
    if (rangs?.director?.date) return 'Director'
    if (rangs?.manager?.date) return 'Manager'
    if (rangs?.senior?.date) return 'Senior'
    if (rangs?.medior?.date) return 'Medior'
    if (rangs?.junior?.date) return 'Junior'
    return 'Non défini'
  }

  return (
    <section className="mb-6">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center bg-black text-white text-xl font-semibold shadow-md ring-2 ring-white"
                style={{ backgroundColor: employee['INFORMATION PROFESSIONNELLE']?.couleur || '#4F46E5' }}
              >
                {(employee['INFORMATION PERSONNELLE']?.prenoms?.charAt(0) || '') + (employee['INFORMATION PERSONNELLE']?.nom?.charAt(0) || '')}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                employee.Status?.statut === 'Actif' ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {employee['INFORMATION PERSONNELLE']?.prenoms} {employee['INFORMATION PERSONNELLE']?.nom}
              </h1>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-8 4h8a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-600 truncate">
                  {employee['INFORMATION PROFESSIONNELLE']?.fonction}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {employee.MATRICULE}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {getCurrentLevel(employee)}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium border ${
                  employee.Status?.statut === 'Actif'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    employee.Status?.statut === 'Actif' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  {employee.Status?.statut || '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmployeeHeader