import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message || "An error occurred");
    res.status(500).json({ error: err.message || "Something went wrong" });
  };