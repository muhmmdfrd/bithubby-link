import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface userAttributes {
  id: number;
  name?: string;
  username?: string;
  password?: string;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "name" | "username" | "password" | "created_by" | "created_date" | "updated_by" | "updated_date";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  name?: string;
  username?: string;
  password?: string;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
