export interface IUserProfile {
  id?: string;
  name: string;
  email: string;
  age?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}