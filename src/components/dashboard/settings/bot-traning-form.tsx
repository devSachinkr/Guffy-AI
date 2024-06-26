import GradientText from "@/components/global/gradient-text";
import { TabsContent } from "@/components/ui/tabs";
import { HELP_DESK_TABS_MENU } from "@/constants/menu-items";
import React from "react";
import TabsMenu from "./tabs-menu";
import HelpDesk from "./help-desk";
import FilterQuestion from "./filter-question";

type Props = {
  id: string;
};

const BotTraningForm = ({ id }: Props) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-2 items-start">
      <GradientText classes="font-bold text-3xl">Bot Training</GradientText>
      <p className="text-sm font-light text-muted-foreground">
        Train your bot to get more responses. Set FAQ and other settings.
        <br />
        Create questions and get responses.
      </p>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
         <TabsContent
           value="help desk"
           className="w-full"
         >
        <HelpDesk id={id}/>
         </TabsContent>
         <TabsContent
           value="questions"
           className="w-full"
         >
            <FilterQuestion id={id}/>
         </TabsContent>

      </TabsMenu>
    </div>
  );
};

export default BotTraningForm;
