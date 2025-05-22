import React, {Children, createContext, useContext, useState} from "react";

type Post = {
    uri : string 
    type : 'image' | 'video',
    caption: string;
}

type PostContextType = {
    posts: Post[]
    addPost: (post : Post) => void
}

const PostContext = createContext<PostContextType>({
    posts: [],
    addPost: () => {}
})

export const PostProvider = ({children} : {children : React.ReactNode}) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (post : Post) => {
        setPosts((prev) => [post, ...prev])
    }

    return(
        <PostContext.Provider value = {{posts, addPost}}>
            {children}
        </PostContext.Provider>
    )
}

export const usePost = () => useContext(PostContext)