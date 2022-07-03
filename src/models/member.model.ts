'use strict';

import { Sequelize } from 'sequelize/types';
import { Model, DataTypes, Association } from 'sequelize';
import { Session } from './session.model';

export interface MemberAttribute {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  gender: 'male' | 'female';
  key: 'ADMIN' | 'STAFF' | 'MEMBER';
  createdAt?: string;
  updatedAt?: string;
  keyChangePw?: string;
}

export class Member extends Model implements MemberAttribute {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  public id?: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public password!: string;
  public gender!: 'male' | 'female';
  public key!: 'ADMIN' | 'STAFF' | 'MEMBER';

  public readonly createdAt?: string | undefined;
  public readonly updatedAt?: string | undefined;
  public readonly keyChangePw?: string | undefined;

  public readonly session?: Session[];

  public static associations: {
    // define association here
    session: Association<Member, Session>;
  };
}

export function initMember(sequelize: Sequelize): void {
  Member.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      gender: DataTypes.ENUM('male', 'female'),
      key: DataTypes.ENUM('ADMIN', 'STAFF', 'MEMBER'),
      keyChangePw: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Member',
    }
  );
}

export function associateMember(): void {
  Member.hasMany(Session, {
    sourceKey: 'id',
    foreignKey: 'memberId',
    as: 'sessions',
  });
}
