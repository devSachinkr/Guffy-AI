"use client";
import FormGenerator from "@/components/forms/form-generator/sign-up-details";
import { Loader } from "@/components/global/loader";
import Section from "@/components/settings/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useFilterQuestion } from "@/hooks/settings/filter-question";
import React from "react";
import Accordion from "./Accordion";
import GradientText from "@/components/global/gradient-text";

type Props = {
  id: string;
};

const FilterQuestion = ({ id }: Props) => {
  const { errors, filterHandler, isQuestion, loading, register } =
    useFilterQuestion(id);
  return (
    <Card className="w-full gird grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form onSubmit={filterHandler} className="flex flex-col gap-3 mt-10">
          <div className="flex flex-col gap-3">
            <Section
              label="Question."
              msg="Add a question that you want your chatbot to ask."
              descClass="text-sm text-muted-foreground"
            />
            <FormGenerator
              inputType="input"
              register={register}
              name="question"
              form="filter-questions-form"
              errors={errors}
              placeholder="What is your question?"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Answer to question. ( Optional )"
              msg="The answer for the question above"
            />
            <FormGenerator
              inputType="textarea"
              register={register}
              name="answer"
              form="filter-questions-form"
              errors={errors}
              placeholder="answer"
              lines={5}
              type="text"
            />
          </div>
          <Loader loading={loading}>
            <Button
              type="submit"
              className="bg-stone-300 hover:bg-stone-400 transition duration-150 ease-in-out text-black font-semibold"
            >
              Create
            </Button>
          </Loader>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestion.length ? (
            isQuestion.map((question, index) => (
              <Accordion
                key={index}
                trigger={question.question}
                content={question.answer ?? ""}
              />
            ))
          ) : (
            <CardDescription className="text-[2rem]">
              No Question
            </CardDescription>
          )}
        </Loader>   
      </CardContent>
    </Card>
  );
};

export default FilterQuestion;
