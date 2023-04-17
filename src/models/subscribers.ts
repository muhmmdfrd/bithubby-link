import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface subscribersAttributes {
  id: number;
  name?: string;
  telegram_id?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type subscribersPk = 'id';
export type subscribersId = subscribers[subscribersPk];
export type subscribersOptionalAttributes =
  | 'id'
  | 'name'
  | 'telegram_id'
  | 'email'
  | 'created_at'
  | 'updated_at';
export type subscribersCreationAttributes = Optional<
  subscribersAttributes,
  subscribersOptionalAttributes
>;

export class subscribers
  extends Model<subscribersAttributes, subscribersCreationAttributes>
  implements subscribersAttributes
{
  id!: number;
  name?: string;
  telegram_id?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof subscribers {
    return subscribers.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        telegram_id: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'subscribers',
        timestamps: true,
        underscored: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
  }
}
