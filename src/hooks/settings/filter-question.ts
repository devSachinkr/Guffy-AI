"use client";

import { filterQuestion, getFilterQuestion } from "@/actions/settings";
import { ToastNotify } from "@/components/global/ToastNotify";
import { FilterQuestionsProps, FilterQuestionsSchema } from "@/schema/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useFilterQuestion = (id: string) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterQuestionsProps>({
    resolver: zodResolver(FilterQuestionsSchema),
    mode: "onChange",
    defaultValues: {
      question: "",
    },
  });
  const [isQuestion, setIsQuestion] = useState<
    {
      id: string;
      question: string;
      answer?: string;
    }[]
  >([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const filterHandler = handleSubmit(async (data: FilterQuestionsProps) => {
    setLoading(true);
    const filter = await filterQuestion(id, data.question);
    if (filter.status === 200 && filter.question) {
      setLoading(false);
      setIsQuestion(filter.question);
      ToastNotify({
        title: `${filter.status === 200 ? "Success" : "Oopse!"}`,
        desc: `${filter.message}`,
      });
      reset();
      router.refresh();
    }
  });

  const getQuestions = async () => {
    setLoading(true);
    const res = await getFilterQuestion(id);
    if (res.questions && res.status === 200) {
      setIsQuestion(res.questions);
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);
       
  return {
    register,
    errors,
    filterHandler,
    isQuestion,
    loading,
  };
};
