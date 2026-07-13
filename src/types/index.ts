export interface Pet {
  _id: string;
  petName: string;
  breed: string;
  species: string;
  age: number | string;
  gender: string;
  adoptionFee: number | string;
  healthStatus: string;
  image: string;
  location: string;
  status: string; // e.g., 'available' | 'adopted'
  ownerEmail: string;
  ownerName?: string;
  description?: string;
  createdAt?: string;
}

export interface AdoptionRequest {
  _id: string;
  petId: string;
  petName: string;
  petImage?: string;
  ownerEmail?: string;
  userEmail: string;
  userName: string;
  userImage?: string;
  phoneNumber?: string;
  address?: string;
  pickupDate?: string;
  message?: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
}

export interface UserProfile {
  _id?: string;
  email: string;
  name: string;
  image?: string;
  phoneNumber?: string;
  location?: string;
  bio?: string;
  experience?: string;
  facebook?: string;
  instagram?: string;
  updatedAt?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string;
}

export interface Session {
  user: SessionUser;
  sessionToken: string;
  expiresAt: string;
}
