import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

type StatusUsersMock = 'active' | 'banned';
type RoleUsersMock =
  | 'Leader'
  | 'Hr Manager'
  | 'UI Designer'
  | 'UX Designer'
  | 'UI/UX Designer'
  | 'Project Manager'
  | 'Backend Developer'
  | 'Full Stack Designer'
  | 'Front End Developer'
  | 'Full Stack Developer';

export interface UsersMock {
  id: string;
  avatarUrl: string;
  name: string;
  company: string;
  isVerified: boolean;
  status?: StatusUsersMock;
  role?: RoleUsersMock;
}

const users: Array<UsersMock> = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
