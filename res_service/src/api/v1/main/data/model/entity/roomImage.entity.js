const SequelizeConfig = require("../../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class RoomImageEntity extends Model {}

RoomImageEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idRoom: {
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
    tableName: "room_image",
    indexes: [
      {
        unique: true,
        fields: ["idRoom", "idImage"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = RoomImageEntity;
