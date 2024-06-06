const SequelizeConfig = require("../../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class ImageEntity extends Model {}

ImageEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    data: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeConfig.sequelize,
    freezeTableName: true,
    tableName: "image",
    indexes: [
      // {
      //   unique: true,
      //   fields: ["roleName"],
      // },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = ImageEntity;
