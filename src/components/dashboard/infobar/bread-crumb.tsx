"use client";
import React from "react";

type Props = {};

const Breadcrumb = (props: Props) => {
  // WIP: set up use side bar hook
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">Title</h2>
        
      </div>
      <p className="text-gray-500 text-sm">
        {/* {page == "settings"
          ? "Oversee and customize your account settings, preferences, and integrations."
          : page == "dashboard"
          ? "A comprehensive overview of your metrics, usage patterns, customer insights, and more."
          : page == "appointements"
          ? "Review your appointments and seamlessly schedule new ones"
          : page == "email-marketing"
          ? "send emails to customers"
          : page == "intergations"
          ? "Integrate third-party applications with Guffy AI effortlessly."
          : "Adjust domains and various settings, customize chatbot options, input sales queries, and train your chatbot to perform tasks according to your preferences."}  */}
          Adjust domains and various settings, customize chatbot options, input sales queries, and train your chatbot to perform tasks according to your preferences.
      </p>
    </div>
  );
};

export default Breadcrumb;
