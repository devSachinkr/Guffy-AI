import Openai from "openai";

export const openai = new Openai({
  apiKey: process.env.OPEN_AI_KEY!,
});
