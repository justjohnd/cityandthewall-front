import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = Number(req.query.id);
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}