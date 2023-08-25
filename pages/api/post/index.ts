import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

type CreatePostData = {
  title: string;
  description: string;
  body: string;
  author?: {
    connect: {
      email: string;
    };
  } | null;
};


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, body, description } = req.body;

  const session = await getSession({ req });

  const postData: CreatePostData = {
    title: title,
    description: description,
    body: body,
  };

  if (session?.user) {
    postData.author = { connect: { email: session.user.email as string } };
  } else {
    postData.author = null;
  }

  const result = await prisma.post.create({
    data: postData,
  });

  res.json(result);
}