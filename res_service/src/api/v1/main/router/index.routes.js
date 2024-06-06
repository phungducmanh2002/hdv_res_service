const HotelImageRouter = require("./hotelImage.routes");
const ImageRouter = require("./image.routes");
const RoomImageRouter = require("./roomImage.routes");
const UserAvatarRouter = require("./userAvatar.routes");

const router = require("express").Router();

router.use("/images", ImageRouter.router);
router.use("/avatars", UserAvatarRouter.router);
router.use("/hotel-images", HotelImageRouter.router);
router.use("/room-images", RoomImageRouter.router);

class IndexRouter {
  static router = router;
}

module.exports = IndexRouter;
