"use client";
import FormGenerator from "@/components/forms/form-generator/sign-up-details";
import GradientText from "@/components/global/gradient-text";
import { Loader } from "@/components/global/loader";
import Section from "@/components/settings/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useHelpDesk } from "@/hooks/settings/help-desk";
import React from "react";
import Accordion from "./Accordion";

type Props = {
  id: string;
};

const HelpDesk = ({ id }: Props) => {
  const { isQuestion, errors, loading, register, questionHandler } =
    useHelpDesk(id);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form className="flex flex-col gap-6 mt-10" onSubmit={questionHandler}>
          <div className="flex flex-col gap-3">
            <Section
              label="Questions."
              msg="Add a question that you believe is frequently asked questions."
              descClass="text-muted-foreground"
            />
            <FormGenerator
              inputType="input"
              name="question"
              register={register}
              errors={errors}
              type="text"
              form="help-desk-form"
              placeholder="Question"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Answers."
              msg="Add an answer that you believe is frequently asked questions."
              descClass="text-muted-foreground"
            />
            <FormGenerator
              inputType="textarea"
              name="answer"
              lines={5}
              register={register}
              errors={errors}
              type="text"
              form="help-desk-form"
              placeholder="Answer"
            />
          </div>
          <Loader loading={loading}>
            <Button
              type="submit"
              className="bg-stone-300 hover:bg-stone-300 hover:opacity-70 transition duration-150 ease-in-out text-black font-semibold"
            >
              Create
            </Button>
          </Loader>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestion.length ? (
            isQuestion.map((question) => (
              <Accordion
                key={question.id}
                trigger={question.question}
                content={question.answer}
              />
            ))
          ) : (
            <CardDescription>
              <GradientText>
                No Questions ! (Add a question to get started)
              </GradientText>
            </CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  );
};

export default HelpDesk;
