"use client";
import { useConversations } from "@/hooks/conversations/conversations";
import React from "react";
import TabsMenu from "../dashboard/settings/tabs-menu";
import { TABS_MENU } from "@/constants/menu-items";
import ConversationSearch from "./conversation-search";
import { TabsContent } from "../ui/tabs";
import { CardDescription } from "../ui/card";
import ChatCard from "./chat-card";
import { Loader } from "../global/loader";
import { Separator } from "../ui/separator";

type Props = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | undefined;
};

const ConversationMenu = ({ domains }: Props) => {
  const { chatRooms, getActiveChatMessages, loading, register } =
    useConversations();
  return (
    <div className="py-3 px-0">
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="unread">
          <Separator orientation="horizontal" className="mt-5" />
          <ConversationSearch domains={domains} register={register} />
          <div className="flex flex-col">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    key={room.chatRoom[0].id}
                    seen={room.chatRoom[0].message[0].seen}
                    id={room.chatRoom[0].id}
                    onChat={() => getActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0].createdAt}
                    title={room.email}
                    desc={room.chatRoom[0].message[0].message}
                    loading={loading}
                  />
                ))
              ) : (
                <CardDescription>
                  No! ( chats for this domain ).
                </CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <Separator orientation="horizontal" className="mt-5" />
          <div>All</div>
        </TabsContent>
        <TabsContent value="expired">
          <Separator orientation="horizontal" className="mt-5" />
          <div>expired</div>
        </TabsContent>
        <TabsContent value="starred">
          <Separator orientation="horizontal" className="mt-5" />
          <div>starred</div>
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default ConversationMenu;
