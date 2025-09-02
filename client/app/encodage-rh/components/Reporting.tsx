
import { IEmployee } from '@/models/Employee';
import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, BarChart, Bar } from 'recharts';
import { LineChart, Line, PieChart, Pie, Cell } from 'recharts';

function Reporting() {
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<{ total: number, actifs: number, masculin: number, feminin: number }>({ total: 0, actifs: 0, masculin: 0, feminin: 0 });
  const [employees, setEmployees] = useState<IEmployee[]>([]);


  const getStats = (data: IEmployee[]) => {
    const stats = {
      total: data.length,
      actifs: data.filter(employee => employee.Status?.statut === 'Actif').length,
      masculin: data.filter(employee => employee['INFORMATION PERSONNELLE']?.genre === 'H' && employee.Status?.statut === 'Actif').length,
      feminin: data.filter(employee => employee['INFORMATION PERSONNELLE']?.genre === 'F' && employee.Status?.statut === 'Actif').length
    }
    return stats;
  }

  const getDistributionByPole = (data: IEmployee[]) => {
    const actifs = data.filter(employee => employee.Status?.statut === 'Actif');
    const distribution = actifs.reduce((acc, employee) => {
      const pole = employee['INFORMATION PROFESSIONNELLE']?.pole || 'Non défini';
      acc[pole] = (acc[pole] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const total = actifs.length;
    return Object.entries(distribution)
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getDistributionByBench = (data: IEmployee[]) => {
    const actifs = data.filter(employee => employee.Status?.statut === 'Actif');
    const distribution = actifs.reduce((acc, employee) => {
      const bench = employee['INFORMATION PROFESSIONNELLE']?.bench || 'Non défini';
      acc[bench] = (acc[bench] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const total = actifs.length;
    return Object.entries(distribution)
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);
  };

  useEffect(() => {
    const fetchCollaborateurs = async () => {
      setLoading(true);
      const response = await fetch('/api/employees')
      const data = await response.json()
      setEmployees(data.data)
      setStats(getStats(data.data))
      setLoading(false);
    }
    fetchCollaborateurs()
  }, []);

  const poleDistribution = getDistributionByPole(employees);
  const benchDistribution = getDistributionByBench(employees);

  // ================== Helpers temporels & agrégations ==================
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const parseDate = (value?: string) => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  };
  
  const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
  const monthLabel = (d: Date) => d.toLocaleDateString('fr-FR', { month: 'short' });

  type MonthlyDatum = { label: string; hires: number; departures: number; churnPct: number };

  const buildMonthlyForYear = (data: IEmployee[], year: number): MonthlyDatum[] => {
    const months: MonthlyDatum[] = Array.from({ length: 12 }).map((_, i) => ({
      label: new Date(year, i, 1).toLocaleDateString('fr-FR', { month: 'short' }),
      hires: 0,
      departures: 0,
      churnPct: 0
    }));

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

    // Pre-calc headcount at start of each month
    const headcountAtStart: number[] = Array(12).fill(0);
    for (let m = 0; m < 12; m++) {
      const startM = new Date(year, m, 1);
      headcountAtStart[m] = data.filter(e => {
        const h = parseDate(e['INFORMATION PROFESSIONNELLE']?.dateEmbauche);
        const d = parseDate(e.Status?.debauche?.date);
        return h && h < startM && (!d || d >= startM);
      }).length;
    }

    for (let m = 0; m < 12; m++) {
      const mStart = startOfMonth(new Date(year, m, 1));
      const mEnd = endOfMonth(new Date(year, m, 1));
      const hires = data.filter(e => {
        const h = parseDate(e['INFORMATION PROFESSIONNELLE']?.dateEmbauche);
        return h && h >= mStart && h <= mEnd;
      }).length;
      const departures = data.filter(e => {
        const d = parseDate(e.Status?.debauche?.date);
        return d && d >= mStart && d <= mEnd;
      }).length;
      const headStart = headcountAtStart[m];
      const headEnd = Math.max(0, headStart + hires - departures);
      const avg = (headStart + headEnd) / 2;
      const churnPct = avg > 0 ? Math.round((departures / avg) * 1000) / 10 : 0;
      months[m].hires = hires;
      months[m].departures = departures;
      months[m].churnPct = churnPct;
    }

    return months;
  };

  const monthly = buildMonthlyForYear(employees, selectedYear);

  // Pour l'affichage d'effectif début/fin d'année dans l'entête
  const computeAnnualMetrics = (data: IEmployee[], year: number) => {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
    const headcountStart = data.filter(e => {
      const h = parseDate(e['INFORMATION PROFESSIONNELLE']?.dateEmbauche);
      const d = parseDate(e.Status?.debauche?.date);
      return h && h < startOfYear && (!d || d >= startOfYear);
    }).length;
    const headcountEnd = data.filter(e => {
      const h = parseDate(e['INFORMATION PROFESSIONNELLE']?.dateEmbauche);
      const d = parseDate(e.Status?.debauche?.date);
      return h && h <= endOfYear && (!d || d > endOfYear);
    }).length;
    return { headcountStart, headcountEnd };
  };
  const annual = computeAnnualMetrics(employees, selectedYear);

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='grid grid-cols-12 gap-4 w-full'>
        <div className='col-span-3 border border-stone-300 rounded-md p-4 flex flex-col gap-3 bg-white shadow-sm'>
          <h1 className='text-sm font-medium text-gray-600'>Total employés</h1>
          {loading ? (
            <div className='flex items-center justify-center'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <span className='text-2xl font-bold text-stone-500'>{stats.total}</span>
          )}
        </div>
        <div className='col-span-3 border border-stone-300 rounded-md p-4 flex flex-col gap-3 bg-white shadow-sm'>
          <h1 className='text-sm font-medium text-gray-600'>Employés actifs</h1>
          {loading ? (
            <div className='flex items-center justify-center'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <span className='text-2xl font-bold text-stone-500'>{stats.actifs}</span>
          )}
        </div>
        <div className='col-span-3 border border-stone-300 rounded-md p-4 flex flex-col gap-3 bg-white shadow-sm'>
          <h1 className='text-sm font-medium text-gray-600'>Effectif Masculin</h1>
          {loading ? (
            <div className='flex items-center justify-center'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <span className='text-2xl font-bold text-stone-500'>{stats.masculin}</span>
          )}
        </div>
        <div className='col-span-3 border border-stone-300 rounded-md p-4 flex flex-col gap-3 bg-white shadow-sm'>
          <h1 className='text-sm font-medium text-gray-600'>Effectif Féminin</h1>
          {loading ? (
            <div className='flex items-center justify-center'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <span className='text-2xl font-bold text-stone-500'>{stats.feminin}</span>
          )}
        </div>
      </div>

      {/* Graphiques Recharts */}
      <div className='flex flex-col gap-6 w-full mt-6'>
        {/* Sélecteur d'année */}
        <div className='border border-stone-300 rounded-md p-4 bg-white shadow-sm'>
          <div className='flex items-center gap-3'>
            <label className='text-sm text-gray-700'>Année</label>
            <select
              className='border px-2 py-1 rounded-md text-sm'
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {Array.from({ length: 6 }).map((_, idx) => {
                const y = new Date().getFullYear() - idx;
                return <option key={y} value={y}>{y}</option>
              })}
            </select>
            <div className='ml-auto text-sm text-stone-600'>
              Effectif début: <span className='font-medium'>{annual.headcountStart}</span> · Fin: <span className='font-medium'>{annual.headcountEnd}</span>
            </div>
          </div>
        </div>

        {/* Embauches vs Départs (Mensuel) */}
        <div className='border border-stone-300 rounded-md p-4 bg-white shadow-sm'>
          <h2 className='text-lg font-medium text-gray-700 mb-4'>Embauches vs Départs ({selectedYear})</h2>
          {loading ? (
            <div className='flex items-center justify-center py-8'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <div className='w-full h-80'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hires" name="Embauches" stroke="#16a34a" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="departures" name="Départs" stroke="#dc2626" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Churn mensuel */}
        <div className='border border-stone-300 rounded-md p-4 bg-white shadow-sm'>
          <h2 className='text-lg font-medium text-gray-700 mb-4'>Churn Mensuel (%) ({selectedYear})</h2>
          {loading ? (
            <div className='flex items-center justify-center py-8'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <div className='w-full h-72'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis unit="%" />
                  <Tooltip formatter={(v: number) => [`${v}%`, 'Churn']} />
                  <Legend />
                  <Line type="monotone" dataKey="churnPct" name="Churn" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Répartition par Pôle */}
        <div className='border border-stone-300 rounded-md p-4 bg-white shadow-sm'>
          <h2 className='text-lg font-medium text-gray-700 mb-4'>Répartition par Pôle (Actifs)</h2>
          {loading ? (
            <div className='flex items-center justify-center py-8'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <div className='w-full h-80'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={poleDistribution} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} height={60} textAnchor="end" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value: number, name: string, props: any) => [value, 'Effectif']} />
                  <Legend />
                  <Bar dataKey="count" name="Effectif" fill="#4c1d95" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Répartition par Bench */}
        <div className='border border-stone-300 rounded-md p-4 bg-white shadow-sm'>
          <h2 className='text-lg font-medium text-gray-700 mb-4'>Répartition par Bench (Actifs)</h2>
          {loading ? (
            <div className='flex items-center justify-center py-8'>
              <div className='w-6 h-6 border-2 border-stone-300 border-t-stone-500 rounded-full animate-spin'></div>
            </div>
          ) : (
            <div className='w-full h-80'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchDistribution} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} height={60} textAnchor="end" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value: number, name: string, props: any) => [value, 'Effectif']} />
                  <Legend />
                  <Bar dataKey="count" name="Effectif" fill="#4c1d95" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reporting