export type Menu = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | string[]; // Can be string for single image or array for multiple images
};

export type CreateMenuDTO = Omit<Menu, "id"> & {
  id?: string;
  imageUrl?: string | string[];
};

export type UpdateMenuDTO = Menu & {
  imageUrl?: string | string[];
};
