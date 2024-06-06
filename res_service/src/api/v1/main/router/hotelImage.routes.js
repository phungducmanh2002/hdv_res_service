const HotelImageController = require("../controller/hotelImage.controller");

const router = require("express").Router();

router.post("/:idHotel", HotelImageController.CreateHotelImage);
router.delete("/:idHotel/:idImage", HotelImageController.RemoveHotelImage);
router.get("/:idHotel", HotelImageController.GetAllHotelImage);

class HotelImageRouter {
  static router = router;
}

module.exports = HotelImageRouter;
