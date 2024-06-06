const UploadFileHelper = require("../../helper/upload.helper");
const DataResponse = require("../data/data.respone");
const RoomImageService = require("../service/roomImage.service");

class RoomImageController {
  static CreateRoomImage = [
    /**STEP1: CHECK REQUEST */
    (req, res, next) => {
      const idRoom = parseInt(req.params?.idRoom);
      if (!idRoom) {
        res.json(DataResponse.BadRequest("please provide id hotel"));
        return;
      }
      const reqData = { idRoom: idRoom };
      req.reqData = reqData;
      next();
    },
    /**STEP2: GET FILE BUFFER */
    UploadFileHelper.UploadFile.single("image"),
    (req, res, next) => {
      const imageBuffer = req?.file?.buffer;
      if (!imageBuffer) {
        res.json(DataResponse.BadRequest("Không tìm thấy file upload!"));
        return;
      }
      req.reqData.imageBuffer = imageBuffer;
      next();
    },
    /**STEP3: CREATE HOTEL IMAGE */
    (req, res, next) => {
      RoomImageService.CreateRoomImage(req.reqData.idRoom, req.reqData.imageBuffer)
        .then((roomImage) => {
          res.json(DataResponse.Oke(roomImage, "create room image success"));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static RemoveRoomImage = [
    /**STEP1: CHECK REQUEST */
    (req, res, next) => {
      const idRoom = parseInt(req.params?.idRoom);
      const idImage = parseInt(req.params?.idImage);
      if (!idRoom || !idImage) {
        res.json(DataResponse.BadRequest("please provide id hotel and id image"));
        return;
      }
      const reqData = { idRoom: idRoom, idImage: idImage };
      req.reqData = reqData;
      next();
    },
    /**STEP2: REMOVE HOTEL IMAGE */
    (req, res, next) => {
      RoomImageService.DeleteRoomImage(req.reqData.idRoom, req.reqData.idImage)
        .then((result) => {
          res.json(DataResponse.Oke(result));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static GetAllRoomImage = [
    /**STEP1: CHECK REQUEST */
    (req, res, next) => {
      const idRoom = parseInt(req.params?.idRoom);
      if (!idRoom) {
        res.json(DataResponse.BadRequest("please provide id room"));
        return;
      }
      const reqData = { idRoom: idRoom };
      req.reqData = reqData;
      next();
    },
    /**STEP2: GET ALL IMAGE */
    (req, res, next) => {
      RoomImageService.GetAllRoomImage(req.reqData.idRoom)
        .then((allIdImages) => {
          res.json(DataResponse.Oke({ idRoom: req.reqData.idRoom, idImages: allIdImages }));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
}
module.exports = RoomImageController;
