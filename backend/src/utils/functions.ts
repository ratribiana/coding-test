import { NextFunction, Request, Response } from 'express';
import base64 from 'base64-min';
import { AsyncHandler } from '@interfaces/asyncHandler.interface';
import { SECRET_KEY } from '@config';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  return value == null || value === '' || (typeof value === 'object' && !Object.keys(value).length);
};

/**
 * @method asyncHandler
 * @param {AsyncHandler} handler - Asynchronous request handler function
 * @returns {Function} Express middleware function with error handling
 * @description Wraps an asynchronous request handler with error handling middleware.
 * @typedef {Function} AsyncHandler - Asynchronous request handler function
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {Error} Propagates any errors thrown by the asynchronous handler to the Express error handling middleware
 */
export const asyncHandler =
  (handler: AsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export const toBase64 = (str: string): string => base64.encodeWithKey(str, SECRET_KEY);

export const base64toString = (str: string): string => base64.decodeWithKey(str, SECRET_KEY);
