
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5b183f0f94ea30",
        pass: "dd52ffe30ba350"
    }
});


module.exports.sendEmail = function(message) {

        transport.sendMail(message, function(err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        });
    };

module.exports.sendSuccessEmail = function(to) {

    const message = {
        from: 'galina.kvasova14@gmail.com',
        to: to,
        subject: 'Аукцион недвижимости',
        text: "Поздравляем, вы - победитель!"
    };
   sendEmail(message);
};

module.exports.sendFailEmail = function(to) {

    const message = {
        from: 'galina.kvasova14@gmail.com',
        to: to,
        subject: 'Аукцион недвижимости',
        text: "Сообщаем, что ваша заявка не выиграла в аукционе, попробуйте поучаствовать в другом!"
    };

   sendEmail(message);
};


module.exports.sendAuctionCanseled = function(to) {

    const message = {
        from: 'galina.kvasova14@gmail.com',
        to: to,
        subject: 'Аукцион недвижимости',
        text: "Сообщаем, что аукцион, в который вы подали заявку, был отменен"
    };

    sendEmail(message);
};

