export type Model = {
  id: string;
  id_brand: string;
  id_category?: string;
  brand_name?: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateModelDTO = {
  name: string;
  id_brand: string;
  id_category?: string;
};

export type UpdateModelDTO = {
  name: string;
  id_brand: string;
  id_category?: string;
};

export type ModelResponse = {
  message: string;
  data: {
    id: string;
    id_brand: string;
    id_category?: string;
    name: string;
    created_at: string;
    updated_at: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
