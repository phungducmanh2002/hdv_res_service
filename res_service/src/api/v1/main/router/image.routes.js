const UploadFileHelper = require("../../helper/upload.helper");
const ImageController = require("../controller/image.controller");
const RequestMiddleWare = require("../middleware/req.middleware");

const router = require("express").Router();

router.get("/:id", RequestMiddleWare.CheckID, ImageController.Get);
router.get("", ImageController.GetAll);
router.post("", UploadFileHelper.UploadFile.single("image"), ImageController.Create);

class ImageRouter {
  static router = router;
}

module.exports = ImageRouter;
