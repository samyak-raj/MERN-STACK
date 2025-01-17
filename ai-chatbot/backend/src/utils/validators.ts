import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      //if there is no errors then we break the loop
      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
];
export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];
