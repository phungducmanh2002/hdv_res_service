const SequelizeConfig = require("../../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class UserAvatarEntity extends Model {}

UserAvatarEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idImage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeConfig.sequelize,
    freezeTableName: true,
    tableName: "userAvatar",
    indexes: [
      {
        unique: true,
        fields: ["idUser"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = UserAvatarEntity;
