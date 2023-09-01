import prisma from "@/lib/prisma";

export default async function getPostById(id: string | number) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (post) {
    const { createdAt, updatedAt, ...otherProps } = post;

    const parsedPost = {
      ...otherProps,
      createdAt: JSON.parse(JSON.stringify(createdAt)),
      updatedAt: JSON.parse(JSON.stringify(updatedAt)),
    };

    return parsedPost;
  } else {
    return null;
  }
}

