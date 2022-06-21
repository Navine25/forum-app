const bcrypt = require('bcryptjs');

module.exports = {
    hashing: (password) => {
        bcrypt.genSalt(4, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                return hash
            });
        });
    }
}