import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validGetTodos = [
  query("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be true or false"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateCreateTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("Title must be between 5 and 50 characters"),
  body("description")
    .optional()
    .isLength({ min: 10, max: 150 })
    .withMessage("Title must be between 10 and 150 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditTodo = [
  body("title")
    .optional()
    .isLength({ min: 5, max: 50 })
    .withMessage("Title must be between 5 and 50 characters"),
  body("description")
    .optional()
    .isLength({ min: 10, max: 150 })
    .withMessage("Title must be between 10 and 150 characters"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
