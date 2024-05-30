import { Response } from "express";

const errorMessages: { [key: number]: string } = {
  400: "Bad request",
  404: "Resource not found",
  405: "Method not allowed",
  500: "Internal server error",
};

export const handleError = (res: Response, statusCode: number) => {
  const message = errorMessages[statusCode] || "An error occurred";
  res.status(statusCode).json({ message });
};
