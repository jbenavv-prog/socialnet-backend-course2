const express = require("express");
const multer = require("multer");
const {
  updatePhotoProfile,
  getProfile,
} = require("../controllers/profile.controller");
const router = express.Router();


const upload = multer();


router.post(
  "/updatePhotoProfile",
  upload.single(
    /*permite usar multer en la API con el fin de poder leer los archivos de la solicitud */
    "photo"
  ),
  updatePhotoProfile
);
router.get("/getProfile", getProfile);


module.exports = router;
