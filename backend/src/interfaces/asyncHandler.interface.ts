import { NextFunction, Request, Response } from 'express';

export interface AsyncHandler<T = any> {
  (req: Request, res: Response, next: NextFunction): Promise<T>;
}
