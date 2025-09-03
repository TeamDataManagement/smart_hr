import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Employee from '@/models/Employee';

// GET - Récupérer un employé spécifique par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    // Rechercher l'employé par son ID MongoDB ou par son MATRICULE
    let employee;
    
    // Vérifier si l'ID est un ObjectId valide MongoDB
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      employee = await Employee.findById(id);
    } else {
      // Sinon, rechercher par MATRICULE
      employee = await Employee.findOne({ MATRICULE: id });
    }
    
    if (!employee) {
      return NextResponse.json({
        success: false,
        error: 'Employé non trouvé'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: employee
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Erreur lors de la récupération de l\'employé:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération de l\'employé',
      details: error.message
    }, { status: 500 });
  }
}

// PUT - Mettre à jour un employé spécifique
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body = await request.json();
    
    // Rechercher et mettre à jour l'employé
    let employee;
    
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      employee = await Employee.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
      );
    } else {
      employee = await Employee.findOneAndUpdate(
        { MATRICULE: id },
        body,
        { new: true, runValidators: true }
      );
    }
    
    if (!employee) {
      return NextResponse.json({
        success: false,
        error: 'Employé non trouvé'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: employee,
      message: 'Employé mis à jour avec succès'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour de l\'employé:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la mise à jour de l\'employé',
      details: error.message
    }, { status: 500 });
  }
}

// DELETE - Supprimer un employé spécifique
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    // Rechercher et supprimer l'employé
    let employee;
    
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      employee = await Employee.findByIdAndDelete(id);
    } else {
      employee = await Employee.findOneAndDelete({ MATRICULE: id });
    }
    
    if (!employee) {
      return NextResponse.json({
        success: false,
        error: 'Employé non trouvé'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: employee,
      message: 'Employé supprimé avec succès'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Erreur lors de la suppression de l\'employé:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la suppression de l\'employé',
      details: error.message
    }, { status: 500 });
  }
}