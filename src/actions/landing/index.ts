"use server";
import axios from "axios";
type posts =
  | {
      id: string;
      title: string;
      image: string;
      content: string;
      createdAt: Date;
    }[]
  | undefined;
export const getBlogPosts = async () => {
  try {
    const Post: posts = [];
    const res = await axios.get(process.env.CLOUDWAYS_POSTS_URL!);
    let i = 0;
    // console.log(res.data)
    for(i=0;i<res?.data?.length;i++){
      Post.push({
        id: res?.data[i]?.id,
        title: res?.data[i]?.title?.rendered,
        image: res?.data[i]?.jetpack_featured_media_url,
        content: res?.data[i]?.content?.rendered,
        createdAt: new Date(res?.data[i]?.date),
      });
    }
      
    console.log("post",Post)
    
    if (Post.length < 0) {
      return null;
    }
    return Post;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogPostById = async (blogId: string) => {
  try {
    if (!blogId) throw new Error("Blog id is required");
    const res = await axios.get(`${process.env.CLOUDWAYS_POSTS_URL!}/${blogId}`);
    if (res) {
      const author = axios.get(
        `${process.env.CLOUDWAYS_USERS_URL!}${res.data.author}`
      );
      if (!author) throw new Error("Author not found");
      return {
        id: res.data?.id,
        title: res.data.title?.rendered,
        content: res.data?.content?.rendered,
        createdAt: new Date(res?.data?.date),
        //@ts-ignore
        author: author?.data?.name,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
