import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface user_sessionAttributes {
  user_id: number;
  refresh_token?: string;
  created_date?: Date;
  updated_date?: Date;
}

export type user_sessionPk = "user_id";
export type user_sessionId = user_session[user_sessionPk];
export type user_sessionOptionalAttributes = "refresh_token" | "created_date" | "updated_date";
export type user_sessionCreationAttributes = Optional<user_sessionAttributes, user_sessionOptionalAttributes>;

export class user_session extends Model<user_sessionAttributes, user_sessionCreationAttributes> implements user_sessionAttributes {
  user_id!: number;
  refresh_token?: string;
  created_date?: Date;
  updated_date?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof user_session {
    return user_session.init({
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    refresh_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_session',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
