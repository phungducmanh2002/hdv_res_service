const RoomImageController = require("../controller/roomImage.controller");

const router = require("express").Router();

router.post("/create/:idRoom", RoomImageController.CreateRoomImage);
router.delete("/remove/:idRoom/:idImage", RoomImageController.RemoveRoomImage);
router.get("/get-all-image/:idRoom", RoomImageController.GetAllRoomImage);

class RoomImageRouter {
  static router = router;
}

module.exports = RoomImageRouter;
