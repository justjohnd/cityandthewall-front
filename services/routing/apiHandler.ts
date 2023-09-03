import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse, action: string) {
  const { title, description, body, published, session } = req.body;

  if (!session) {
    return res.status(404).json({ error: 'User must be logged in to access routes.' });
  }

  const postId = Number(req.query.id);
  let post;

  switch (action) {
    case "publish":
      post = await prisma.post.update({
        where: { id: postId },
        data: { published: true },
      });
      break;
    case "edit":
      post = await prisma.post.update({
        where: { id: postId },
        data: {
          title: title,
          description: description,
          body: body,
          authorId: session.user.id,
          published: published,
        },
      });
      break;
    default:
      post = await prisma.post.findUnique({
        where: { id: postId },
      });
      console.log("You must pass an argument to the handle function. No changes to the database have been made.");
  }


  res.json(post);
}

