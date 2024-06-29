import nodemailer from "nodemailer";
export const sendMail = (email: string) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL!,
      pass: process.env.NODE_MAILER_PASSWORD!,
    },
  });

  const payload = {
    to: email,
    subject: "Realtime support | Guffy AI",
    text: "One of your customers wants to get in touch. just switched to realtime mode",
  };

  transport.sendMail(payload, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
