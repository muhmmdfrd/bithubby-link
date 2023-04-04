import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface one_time_passwordAttributes {
  id: number;
  user_id: number;
  otp?: string;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;
}

export type one_time_passwordPk = "id";
export type one_time_passwordId = one_time_password[one_time_passwordPk];
export type one_time_passwordOptionalAttributes = "id" | "otp" | "created_by" | "created_date" | "updated_by" | "updated_date";
export type one_time_passwordCreationAttributes = Optional<one_time_passwordAttributes, one_time_passwordOptionalAttributes>;

export class one_time_password extends Model<one_time_passwordAttributes, one_time_passwordCreationAttributes> implements one_time_passwordAttributes {
  id!: number;
  user_id!: number;
  otp?: string;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof one_time_password {
    return one_time_password.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING(50),
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
    tableName: 'one_time_password',
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
