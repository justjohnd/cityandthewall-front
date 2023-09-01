import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { PostProps } from '@/components/Post';

const FormPost: React.FC<PostProps> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [description, setDescription] = useState(props.description);

  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    setTimeout(() => router.push('/'), 3000);
    return <p>Please log in first.</p>;
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    let published: boolean = false;
    if (target.name as string === "published") {
      published = true;
    }
    try {
      const reqBody = { title, description, body, published, session };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      await router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            value={description}
          />
          <textarea
            cols={50}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            rows={8}
            value={body}
          />
          <input disabled={!body || !title} type="submit" onClick={onSubmit} value="Save Draft" name="draft" />
          <input disabled={!body || !title} type="submit" onClick={onSubmit} value="Published" name="published" />
          <a className="back" href="#" onClick={() => router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );



};

export default FormPost;