export type Categories = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};
export type CreateCategoriesDTO = Categories;
export type UpdateCategoriesDTO = Partial<Categories>;
export type CategoriesListDTO = Omit<Categories, "created_at" | "updated_at">[];
