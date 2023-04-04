import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface upload_fileAttributes {
  id: number;
  reference_id?: number;
  original_file_name?: string;
  file_name?: string;
  file_size?: number;
  file_path?: string;
  file_type?: number;
  upload_type?: number;
  notes?: string;
  is_deleted?: number;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;
  url?: string;
}

export type upload_filePk = "id";
export type upload_fileId = upload_file[upload_filePk];
export type upload_fileOptionalAttributes = "id" | "reference_id" | "original_file_name" | "file_name" | "file_size" | "file_path" | "file_type" | "upload_type" | "notes" | "is_deleted" | "created_by" | "created_date" | "updated_by" | "updated_date" | "url";
export type upload_fileCreationAttributes = Optional<upload_fileAttributes, upload_fileOptionalAttributes>;

export class upload_file extends Model<upload_fileAttributes, upload_fileCreationAttributes> implements upload_fileAttributes {
  id!: number;
  reference_id?: number;
  original_file_name?: string;
  file_name?: string;
  file_size?: number;
  file_path?: string;
  file_type?: number;
  upload_type?: number;
  notes?: string;
  is_deleted?: number;
  created_by?: number;
  created_date?: Date;
  updated_by?: number;
  updated_date?: Date;
  url?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof upload_file {
    return upload_file.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    reference_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    original_file_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    file_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    file_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    upload_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
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
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'upload_file',
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
