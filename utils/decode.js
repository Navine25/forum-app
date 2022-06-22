const jwt = require("jsonwebtoken")
const User = require("../model/User");

module.exports = {
    decode: async(token) => {
        try {
            if (token == null) return null
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const user = await User.findById(data._id)
            return user
        } catch (error) {
            console.log(error);
        }
    }
}