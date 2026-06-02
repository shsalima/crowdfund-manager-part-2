import { body, validationResult } from "express-validator";

export const validateInvestment = [
    body("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isNumeric()
        .withMessage("Amount must be a number")
        .custom((value) => value > 0)
        .withMessage("Amount must be greater than 0"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];