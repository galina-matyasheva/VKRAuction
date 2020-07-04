const express = require('express')
const multer = require('multer');

const PropertyController = require('../controllers/PropertyController')

const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 10000000 // максимальный размер файла 1MB = 10000000 байт
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
            cb(new Error('только загрузка файлов в jpg или jpeg формате'));
        }
        cb(undefined, true); // продолжить загрузку
    }
});

router.post('/auction', PropertyController.createAuction)
router.put('/auction/:id', PropertyController.updateAuction)
router.delete('/auction/:id', PropertyController.deleteAuction) // отмена аукциона
router.get('/auction/:id', PropertyController.getAuctionById)
router.get('/auctions', PropertyController.getAuctionList)
router.post('/auction/bid', PropertyController.createBid)
router.get('/auction/bid', PropertyController.getHighestBid)

router.post('/photos',  upload.single('photo'), PropertyController.createPhoto, (error, req, res, next) => {
    if (error) {
        res.status(500).send({
            upload_error: error.message
        });
    }
});
router.get('/photos/:id', PropertyController.getPhoto);
router.get('/photos', PropertyController.getPhotos);


module.exports = router
