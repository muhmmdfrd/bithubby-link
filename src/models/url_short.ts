import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface url_shortAttributes {
  id: number;
  code?: string;
  url?: string;
  url_shorten?: string;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;
  name?: string;
  description?: string;
}

export type url_shortPk = 'id';
export type url_shortId = url_short[url_shortPk];
export type url_shortOptionalAttributes =
  | 'id'
  | 'code'
  | 'url'
  | 'url_shorten'
  | 'created_by'
  | 'created_date'
  | 'updated_by'
  | 'updated_date'
  | 'name'
  | 'description';
export type url_shortCreationAttributes = Optional<
  url_shortAttributes,
  url_shortOptionalAttributes
>;

export class url_short
  extends Model<url_shortAttributes, url_shortCreationAttributes>
  implements url_shortAttributes
{
  id!: number;
  code?: string;
  url?: string;
  url_shorten?: string;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;
  name?: string;
  description?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof url_short {
    return url_short.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        code: {
          type: DataTypes.STRING(100),
          allowNull: true,
          unique: 'idx_unique_code',
        },
        url: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        url_shorten: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        created_by: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        created_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updated_by: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        updated_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'url_short',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'idx_unique_code',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'code' }],
          },
        ],
      }
    );
  }
}
