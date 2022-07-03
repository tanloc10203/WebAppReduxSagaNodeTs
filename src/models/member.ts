export interface Member {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  gender: 'male' | 'female';
  key: 'ADMIN' | 'STAFF' | 'MEMBER';
  createdAt?: string;
  updatedAt?: string;
}
