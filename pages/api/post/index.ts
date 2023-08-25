import prisma from '../../../lib/prisma';

type CreatePostRequest = {
  title: string;
  body: string;
  description: string;
};

interface Category {
  id: string;
  name: string;
}

type CreatePostResponse = {
  id: number;
  title: string;
  description: string;
  body: string;
  author: {
    name: string;
    email: string;
  } | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
};


export default async function handle(req: CreatePostRequest, res: CreatePostResponse) {
  const { title, body, description, session } = req.body;

  const result = await prisma.post.create({
    data: {
      title: title,
      description: description,
      body: body,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}