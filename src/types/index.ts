export interface Recipe {
  id?: string;
  nama_resep: string;
  porsi: number;
  waktu_memasak: string;
  bahan: string[];
  langkah: string[];
  tips: string;
  kategori: string;
  tingkat_kesulitan: string;
  created_at?: Date;
  rating?: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  date: Date;
  rating?: number;
}

export type RecipeFormData = {
  query: string;
  kategori?: string;
  tingkat_kesulitan?: string;
};

export type ThemeMode = 'light' | 'dark';