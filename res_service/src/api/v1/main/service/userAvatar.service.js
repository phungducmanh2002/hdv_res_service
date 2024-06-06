const ImageEntity = require("../data/model/entity/image.entity");
const UserAvatarEntity = require("../data/model/entity/userAvatar.entity");
const ImageService = require("./image.service");

class UserAvatarService {
  static async RemoveUserAvatar(idUser) {
    return await new Promise((resolve, reject) => {
      UserAvatarEntity.findOne({
        where: {
          idUser: idUser,
        },
      })
        .then((userAvatar) => {
          if (!userAvatar) {
            resolve({ countUserAvatarDeleted: 0, countImageDeleted: 0 });
          }
          UserAvatarEntity.destroy({
            where: {
              idUser: idUser,
            },
          })
            .then((countUserAvatarDeleted) => {
              console.log(userAvatar.idImage);
              const idImage = userAvatar.idImage;
              ImageEntity.destroy({
                where: {
                  id: idImage,
                },
              })
                .then((countImageDeleted) => {
                  resolve({ countUserAvatarDeleted, countImageDeleted });
                })
                .catch((err) => {
                  const defErr = {
                    code: 500,
                    message: err.message,
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
  static async CreateUserAvatar(idUser, idImage) {
    return await UserAvatarEntity.create({ idUser: idUser, idImage: idImage });
  }
  static async ChangeUserAvatar(idUser, imageBuffer) {
    return await new Promise((resolve, reject) => {
      ImageService.CreateImage(imageBuffer)
        .then((image) => {
          UserAvatarService.RemoveUserAvatar(idUser)
            .then(({ countUserAvatarDeleted, countImageDeleted }) => {
              UserAvatarService.CreateUserAvatar(idUser, image.id)
                .then((userAvatar) => {
                  resolve(userAvatar);
                })
                .catch((err) => {
                  const defErr = { code: 500, data: err, message: err.message };
                  reject(defErr);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          const defErr = { code: 500, data: err, message: err.message };
          reject(defErr);
        });
    });
  }
  static async Get(idUser) {
    return await UserAvatarEntity.findOne({ where: { idUser: idUser } });
  }
}

module.exports = UserAvatarService;
