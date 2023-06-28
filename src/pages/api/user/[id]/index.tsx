import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  const { id } = req.query;  
  if(req.method === 'GET')
  {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    
    res.status(200).json(user);
  } 
  else if(req.method === 'POST')
  {
    console.log(req.query.id);
    console.log("POST Success");
    res.status(200).send("Successfully POST id: "+req.query.id);
  }
  else if(req.method === 'PATCH')
  {
    const newPassword = req.body.password;
    const newUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: newPassword,
      }
    });
    res.status(200).json(newPassword);
  }
  else if(req.method === 'DELETE')
  {
    const u = await prisma.user.delete({
      where: {
        id: parseInt(id),
      }
    })
    res.status(200).send(`DELETE User with ${id} Success`);
  }
}