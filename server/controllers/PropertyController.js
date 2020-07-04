const PropertyInfo = require('../models/propertyInfo');
const Photo = require('../models/Photo');
const SmtpService = require('../service/SmtpService');
const AuctionService = require('../service/AuctionService');


createAuction = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an auction',
        })
    }

    const auction = new PropertyInfo(body);

    if (!auction) {
        return res.status(400).json({ success: false, error: err })
    }

    auction
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: auction._id,
                message: 'auction created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'auction not created!',
            })
        })
    const auctionService = new AuctionService();

    auctionService.createAuction(auction);

    // SmtpService.sendEmail('аукцион недвижимости','поздравляем, вы успешно создали ваш аукцион в нашей системе','galina.kvasova14@gmail.com','dsnou2806@gmail.com');
}


updateAuction = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    PropertyInfo.findOne({ _id: req.params.id }, (err, auction) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'PropertyInfo not found!',
            })
        }
        auction.name = body.name
        auction.time = body.time
        auction.rating = body.rating
        auction
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: auction._id,
                    message: 'auction updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'auction not updated!',
                })
            })
    })
}

deleteAuction = async (req, res) => {
    await PropertyInfo.findOneAndDelete({ _id: req.params.id }, (err, auction) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!auction) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: auction })
    }).catch(err => console.log(err))
}

getAuctionById = async (req, res) => {
    await PropertyInfo.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getAuctionList = async (req, res) => {
    await PropertyInfo.find({}, (err, auctions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!auctions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: auctions })
    }).catch(err => console.log(err))
}

    createPhoto = async (req, res) => {
        try {
            const photo = new Photo(req.body);
            const file = req.file.buffer;
            photo.photo = file;
            await photo.save();
            res.status(201).send({ _id: photo._id });
        } catch (error) {
            res.status(500).send({
                upload_error: 'Error while uploading file...Try again later.'
            });
        }
    }

    getPhoto = async (req, res) => {
        try {
            const result = await Photo.findById(req.params.id);
            res.set('Content-Type', 'image/jpeg');
            res.send(result.photo);
        } catch (error) {
            res.status(400).send({ get_error: 'Error while getting photo.' });
        }
    }

getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({});
        res.send(photos);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting list of photos.' });
    }
};

createBid = async (req, res) => {
    try {
        const auctionService = new AuctionService();

        auctionService.placeBid(req.body);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while create bid' });
    }
};

getHighestBid = async (req, res) => {
    try {
        const auctionService = new AuctionService();
        const bid = await auctionService.getHighestBid();
        res.send(bid);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting highest bid' });
    }
};


module.exports = {
    createAuction,
    updateAuction,
    deleteAuction,
    getAuctionList,
    getAuctionById,
    createBid,
    getHighestBid,
    createPhoto,
    getPhoto,
    getPhotos
}
