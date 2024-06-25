import { BotIcon } from "@/icons/bot-icon";
import { Battery, Circle, Square, Triangle, Wifi } from "lucide-react";
import React from "react";

type Props = {};

const Phone = (props: Props) => {
  return (
    <div className="w-[430px] md:w-[530px] h-[769px]  rounded-[60px] bg-stone-800 p-2 flex flex-col justify-center items-center mt-3 md:mt-0">
      <div className=" w-[400px] md:w-[500px] h-[750px] rounded-[60px] p-2 flex flex-col items-center z-[10] bg-black">
        <div className=" h-fit mt-2 w-[90%] flex justify-between items-center">
          <div className="w-[20px] rounded-full h-[20px] glassMorPhism "></div>
          <div className="w-[200px] h-[10px] glassMorPhism"></div>
          <div className="w-[50px] flex gap-x-2 items-center justify-center">
            <Wifi size={25} />
            <Battery size={25} />
          </div>
        </div>
        <div className="w-[90%] mt-6 h-[90%] rounded-md  ">
          <div className="relative w-full mt-2 h-[150px]">
            <div
              className="w-[50%] mt-5 h-[50px]
         rounded-full bg-white text-black font-semibold flex items-center justify-center absolute text-center "
            >
              Hi There! I Have a doubt ?
            </div>
            <div
              className="w-[50%]  h-[50px]
         rounded-full bg-lime-500 flex items-center justify-center self-end absolute right-0 mt-10 bottom-0 text-white font-semibold text-center p-2"
            >
              Hi! What can I help you with today?
            </div>
          </div>
          <div className="relative w-full mt-2 h-[150px]">
            <div
              className="w-[50%] mt-5 h-[50px]
         rounded-full bg-white text-black font-semibold flex items-center justify-center absolute text-center p-2 "
            >
              What is the name of this app?
            </div>
            <div
              className="w-[50%]  h-[50px]
         rounded-full bg-lime-500 flex items-center justify-center self-end absolute right-0 mt-10 bottom-0 text-white font-semibold text-center p-2"
            >
              The name of this app is Guffy.
            </div>
          </div>
          <div className="relative w-full mt-2 h-[150px]">
            <div
              className="w-[50%] mt-5 h-[50px]
         rounded-full bg-white text-black font-semibold flex items-center justify-center absolute "
            >
              Who are you?
            </div>
            <div
              className="w-[50%]  h-[50px]
         rounded-full bg-lime-500 flex items-center justify-center self-end absolute right-0 mt-10 bottom-0 text-center p-2 text-white font-semibold"
            >
              I am an AI Chatbot. My name is Guffy
            </div>
          </div>
          <div className="flex justify-end pr-4">
            <div className=" mt-5 w-[100px] h-[100px] rounded-full bg-lime-400 flex items-center justify-center  ">
              <BotIcon />
            </div>
          </div>
          <div className="mt-7 flex justify-evenly">
            <Square />
            <Circle />
            <Triangle className="rotate-[270deg]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
