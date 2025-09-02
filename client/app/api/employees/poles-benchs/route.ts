import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Employee from '@/models/Employee';

// GET - Récupérer la liste des pôles et des benchs uniques
export async function GET() {
  try {
    await connectToDatabase();
    
    // Récupérer les pôles uniques avec le nombre d'employés
    const uniquePoles = await Employee.aggregate([
      {
        $group: {
          _id: "$INFORMATION PROFESSIONNELLE.pole",
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          _id: { $nin: [null, ""] }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          name: "$_id",
          employeeCount: "$count",
          _id: 0
        }
      }
    ]);

    // Récupérer les benchs uniques avec le nombre d'employés
    const uniqueBenchs = await Employee.aggregate([
      {
        $group: {
          _id: "$INFORMATION PROFESSIONNELLE.bench",
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          _id: { $nin: [null, ""] }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          name: "$_id",
          employeeCount: "$count",
          _id: 0
        }
      }
    ]);
    
    // Extraire les listes simples
    const polesList = uniquePoles.map(item => item.name);
    const benchsList = uniqueBenchs.map(item => item.name);
    
    return NextResponse.json({
      success: true,
      data: {
        poles: {
          list: polesList,
          detailed: uniquePoles,
          total: uniquePoles.length
        },
        benchs: {
          list: benchsList,
          detailed: uniqueBenchs,
          total: uniqueBenchs.length
        }
      }
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Erreur lors de la récupération des pôles et benchs:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des pôles et benchs',
      details: error.message
    }, { status: 500 });
  }
}