import React, { createContext, useContext, useState } from 'react';

export type Post = {
  id: string;
  uri: string;
  type: 'image' | 'video';
  legenda: string;
  userName: string;
  userProfilePicture: string;
  userId: string;
  likes: number;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Post) => void;
};

const PostContext = createContext<PostContextType>({
  posts: [],
  addPost: () => {},
});

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
