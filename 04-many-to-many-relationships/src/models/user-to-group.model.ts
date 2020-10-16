import { GroupModel } from './group.model';
import { UserModel } from './user.model';

GroupModel.belongsToMany(UserModel, {
  through: 'user_group',
  // as: 'tags',
  foreignKey: 'id'
});

UserModel.belongsToMany(GroupModel, {
  through: 'user_group',
  // as: 'tags',
  foreignKey: 'id'
});

