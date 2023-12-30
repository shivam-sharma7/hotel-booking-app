import {Request, Response} from 'express';


export const notFound = ((req:Request, res:Response, next:any) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

export const handleJson = ((req:Request, res:Response, next:any) => {
    if (req.body) {
      try {
        JSON.parse(req.body);
      } catch (e) {
        return res.status(400).send('Invalid JSON');
      }
    }
    next();
  });

// export const errorHandler = ((err:any, req:Request, res:Response, next:any) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode);
//     res.json({
//         message:err.message,
//         stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
//     });
// });