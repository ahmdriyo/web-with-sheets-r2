export type About = {
  id: string;
  title: string;
  description: string;
  ourMission: string;
  ourVision: string;
  carsSold: string;
  happyCustomers: string;
  yearsExperience: string;
};

export type UpdateAboutDTO = {
  title: string;
  description: string;
  ourMission: string;
  ourVision: string;
  carsSold: string;
  happyCustomers: string;
  yearsExperience: string;
};

export type AboutResponse = {
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    ourMission: string;
    ourVision: string;
    carsSold: string;
    happyCustomers: string;
    yearsExperience: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
