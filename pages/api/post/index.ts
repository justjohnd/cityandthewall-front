import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, body, published, session } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email }
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      description: description,
      body: body,
      authorId: user.id,
      published: published,
    },
  });
  res.json(result);
}