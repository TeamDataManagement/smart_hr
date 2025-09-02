'use client';

import React, { useEffect, useState } from 'react';
import { fetchPolesBenchs, PolesBenchsResponse } from '@/utils/api-helpers';

interface PolesBenchsListProps {
  showDetails?: boolean;
}

export default function PolesBenchsList({ showDetails = false }: PolesBenchsListProps) {
  const [data, setData] = useState<PolesBenchsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPolesBenchs()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des données...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          <strong>Erreur:</strong> {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Section Pôles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pôles ({data.poles.total})
        </h2>
        
        {showDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.poles.detailed.map((pole) => (
              <div
                key={pole.name}
                className="bg-blue-50 border border-blue-200 rounded-lg p-3"
              >
                <div className="font-medium text-blue-900">{pole.name}</div>
                <div className="text-sm text-blue-600">
                  {pole.employeeCount} employé{pole.employeeCount > 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {data.poles.list.map((pole) => (
                <span
                  key={pole}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {pole}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section Benchs */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Benchs ({data.benchs.total})
        </h2>
        
        {showDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.benchs.detailed.map((bench) => (
              <div
                key={bench.name}
                className="bg-green-50 border border-green-200 rounded-lg p-3"
              >
                <div className="font-medium text-green-900">{bench.name}</div>
                <div className="text-sm text-green-600">
                  {bench.employeeCount} employé{bench.employeeCount > 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {data.benchs.list.map((bench) => (
                <span
                  key={bench}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {bench}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}