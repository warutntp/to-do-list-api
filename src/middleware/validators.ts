import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateTodo = [
  body("title").notEmpty().withMessage("Title is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
