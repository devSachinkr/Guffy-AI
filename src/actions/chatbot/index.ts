"use server";

import { prisma } from "@/lib/prisma";
import { extractEmailsFromString, extractURLfromString } from "@/lib/utils";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { realTimeChat } from "../conversation";
import { sendMail } from "../mailer";
import { openai } from "@/lib/openai";

export const getChatBot = async (id: string) => {
  console.log(id)
  const user = currentUser();
  if (!user) {
    return;
  }
  try {
    const res = await prisma.domain.findUnique({
      where: { id },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            welcomeMessage: true,
            icon: true,
            background: true,
            textColor: true,
            id: true,
            helpdesk: true,
          },
        },
      },
    });
    if (!res) {
      return {
        status: 404,
        message: "Domain not found",
      };
    }

    return {
      status: 200,
      chatbot: res,
    };
  } catch (error) {
    // console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      id: id,
    };
  }
};

export const storeConversations = async (
  id: string,
  message: string,
  role: Role | null
) => {
  await prisma.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  });
};
let customerEmail: string | undefined;
export const aiChatbotAssistant = async (
  id: string,
  chat: {
    role: Role | null;
    content: string;
  }[],
  author: "USER",
  message: string
) => {
  try {
    const chatBotDomain = await prisma.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    });
    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message);
      if (extractedEmail) {
        customerEmail = extractedEmail[0];
      }

      if (customerEmail) {
        const checkCustomer = await prisma.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await prisma.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });
          if (newCustomer) {
            console.log("new customer made");
            const response = {
              role: "ASSISTANT",
              content: `Welcome aboard ${
                customerEmail.split("@")[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            };
            return { response };
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await storeConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          );

          realTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            "USER",
            author
          );

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            );

            sendMail(user.emailAddresses[0].emailAddress);

            const mailed = await prisma.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            });

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              };
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          };
        }

        await storeConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        );

        const chatCompletion = await openai.chat.completions // @ts-ignore
          .create({
            messages: [
              {
                role: "ASSISTANT",
                content: `
              You will get an array of questions that you must ask the customer. 
              
              Progress the conversation using those questions. 
              
              Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important. 
              
              Do not forget it.

              only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

              Always maintain character and stay respectfull.

              The array of questions : [${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(", ")}]

              if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

              if the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${
                  checkCustomer?.customer[0].id
                }

              if the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${
                  checkCustomer?.customer[0].id
                }
          `,
              },
              ...chat,
              {
                role: "USER",
                content: message,
              },
            ],
            model: "gpt-3.5-turbo",
          });

        if (chatCompletion.choices[0].message.content?.includes("(realtime)")) {
          const realtime = await prisma.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          });

          if (realtime) {
            const response = {
              role: "ASSISTANT",
              content: chatCompletion.choices[0].message.content.replace(
                "(realtime)",
                ""
              ),
            };

            await storeConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              "ASSISTANT"
            );

            return { response };
          }
        }
        if (chat[chat.length - 1].content.includes("(complete)")) {
          const firstUnansweredQuestion =
            await prisma.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: "asc",
              },
            });
          if (firstUnansweredQuestion) {
            await prisma.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            });
          }
        }

        if (chatCompletion) {
          const generatedLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          );

          if (generatedLink) {
            const link = generatedLink[0];
            const response = {
              role: "ASSISTANT",
              content: `Great! you can follow the link to proceed`,
              link: link.slice(0, -1),
            };

            await storeConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              "ASSISTANT"
            );

            return { response };
          }

          const response = {
            role: "ASSISTANT",
            content: chatCompletion.choices[0].message.content,
          };

          await storeConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            "ASSISTANT"
          );

          return { response };
        }
      }
      console.log("No customer");
      const chatCompletion = await openai.chat.completions
        // @ts-ignore
        .create({
          messages: [
            {
              role: "ASSISTANT",
              content: `
            You are a highly knowledgeable and experienced sales representative for a ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
            Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

            Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

          `,
            },
            ...chat,
            {
              role: "USER",
              content: message,
            },
          ],
          model: "gpt-3.5-turbo",
        });

      if (chatCompletion) {
        const response = {
          role: "ASSISTANT",
          content: chatCompletion.choices[0].message.content,
        };

        return { response };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
