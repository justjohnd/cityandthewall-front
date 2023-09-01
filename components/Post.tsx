import React from "react";
import Router from "next/router";

interface Category {
  id: string;
  name: string;
}

export type PostProps = {
  authorId: number;
  userEmail?: string | null;
  id: number;
  title: string;
  description: string;
  body: string;
  author: {
    name: string;
    email: string;
  } | null;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  categories: Category[];
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div
      onClick={() => Router.push(`/p/${post.id}`)}
      className="max-w-sm rounded overflow-hidden shadow-lg border-solid border-indigo-600 border-2 hover:cursor-pointer" key={post.id}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">
          {post.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {
          post.categories?.map(category => {
            return (
              <span key={category.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{category.name}</span>
            );
          })
        }
      </div>
    </div>
  );
};

export default Post;
