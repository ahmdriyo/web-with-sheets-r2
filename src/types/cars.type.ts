export type FuelType = "bensin" | "diesel" | "hybrid" | "electric";

export type Transmission = "manual" | "automatic";

export type CarCondition = "new" | "used";

export type CarStatus = "available" | "sold" | "booked";

export type Cars = {
  id: string;
  category: string;
  title: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;

  transmission: Transmission;
  fuel_type: FuelType;
  condition: CarCondition;

  seats: number;
  engine_cc: number | null;
  color: string;

  status: CarStatus;
  is_featured: boolean;

  primary_image_url: string;
  image_urls: string[];

  description: string;

  created_at: Date;
};

export type CarsListDTO = Omit<Cars, "description">;

export type CreateCarsDTO = {
  category: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuel_type: FuelType;
  condition: CarCondition;
  seats: number;
  engine_cc?: number | null;
  color: string;
  status: CarStatus;
  is_featured: boolean;
  description: string;
  images: File[];
};

export type UpdateCarsDTO = {
  category?: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  transmission?: Transmission;
  fuel_type?: FuelType;
  condition?: CarCondition;
  seats?: number;
  engine_cc?: number | null;
  color?: string;
  status?: CarStatus;
  is_featured?: boolean;
  description?: string;
  images?: File[];
};

export type CarsResponse = {
  message: string;
  data: Cars[];
  pagenation: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
