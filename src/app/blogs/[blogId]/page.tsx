"use client";
import { getBlogPostById } from "@/actions/landing";
import { CardDescription } from "@/components/ui/card";
import { cn, getMonthName } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Spinner } from "@/components/global/spinner";
import { Moon, Sun } from "lucide-react";
type Props = {
  params: {
    blogId: string;
  };
};

type posts = {
  createdAt: Date;
  title: string;
  content: any;
};

const BLogPage = ({ params: { blogId } }: Props) => {
  const [post, setPost] = useState<posts>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const call = async () => {
      setLoading(true);
      const post = await getBlogPostById(blogId);
      if (post) setPost(post);
      setLoading(false);
    };
    setLoading(false);
    call();
  }, [blogId]);
  const [darkmode, setDarkmode] = useState(false);
  return (
    <div
      className={cn(
        `container flex justify-center py-10 ${loading && 'h-[100vh]'}`,
        darkmode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="lg:w-6/12 flex flex-col">
        <div className="self-end cursor-pointer" onClick={() => setDarkmode(!darkmode)}>
          {darkmode ? <Sun /> : <Moon />}
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <CardDescription>
              {getMonthName(post?.createdAt?.getMonth()!)}{" "}
              {post?.createdAt?.getDate()}, {post?.createdAt?.getFullYear()}
            </CardDescription>
            <h2 className="text-6xl font-bold">{post?.title}</h2>
            <div className="parsed-container flex flex-col mt-10 gap-10 text-xl">
              {parse(String(post?.content))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BLogPage;
