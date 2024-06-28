import cluster from "cluster";
import Pusher from "pusher-js";
import PusherServer from "pusher";
export const pusherClient = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "mt1",
  }
);

export const pusherServer=new PusherServer({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret:process.env.NEXT_PUBLIC_PUSHER_APP_SECRET!,
  cluster:'mt1',
  useTLS:true
})