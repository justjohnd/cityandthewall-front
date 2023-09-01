import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// PUT /api/edit/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = Number(req.query.id);
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });

  res.json(post);
}