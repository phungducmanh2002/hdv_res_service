const express = require("express");

const DataResponse = require("../data/data.respone");
const ImageService = require("../service/image.service");

class ImageController {
  static Create = [
    (req, res, next) => {
      const imageBuffer = req?.file?.buffer;
      if (!imageBuffer) {
        res.json(DataResponse.BadRequest("Không tìm thấy file upload!"));
        return;
      }

      ImageService.CreateImage(imageBuffer)
        .then((image) => {
          res.json(
            DataResponse.Oke({ id: image.id }, "create image successfully")
          );
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err));
        });
    },
  ];
  static Get = [
    /**STEP1: CHECK REQUEST*/
    (req, res, next) => {
      const idImage = parseInt(req?.params?.id);
      if (!idImage) {
        res.json(DataResponse.BadRequest("please provide id image"));
        return;
      }
      const reqData = { idImage: idImage };
      req.reqData = reqData;
      next();
    },
    /**STEP2: GET IMAGE*/
    (req, res, next) => {
      ImageService.GetImage(req.reqData.idImage)
        .then((image) => {
          res.header("Content-Type", "image/png");
          res.send(image.data);
          res.end();
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err, err.message));
        });
    },
  ];
  static GetAll = [
    (req, res, next) => {
      ImageService.GetAll()
        .then((images) => {
          const idImages = images.map((image) => {
            return { id: image.id };
          });
          res.json(DataResponse.Oke(idImages));
        })
        .catch((err) => {
          res.json(DataResponse.ServerError(err, err.message));
        });
    },
  ];
}
module.exports = ImageController;
