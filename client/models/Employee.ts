import mongoose, { Document, Schema } from 'mongoose';

// Interface pour les rangs professionnels
interface IRangs {
  junior: { date: string };
  medior: { date: string };
  senior: { date: string };
  manager: { date: string };
  director: { date: string };
}

// Interface pour les informations professionnelles
interface IInformationProfessionnelle {
  pseudo: string;
  email: string;
  fonction: string;
  pole: string;
  bench: string;
  dateEmbauche: string;
  rangs: IRangs;
  typeContrat: string;
  couleur: string;
}

// Interface pour les informations personnelles
interface IInformationPersonnelle {
  nom: string;
  prenoms: string;
  genre: string;
  dateNaissance: string;
  situationMatrimoniale: string;
  nombreEnfants: number;
}

// Interface pour les documents
interface IDocument {
  type: string;
  url: string;
}

// Interface pour les documents personnels
interface IDocumentPersonnelle {
  documents: IDocument[];
}

// Interface pour le statut
interface IStatus {
  statut: string;
  debauche: {
    date: string;
    raison: string;
  };
}

// Interface principale pour l'employé
export interface IEmployee extends Document {
  MATRICULE: string;
  'INFORMATION PROFESSIONNELLE': IInformationProfessionnelle;
  'INFORMATION PERSONNELLE': IInformationPersonnelle;
  'DOCUMENT PERSONNELLE': IDocumentPersonnelle;
  Status: IStatus;
}

// Schéma pour les rangs
const RangsSchema = new Schema<IRangs>({
  junior: {
    date: { type: String, default: '' }
  },
  medior: {
    date: { type: String, default: '' }
  },
  senior: {
    date: { type: String, default: '' }
  },
  manager: {
    date: { type: String, default: '' }
  },
  director: {
    date: { type: String, default: '' }
  }
}, { _id: false });

// Schéma pour les informations professionnelles
const InformationProfessionnelleSchema = new Schema<IInformationProfessionnelle>({
  pseudo: { type: String, required: true },
  email: { type: String, required: true },
  fonction: { type: String, required: true },
  pole: { type: String, required: true },
  bench: { type: String, required: true },
  dateEmbauche: { type: String, required: true },
  rangs: { type: RangsSchema, required: true },
  typeContrat: { type: String, required: true },
  couleur: { type: String, required: true }
}, { _id: false });

// Schéma pour les informations personnelles
const InformationPersonnelleSchema = new Schema<IInformationPersonnelle>({
  nom: { type: String, required: true },
  prenoms: { type: String, required: true },
  genre: { type: String, required: true },
  dateNaissance: { type: String, required: true },
  situationMatrimoniale: { type: String, required: true },
  nombreEnfants: { type: Number, required: true }
}, { _id: false });

// Schéma pour un document
const DocumentSchema = new Schema<IDocument>({
  type: { type: String, required: true },
  url: { type: String, default: '' }
}, { _id: false });

// Schéma pour les documents personnels
const DocumentPersonnelleSchema = new Schema<IDocumentPersonnelle>({
  documents: [DocumentSchema]
}, { _id: false });

// Schéma pour le statut
const StatusSchema = new Schema<IStatus>({
  statut: { type: String, required: true },
  debauche: {
    date: { type: String, default: '' },
    raison: { type: String, default: '' }
  }
}, { _id: false });

// Schéma principal pour l'employé
const EmployeeSchema = new Schema<IEmployee>({
  MATRICULE: { 
    type: String, 
    required: true, 
    unique: true 
  },
  'INFORMATION PROFESSIONNELLE': {
    type: InformationProfessionnelleSchema,
    required: true
  },
  'INFORMATION PERSONNELLE': {
    type: InformationPersonnelleSchema,
    required: true
  },
  'DOCUMENT PERSONNELLE': {
    type: DocumentPersonnelleSchema,
    required: true
  },
  Status: {
    type: StatusSchema,
    required: true
  }
}, {
  timestamps: true,
  collection: 'employees'
});

// Créer et exporter le modèle
const Employee = mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;