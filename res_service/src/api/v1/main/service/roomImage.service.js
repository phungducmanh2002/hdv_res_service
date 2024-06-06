const ImageEntity = require("../data/model/entity/image.entity");
const RoomImageEntity = require("../data/model/entity/roomImage.entity");
const ImageService = require("./image.service");

class RoomImageService {
  static async CreateRoomImage(idRoom, imageBuffer) {
    return new Promise((reslove, reject) => {
      // create image
      ImageService.CreateImage(imageBuffer)
        .then((image) => {
          // connect id hotel to id image
          RoomImageEntity.create({
            idRoom: idRoom,
            idImage: image.id,
          })
            .then((roomImage) => {
              reslove(roomImage);
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
  static async DeleteRoomImage(idRoom, idImage) {
    return new Promise((resolve, reject) => {
      // delete room image connection
      RoomImageEntity.destroy({ where: { idRoom: idRoom, idImage: idImage } })
        .then((deletedRoomImageCount) => {
          if (deletedRoomImageCount == 0) {
            const defErr = {
              code: 400,
              message: "hotel image not exists",
            };
            reject(defErr);
          } else {
            // delete image
            ImageEntity.destroy({ where: { id: idImage } })
              .then((deletedImageCount) => {
                resolve({ deletedRoomImageCount, deletedImageCount });
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
  static async GetAllRoomImage(idRoom) {
    return await new Promise((resolve, reject) => {
      RoomImageEntity.findAll({
        where: {
          idRoom: idRoom,
        },
      })
        .then((roomImages) => {
          const allIdImage = [];
          roomImages.forEach((element) => {
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

module.exports = RoomImageService;
