interface Design {
  id: string;
  creatorType: string;
  createdAt: string;
  updatedAt: string;
  publicKey: string | null;
}

export interface Brand {
  id: string;
  description: string;
  timeline: string;
  status: boolean;
  timelineStatus: string | null;
  createdAt: string;
  updatedAt: string;
  outfitName: string;
  pieceNumber: number;
  prompt: string;
  designId: string;
  maker: string | Maker | null; // Allow both string and Maker for flexibility
  makerId: string | null;
  manufacturer: boolean;
  userId: string;
  user: User;
  design: Design;
}

export interface Media {
  createdAt: string;
  designId: null | string;
  id: string;
  link: string;
  mediaType: string;
  pieceId: null | string;
  projectId: null | string;
  updatedAt: string;
  userId: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  verified: boolean;
  lastseen: string | null;
  createdAt: string;
  updatedAt: string;
  userType: string | null;
  creator?: {
    id: string;
    userId: string;
    fullName: string;
    location: string;
    category: string[];
    skills: string[];
    creatorType: string;
    createdAt: string;
    updatedAt: string;
  };
  media: Media[];
  brand?: {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    username: string;
  } | null;
  maker?: {
    creator?: {
      id: string;
      userId: string;
      fullName: string;
      location: string;
      category: string[];
      skills: string[];
      creatorType: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  active: boolean;
}

interface Maker {
  id: string;
  fullName: string;
  email: string;
  location: string;
  skills: string[];
  category: string[];
  creatorType: string;
  active: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  lastseen: string | null;
  brand: {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    username: string;
  } | null;
  creator?: {
    id: string;
    userId: string;
    fullName: string;
    location: string;
    category: string[];
    skills: string[];
    creatorType: string;
    createdAt: string;
    updatedAt: string;
  };
  isAdmin: boolean;
  verified: boolean;
  media: Media;
}

interface Design {
  id: string;
  outfitName: string;
  pieceNumber: number;
  prompt: string;
  creatorType: string;
  publicKey: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface UserP {
  id: string;
  description: string;
  timeline: string;
  status: boolean;
  timelineStatus: string | null;
  createdAt: string;
  updatedAt: string;
  designId: string;
  manufacturer: boolean;
  makerId: string | null;
  maker: Maker | null; // Expecting a Maker object or null
  userId: string;
  user: User;
  design: Design;
}

export interface UserProps {
  user: Brand | UserP;
  brandId: string;
  setBrandId: (id: string) => void;
}
