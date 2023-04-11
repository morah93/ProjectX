const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth.js");
const { User } = require("../../db/models");

// validation
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Last Name is required"),
  handleValidationErrors,
];

const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);

    const body = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profilePic: user.profilePic,
        token
    };

    return res.json(body);
});

module.exports = router;