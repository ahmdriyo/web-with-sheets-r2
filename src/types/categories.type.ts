export type Categories = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateCategoriesDTO = {
  name: string;
};

export type UpdateCategoriesDTO = {
  name: string;
};

export type CategoriesResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }[];
  pagenation: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
