import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';
import Button from '../components/Button';

// If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.
// Here we are deconstructing req and res from getServerSideProps context parameter (https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#context-parameter)
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // While useSession() is only to be used on client side, getSession() can be used on server side

  const session = await getSession({ req }) as { user: { email: string } | null };

  if (session.user) {
    const drafts = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
        published: false,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    const parsedDrafts = drafts.map((p) => {
      const { createdAt, updatedAt, ...otherProps } = p;

      return {
        ...otherProps,
        createdAt: JSON.parse(JSON.stringify(createdAt)),
        updatedAt: JSON.parse(JSON.stringify(updatedAt))
      };
    });

    return {
      props: { parsedDrafts },
    };
  } else {

    res.statusCode = 403;
    return { props: { dashboard: [] } };

  }

};


type Props = {
  parsedDrafts: PostProps[];
};

const Dashboard: React.FC<Props> = ({ parsedDrafts }) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My dashboard</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My dashboard</h1>
        <main>
          {parsedDrafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
              <Button
                url={`/api/publish/${post.id}`}
                text="Publish"
              ></Button>
              <Button
                url={`edit/${post.id}`}
                text="Edit"
              ></Button>
            </div>
          ))}
        </main>
      </div >
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout >
  );
};

export default Dashboard;