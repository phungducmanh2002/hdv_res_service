const UploadFileHelper = require("../../helper/upload.helper");
const ImageEntity = require("../data/model/entity/image.entity");

class ImageService {
  static async CreateImage(imageBuffer) {
    return await ImageEntity.create({ data: imageBuffer });
  }
  static async GetImage(idImage) {
    return await ImageEntity.findByPk(idImage);
  }
  static async GetAll() {
    return await ImageEntity.findAll();
  }
}

module.exports = ImageService;
