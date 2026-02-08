export type Menu = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export type CreateMenuDTO = Omit<Menu, "id"> & {
  id?: string;
  imageUrl?: string;
};

export type UpdateMenuDTO = Menu & {
  imageUrl?: string;
};
