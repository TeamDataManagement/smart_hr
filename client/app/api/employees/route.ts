import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Employee, { IEmployee } from '@/models/Employee';

// GET - Récupérer tous les employés
export async function GET() {
  try {
    await connectToDatabase();
    
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: employees,
      count: employees.length
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Erreur lors de la récupération des employés:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des employés',
      details: error.message
    }, { status: 500 });
  }
}

// POST - Créer un nouvel employé
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validation des champs obligatoires
    if (!body.MATRICULE) {
      return NextResponse.json({
        success: false,
        error: 'Le matricule est obligatoire'
      }, { status: 400 });
    }

    if (!body['INFORMATION PROFESSIONNELLE']) {
      return NextResponse.json({
        success: false,
        error: 'Les informations professionnelles sont obligatoires'
      }, { status: 400 });
    }

    if (!body['INFORMATION PERSONNELLE']) {
      return NextResponse.json({
        success: false,
        error: 'Les informations personnelles sont obligatoires'
      }, { status: 400 });
    }

    // Vérifier si un employé avec ce matricule existe déjà
    const existingEmployee = await Employee.findOne({ MATRICULE: body.MATRICULE });
    if (existingEmployee) {
      return NextResponse.json({
        success: false,
        error: 'Un employé avec ce matricule existe déjà'
      }, { status: 409 });
    }

    // Créer le nouvel employé
    const employeeData: Partial<IEmployee> = {
      MATRICULE: body.MATRICULE,
      'INFORMATION PROFESSIONNELLE': {
        pseudo: body['INFORMATION PROFESSIONNELLE'].pseudo || '',
        email: body['INFORMATION PROFESSIONNELLE'].email || '',
        fonction: body['INFORMATION PROFESSIONNELLE'].fonction || '',
        pole: body['INFORMATION PROFESSIONNELLE'].pole || '',
        bench: body['INFORMATION PROFESSIONNELLE'].bench || '',
        dateEmbauche: body['INFORMATION PROFESSIONNELLE'].dateEmbauche || '',
        rangs: {
          junior: { date: body['INFORMATION PROFESSIONNELLE'].rangs?.junior?.date || '' },
          medior: { date: body['INFORMATION PROFESSIONNELLE'].rangs?.medior?.date || '' },
          senior: { date: body['INFORMATION PROFESSIONNELLE'].rangs?.senior?.date || '' },
          manager: { date: body['INFORMATION PROFESSIONNELLE'].rangs?.manager?.date || '' },
          director: { date: body['INFORMATION PROFESSIONNELLE'].rangs?.director?.date || '' }
        },
        typeContrat: body['INFORMATION PROFESSIONNELLE'].typeContrat || '',
        couleur: body['INFORMATION PROFESSIONNELLE'].couleur || ''
      },
      'INFORMATION PERSONNELLE': {
        nom: body['INFORMATION PERSONNELLE'].nom || '',
        prenoms: body['INFORMATION PERSONNELLE'].prenoms || '',
        genre: body['INFORMATION PERSONNELLE'].genre || '',
        dateNaissance: body['INFORMATION PERSONNELLE'].dateNaissance || '',
        situationMatrimoniale: body['INFORMATION PERSONNELLE'].situationMatrimoniale || '',
        nombreEnfants: body['INFORMATION PERSONNELLE'].nombreEnfants || 0
      },
      'DOCUMENT PERSONNELLE': {
        documents: body['DOCUMENT PERSONNELLE']?.documents || []
      },
      Status: {
        statut: body.Status?.statut || 'Actif',
        debauche: {
          date: body.Status?.debauche?.date || '',
          raison: body.Status?.debauche?.raison || ''
        }
      }
    };

    const newEmployee = new Employee(employeeData);
    const savedEmployee = await newEmployee.save();

    return NextResponse.json({
      success: true,
      message: 'Employé créé avec succès',
      data: savedEmployee
    }, { status: 201 });

  } catch (error: any) {
    console.error('Erreur lors de la création de l\'employé:', error);
    
    // Gestion des erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({
        success: false,
        error: 'Erreur de validation',
        details: validationErrors
      }, { status: 400 });
    }

    // Gestion des erreurs de duplication
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Un employé avec ce matricule existe déjà'
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la création de l\'employé',
      details: error.message
    }, { status: 500 });
  }
}