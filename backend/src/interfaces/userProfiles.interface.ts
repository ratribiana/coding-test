export interface IUserProfile {
  _id?: string;
  name: string;
  email: string;
  age?: number;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
