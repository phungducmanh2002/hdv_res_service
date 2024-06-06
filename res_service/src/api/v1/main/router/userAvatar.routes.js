const UploadFileHelper = require("../../helper/upload.helper");
const UserAvatarController = require("../controller/userAvatar.controller");
const RequestMiddleWare = require("../middleware/req.middleware");

const router = require("express").Router();

router.post("/:id", RequestMiddleWare.CheckID, UploadFileHelper.UploadFile.single("image"), UserAvatarController.ChangeAvatar);
router.get("/:id", RequestMiddleWare.CheckID, UserAvatarController.Get);
router.get("/:id/images", RequestMiddleWare.CheckID, UserAvatarController.GetAvatarImage);

class UserAvatarRouter {
  static router = router;
}

module.exports = UserAvatarRouter;
