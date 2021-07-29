const Users = require("../users/users_model")
const { findBy } = require("../users/users_model")

async function checkEmailFree(req, res, next) {
    try {
        const existing = await Users
            .findBy({ email: req.body.email })
        if (!existing.length) {
            next()
        } else {
            next({ "message": "This Email is not available" })
        }
    } catch (err) {
        next(err)
    }
}

function checkPayload(req, res, next) {
    const { email, password } = req.body;
    const valid = Boolean(email && password);
    if (valid) {
        next();
    } else {
        res.status(422).json({
            message: "Email and password required",
        });
    }
}

const checkEmailExists = async (req, res, next) => {
    try {
        const [user] = await findBy({ email: req.body.email })
        if (!user) {
            next({ status: 401, message: "Invalid Credentials" })
        }
        else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkPayload,
    checkEmailExists,
    checkEmailFree,
}
