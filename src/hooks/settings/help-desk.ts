"use client";

import { addQuestion, getHelpDeskQuestion } from "@/actions/settings";
import { ToastNotify } from "@/components/global/ToastNotify";
import {
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schema/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useHelpDesk = (id: string) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
    mode: "onChange",
    defaultValues: {
      answer: "",
      question: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestion, setIsQuestion] = useState<
    { id: string; question: string; answer: string }[]
  >([]);

  const questionHandler = handleSubmit(async (data: HelpDeskQuestionsProps) => {
    setLoading(true);
    const question = await addQuestion(id, data.question, data.answer);
    if (question.status === 200 && question.questions) {
      setLoading(false);
      setIsQuestion(question.questions);
      ToastNotify({
        title: `${question.status === 200 ? "Success" : "Oopse!"}`,
        desc: `${question.message}`,
      });
      reset();
      router.refresh();
    }
  });
  const getQuestions = async () => {
    setLoading(true);
    const res = await getHelpDeskQuestion(id);
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
    errors ,
    questionHandler,
    isQuestion,
    loading,
  };
};
