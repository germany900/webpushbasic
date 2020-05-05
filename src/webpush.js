const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto: termineitor009@gmail.com',
    process.env.Publickey,
    process.env.Privatekey
);


module.exports = webpush;


