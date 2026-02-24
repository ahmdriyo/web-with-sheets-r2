export type Brand = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateBrandDTO = {
  name: string;
};

export type UpdateBrandDTO = {
  name: string;
};

export type BrandResponse = {
  message: string;
  data: {
    id: string;
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
