export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
};
export type Pet = {
  id?: number;
  name: string;
  category: string;
  tags: string;
  photoUrls: string[];
  status: string;
};
export type Order = {
  id?: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: string;
  complete: boolean;
};
