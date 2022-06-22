const bcrypt = require('bcryptjs');

module.exports = {
    hashing: (password, callback) => {
        bcrypt.genSalt(4, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                callback(hash)
            });
        });
    },
}