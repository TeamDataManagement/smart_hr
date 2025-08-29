import React from 'react'

interface PoleData {
  name: string
  value: number
}

interface HistogramProps {
  data: PoleData[]
  title?: string
}

function Histogram({ data, title = "Histogramme des Effectifs par Pôle" }: HistogramProps) {
  // Trouver la valeur maximale pour calculer les largeurs relatives
  const maxValue = Math.max(...data.map(item => item.value))

  return (
    <div className='bg-white border border-stone-300 rounded-lg p-6'>
      <h2 className='text-lg font-semibold text-purple-950 mb-6'>{title}</h2>

      <div className='space-y-4'>
        {data.map((item, index) => {
          // Calculer la largeur de la barre (en pourcentage de la valeur max)
          const widthPercent = (item.value / maxValue) * 100

          return (
            <div key={index} className='flex items-center gap-4'>
              {/* Nom du pôle */}
              <div className='w-48 text-sm text-gray-700 font-medium'>
                {item.name}
              </div>

              {/* Barre horizontale */}
              <div className='flex-1 flex items-center gap-3'>
                <div className='flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden'>
                  <div
                    className='bg-gradient-to-r from-purple-600 to-purple-800 h-full rounded-full transition-all duration-500 ease-out'
                    style={{ width: `${widthPercent}%` }}
                  ></div>
                </div>

                {/* Valeur numérique */}
                <div className='w-12 text-right text-sm font-bold text-purple-950'>
                  {item.value}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Légende */}
      <div className='mt-6 pt-4 border-t border-gray-200'>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <div className='w-3 h-3 bg-purple-600 rounded-full'></div>
          <span>Effectif par pôle</span>
        </div>
      </div>
    </div>
  )
}

export default Histogram