import { Response, Request } from 'express';

export default function handler(req: Request, res: Response) {
    if (req.method === 'GET') {
        const bodys = {
            message: "Hello There",
            body: {
                testing: "Tesint method GET",
            }
        }
        res.status(200).json(bodys);
    } 
    else if(req.method === 'POST')
    {
        console.log("POST Success");
    }
    else
    {

    }
  }