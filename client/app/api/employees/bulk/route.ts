import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Employee, { IEmployee } from '@/models/Employee';

// POST - Insérer plusieurs employés en masse
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Vérifier que body est un tableau
    if (!Array.isArray(body)) {
      return NextResponse.json({
        success: false,
        error: 'Les données doivent être un tableau d\'employés'
      }, { status: 400 });
    }

    if (body.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Le tableau d\'employés ne peut pas être vide'
      }, { status: 400 });
    }

    const results = {
      created: [] as any[],
      errors: [] as any[],
      duplicates: [] as string[]
    };

    // Traiter chaque employé
    for (let i = 0; i < body.length; i++) {
      const employeeData = body[i];
      
      try {
        // Validation des champs obligatoires
        if (!employeeData.MATRICULE) {
          results.errors.push({
            index: i,
            matricule: employeeData.MATRICULE || 'N/A',
            error: 'Le matricule est obligatoire'
          });
          continue;
        }

        // Vérifier si un employé avec ce matricule existe déjà
        const existingEmployee = await Employee.findOne({ MATRICULE: employeeData.MATRICULE });
        if (existingEmployee) {
          results.duplicates.push(employeeData.MATRICULE);
          continue;
        }

        // Préparer les données de l'employé avec des valeurs par défaut
        const newEmployeeData: Partial<IEmployee> = {
          MATRICULE: employeeData.MATRICULE,
          'INFORMATION PROFESSIONNELLE': {
            pseudo: employeeData['INFORMATION PROFESSIONNELLE']?.pseudo || '',
            email: employeeData['INFORMATION PROFESSIONNELLE']?.email || '',
            fonction: employeeData['INFORMATION PROFESSIONNELLE']?.fonction || '',
            pole: employeeData['INFORMATION PROFESSIONNELLE']?.pole || '',
            bench: employeeData['INFORMATION PROFESSIONNELLE']?.bench || '',
            dateEmbauche: employeeData['INFORMATION PROFESSIONNELLE']?.dateEmbauche || '',
            rangs: {
              junior: { date: employeeData['INFORMATION PROFESSIONNELLE']?.rangs?.junior?.date || '' },
              medior: { date: employeeData['INFORMATION PROFESSIONNELLE']?.rangs?.medior?.date || '' },
              senior: { date: employeeData['INFORMATION PROFESSIONNELLE']?.rangs?.senior?.date || '' },
              manager: { date: employeeData['INFORMATION PROFESSIONNELLE']?.rangs?.manager?.date || '' },
              director: { date: employeeData['INFORMATION PROFESSIONNELLE']?.rangs?.director?.date || '' }
            },
            typeContrat: employeeData['INFORMATION PROFESSIONNELLE']?.typeContrat || '',
            couleur: employeeData['INFORMATION PROFESSIONNELLE']?.couleur || ''
          },
          'INFORMATION PERSONNELLE': {
            nom: employeeData['INFORMATION PERSONNELLE']?.nom || '',
            prenoms: employeeData['INFORMATION PERSONNELLE']?.prenoms || '',
            genre: employeeData['INFORMATION PERSONNELLE']?.genre || '',
            dateNaissance: employeeData['INFORMATION PERSONNELLE']?.dateNaissance || '',
            situationMatrimoniale: employeeData['INFORMATION PERSONNELLE']?.situationMatrimoniale || '',
            nombreEnfants: employeeData['INFORMATION PERSONNELLE']?.nombreEnfants || 0
          },
          'DOCUMENT PERSONNELLE': {
            documents: employeeData['DOCUMENT PERSONNELLE']?.documents || []
          },
          Status: {
            statut: employeeData.Status?.statut || 'Actif',
            debauche: {
              date: employeeData.Status?.debauche?.date || '',
              raison: employeeData.Status?.debauche?.raison || ''
            }
          }
        };

        const newEmployee = new Employee(newEmployeeData);
        const savedEmployee = await newEmployee.save();
        
        results.created.push({
          index: i,
          matricule: savedEmployee.MATRICULE,
          id: savedEmployee._id
        });

      } catch (error: any) {
        results.errors.push({
          index: i,
          matricule: employeeData.MATRICULE || 'N/A',
          error: error.message
        });
      }
    }

    const statusCode = results.errors.length > 0 ? 207 : 201; // 207 Multi-Status si il y a des erreurs

    return NextResponse.json({
      success: results.errors.length === 0,
      message: `Traitement terminé. ${results.created.length} employés créés, ${results.duplicates.length} doublons ignorés, ${results.errors.length} erreurs.`,
      summary: {
        total: body.length,
        created: results.created.length,
        duplicates: results.duplicates.length,
        errors: results.errors.length
      },
      results
    }, { status: statusCode });

  } catch (error: any) {
    console.error('Erreur lors de l\'insertion en masse:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'insertion en masse des employés',
      details: error.message
    }, { status: 500 });
  }
}