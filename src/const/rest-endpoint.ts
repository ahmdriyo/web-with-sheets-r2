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
  GetSiteSettingById = `${prefix}/site-settings/{id}`,
  PostCreateSiteSetting = `${prefix}/site-settings`,
  PutUpdateSiteSetting = `${prefix}/site-settings/{id}`,
  DeleteSiteSetting = `${prefix}/site-settings/{id}`,
}
