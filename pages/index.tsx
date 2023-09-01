import { GetStaticProps } from "next" // static site gen
import Image from 'next/image'
import prisma from '../lib/prisma';
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { categories: true }
  });

  const posts = feed.map((p) => {
    const { createdAt, updatedAt, ...otherProps } = p;

    return {
      ...otherProps,
      createdAt: JSON.parse(JSON.stringify(createdAt)),
      updatedAt: JSON.parse(JSON.stringify(updatedAt))
    };
  });

  return {
    props:
      { posts },
    revalidate: 10,
  };
};

// props is an array of ojects. PostProps is an interface for the object
// If you assign posts: PostProps in the type below, Typescript will correctly infer that the type relates to the object properties
// This is not the case when you declare the Home FC. You cannot pass PostProps directly to posts
type Props = {
  posts: PostProps[]
}


const Home: React.FC<Props> = ({ posts }) => {
  // props is destructured so that posts = an array of objects

  console.log(posts);

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative flex place-items-center">
          <h1>Recent Posts</h1>
          <div className="flex">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </div>
      </main>

    </Layout>
  )
}

export default Home;