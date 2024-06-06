const UploadFileHelper = require("../../helper/upload.helper");
const DataResponse = require("../data/data.respone");
const HotelImageService = require("../service/hotelImage.service");

class HotelImageController {
  static CreateHotelImage = [
    /**STEP1: CHECK REQUEST */
    (req, res, next) => {
      const idHotel = parseInt(req.params?.idHotel);
      if (!idHotel) {
        res.json(DataResponse.BadRequest("please provide id hotel"));
        return;
      }
      const reqData = { idHotel: idHotel };
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
      HotelImageService.CreateHotelImage(req.reqData.idHotel, req.reqData.imageBuffer)
        .then((hotelImage) => {
          res.json(DataResponse.Oke(hotelImage, "create hotel image success"));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static RemoveHotelImage = [
    /**STEP1: CHECK REQUEST */
    (req, res, next) => {
      const idHotel = parseInt(req.params?.idHotel);
      const idImage = parseInt(req.params?.idImage);
      if (!idHotel || !idImage) {
        res.json(DataResponse.BadRequest("please provide id hotel and id image"));
        return;
      }
      const reqData = { idHotel: idHotel, idImage: idImage };
      req.reqData = reqData;
      next();
    },
    /**STEP2: REMOVE HOTEL IMAGE */
    (req, res, next) => {
      HotelImageService.DeleteHotelImage(req.reqData.idHotel, req.reqData.idImage)
        .then((result) => {
          res.json(DataResponse.Oke(result));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
  static GetAllHotelImage = [
    /**STEP1: CHECK REQUEST */
    (req, res, next) => {
      const idHotel = parseInt(req.params?.idHotel);
      if (!idHotel) {
        res.json(DataResponse.BadRequest("please provide id hotel"));
        return;
      }
      const reqData = { idHotel: idHotel };
      req.reqData = reqData;
      next();
    },
    /**STEP2: GET ALL IMAGE */
    (req, res, next) => {
      HotelImageService.GetAllHotelImage(req.reqData.idHotel)
        .then((allIdImages) => {
          res.json(DataResponse.Oke({ idHotel: req.reqData.idHotel, idImages: allIdImages }));
        })
        .catch((err) => {
          res.json(DataResponse.Clone(err));
        });
    },
  ];
}
module.exports = HotelImageController;
