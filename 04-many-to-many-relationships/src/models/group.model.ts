import { DataTypes, Model, ModelCtor } from 'sequelize';
import { sequilize } from '../database/connections';

export const GroupModel: ModelCtor<Model> = sequilize.define(
  'group',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);
