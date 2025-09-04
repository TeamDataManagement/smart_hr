'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HomePage() {
  const teamMembers = [
    {
      id: 1,
      name: "Leilla",
      role: "Human Resources Senior",
      tasks: ["Stratégie RH", "Management d'équipe", "Relations sociales"],
      image: "/leilla.png",
      email: "leilla@smartelia.com"
    },
    {
      id: 2,
      name: "Valentin",
      role: "Human Resources Assistant Medior",
      tasks: ["Sourcing candidats", "Entretiens", "Onboarding"],
      image: "/valentin.png",
      email: "valentin@smartelia.com"
    },
    {
      id: 3,
      name: "Eddy",
      role: "Recruitment Assistant",
      tasks: ["Paie mensuelle", "Déclarations sociales", "Congés"],
      image: "/eddy.png", // Placeholder
      email: "eddy@smartelia.com"
    },
  ]

  const services = [
    {
      title: "Gestion des Collaborateurs",
      description: "Suivi complet des dossiers collaborateurs, informations personnelles et professionnelles",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: "/encodage-rh"
    },
    {
      title: "Encodage Congés",
      description: "Gestion et suivi des demandes de congés, planning des absences",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: "/encodage-conges"
    },
    {
      title: "Suivi Loop",
      description: "Évaluations périodiques et suivi de performance des collaborateurs",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: "/suivi-loop"
    }
  ]

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bannière héro */}
      <section className="relative bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl font-bold mb-6 text-gray-100"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Équipe <span className="text-gray-300">Ressources Humaines</span>
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Votre partenaire pour la gestion et le développement du capital humain chez Smartelia
            </motion.p>
            <motion.div 
              className="flex justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/encodage-rh" 
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Gestion Collaborateurs
                </Link>
              </motion.div>
              <motion.button 
                className="border-2 border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Gestion de congés
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Services */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Les Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nos outils de gestion RH pour optimiser le suivi et le développement de nos collaborateurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link 
                  href={service.link}
                  className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 block"
                >
                <div className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                  Accéder →
                </div>
              </Link>
            </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section Équipe */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe RH</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une équipe dédiée et expérimentée pour vous accompagner dans tous vos besoins RH
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={150} 
                    height={150} 
                    className="rounded-full object-cover border-2 border-gray-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Responsabilités :</h4>
                    <ul className="space-y-1">
                      {member.tasks.map((task, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <svg className="w-3 h-3 text-gray-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a 
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contacter
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart HR</h3>
              <p className="text-gray-400 leading-relaxed">
                Votre plateforme de gestion des ressources humaines pour une meilleure efficacité et un suivi optimal de vos collaborateurs.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/encodage-rh" className="text-gray-400 hover:text-white transition-colors">Gestion Collaborateurs</Link></li>
                <li><Link href="/encodage-conges" className="text-gray-400 hover:text-white transition-colors">Encodage Congés</Link></li>
                <li><Link href="/suivi-loop" className="text-gray-400 hover:text-white transition-colors">Suivi Loop</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 rh@smartelia.com</p>
                <p>📞 +33 1 23 45 67 89</p>
                <p>📍 Paris, France</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Smartelia - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
