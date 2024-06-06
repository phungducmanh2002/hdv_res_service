const SequelizeConfig = require("../../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class HotelImageEntity extends Model {}

HotelImageEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idHotel: {
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
    tableName: "hotel_image",
    indexes: [
      {
        unique: true,
        fields: ["idHotel", "idImage"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = HotelImageEntity;
