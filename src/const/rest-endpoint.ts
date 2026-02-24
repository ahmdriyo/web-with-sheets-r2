const prefix = "/api";

export enum RestEndpoint {
  // Authentication
  PostLogin = `${prefix}/auth/login`,

  // Categories
  GetAllCategories = `${prefix}/categories`,
  GetCategoryById = `${prefix}/categories/{id}`,
  PostCreateCategory = `${prefix}/categories`,
  PutUpdateCategory = `${prefix}/categories/{id}`,
  DeleteCategory = `${prefix}/categories/{id}`,

  // Models
  GetAllModels = `${prefix}/models`,
  GetModelById = `${prefix}/models/{id}`,
  PostCreateModel = `${prefix}/models`,
  PutUpdateModel = `${prefix}/models/{id}`,
  DeleteModel = `${prefix}/models/{id}`,

  // Brands
  GetAllBrands = `${prefix}/brands`,
  GetBrandById = `${prefix}/brands/{id}`,
  PostCreateBrand = `${prefix}/brands`,
  PutUpdateBrand = `${prefix}/brands/{id}`,
  DeleteBrand = `${prefix}/brands/{id}`,

  // About
  GetAllAbout = `${prefix}/about`,
  PutUpdateAbout = `${prefix}/about/{id}`,

  // User Admin
  GetAllUserAdmins = `${prefix}/user-admin`,
  GetUserAdminByUsername = `${prefix}/user-admin/{username}`,

  // Cars
  GetAllCars = `${prefix}/cars`,
  GetCarById = `${prefix}/cars/{id}`,
  PostCreateCar = `${prefix}/cars`,
  PutUpdateCar = `${prefix}/cars/{id}`,
  DeleteCar = `${prefix}/cars/{id}`,

  // Site Settings
  GetAllSiteSettings = `${prefix}/site-settings`,
  PutUpdateSiteSetting = `${prefix}/site-settings`,

  // Contact
  PostContact = `${prefix}/contact`,
}
