const SequelizeConfig = require("../../../../config/sequelize.config");
const ProjectHelper = require("../../../../helper/project.helper");
const HotelImageEntity = require("./hotelImage.entity");
const ImageEntity = require("./image.entity");
const RoomImageEntity = require("./roomImage.entity");
const UserAvatarEntity = require("./userAvatar.entity");

ImageEntity.hasMany(UserAvatarEntity, { foreignKey: "idImage" });
UserAvatarEntity.belongsTo(ImageEntity, { foreignKey: "idImage" });

ImageEntity.hasMany(HotelImageEntity, { foreignKey: "idImage" });
HotelImageEntity.belongsTo(ImageEntity, { foreignKey: "idImage" });

ImageEntity.hasMany(RoomImageEntity, { foreignKey: "idImage" });
RoomImageEntity.belongsTo(ImageEntity, { foreignKey: "idImage" });

class EntityIndex {
  static async DoAction() {
    if (ProjectHelper.getEnviromentValue("GENERATE_DB") == 1) {
      await SequelizeConfig.sequelize.sync({ force: true });
    }
    if (ProjectHelper.getEnviromentValue("GENERATE_DATA") == 1) {
    }
  }
}

module.exports = EntityIndex;
