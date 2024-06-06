const express = require("express");

const DataResponse = require("../data/data.respone");
const ImageService = require("../service/image.service");
const UserAvatarService = require("../service/userAvatar.service");
const UploadFileHelper = require("../../helper/upload.helper");

class UserAvatarController {
  static ChangeAvatar = [
    (req, res, next) => {
      const imageBuffer = req?.file?.buffer;
      if (!imageBuffer) {
        res.json(DataResponse.BadRequest("Không tìm thấy file upload!"));
        return;
      }

      UserAvatarService.ChangeUserAvatar(req.reqData.id, imageBuffer)
        .then((userAvatar) => {
          userAvatar.data = null;
          res.json(DataResponse.Oke(userAvatar, "change user avatar success"));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static Get = [
    (req, res, next) => {
      if (!req.reqData.id) {
        res.json(DataResponse.BadRequest("please provide id user"));
        return;
      }

      UserAvatarService.Get(req.reqData.id)
        .then((userAvatar) => {
          if (!userAvatar) {
            res.json(DataResponse.Notfound());
            return;
          }
          res.json(DataResponse.Oke(userAvatar));
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err, err.message));
        });
    },
  ];
  static GetAvatarImage = [
    (req, res, next) => {
      if (!req.reqData.id) {
        res.json(DataResponse.BadRequest("please provide id user"));
        return;
      }

      UserAvatarService.Get(req.reqData.id)
        .then((userAvatar) => {
          if (!userAvatar) {
            res.json(DataResponse.Notfound());
            return;
          }
          ImageService.GetImage(userAvatar.idImage)
            .then((image) => {
              res.header("Content-Type", "image/png");
              res.send(image.data);
              res.end();
            })
            .catch((err) => {
              res.json(DataResponse.ServerError(err, err.message));
            });
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err, err.message));
        });
    },
  ];
}
module.exports = UserAvatarController;
