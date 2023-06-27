import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
{
	if (req.method === 'GET')
	{
		const allUser = await prisma.user.findMany();
		res.status(200).json(allUser);
	}
	else if(req.method === 'POST')
	{
		const newUser = await prisma.user.create({ data: req.body });
		console.log(newUser);
		res.status(200).json(newUser);
	}
	else
	{

	}
}

export default handler;