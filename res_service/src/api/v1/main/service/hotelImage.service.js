const HotelImageEntity = require("../data/model/entity/hotelImage.entity");
const ImageEntity = require("../data/model/entity/image.entity");
const ImageService = require("./image.service");

class HotelImageService {
  static async CreateHotelImage(idHotel, imageBuffer) {
    return new Promise((reslove, reject) => {
      // create image
      ImageService.CreateImage(imageBuffer)
        .then((image) => {
          // connect id hotel to id image
          HotelImageEntity.create({
            idHotel: idHotel,
            idImage: image.id,
          })
            .then((hotelImage) => {
              reslove(hotelImage);
            })
            .catch((err) => {
              image
                .destroy()
                .then(() => {})
                .catch((err) => {});
              const defErr = {
                code: 500,
                message: err.message,
                data: err,
              };
              reject(defErr);
            });
        })
        .catch((err) => {
          const defErr = {
            code: 500,
            message: err.message,
            data: err,
          };
          reject(defErr);
        });
    });
  }
  static async DeleteHotelImage(idHotel, idImage) {
    return new Promise((resolve, reject) => {
      // delete hotel image connection
      HotelImageEntity.destroy({ where: { idHotel: idHotel, idImage: idImage } })
        .then((deletedHotelImageCount) => {
          if (deletedHotelImageCount == 0) {
            const defErr = {
              code: 400,
              message: "hotel image not exists",
            };
            reject(defErr);
          } else {
            // delete image
            ImageEntity.destroy({ where: { id: idImage } })
              .then((deletedImageCount) => {
                resolve({ deletedHotelImageCount, deletedImageCount });
              })
              .catch((err) => {
                const defErr = {
                  code: 500,
                  message: err.message,
                  data: err,
                };
                reject(defErr);
              });
          }
        })
        .catch((err) => {
          const defErr = {
            code: 500,
            message: err.message,
            data: err,
          };
          reject(defErr);
        });
    });
  }
  static async GetAllHotelImage(idHotel) {
    return await new Promise((resolve, reject) => {
      HotelImageEntity.findAll({
        where: {
          idHotel: idHotel,
        },
      })
        .then((hotelImages) => {
          const allIdImage = [];
          hotelImages.forEach((element) => {
            allIdImage.push(element.idImage);
          });
          resolve(allIdImage);
        })
        .catch((err) => {
          const defErr = {
            code: 500,
            message: err.message,
            data: err,
          };
          reject(defErr);
        });
    });
  }
}

module.exports = HotelImageService;
