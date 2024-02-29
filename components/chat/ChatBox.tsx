"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@nextui-org/react";
import { useMessStore } from "./chatStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {  useSearchParams  } from "next/navigation";
import { Chats } from "./History";
import { useNoInitialEffect } from "@/lib/effect";

type Mes = {
  _id: number;
  type: string;
  mess: string;
};
const replaceNewlinesWithBreaks = (text: string | null) => {
  return text?.split("\\n").map((line, i) => (
    <span key={i}>
      {line}
      {i !== text.length - 1 && <br />}
    </span>
  ));
};

const ChatBox = ({ user_image, chats }: { user_image: string,chats:Chats}) => {
  const { messList,setMessList } = useMessStore();  
  const chatID = useSearchParams().get("id")
  useNoInitialEffect(() => {
    if (chatID && typeof chats !== "string" && Array.isArray(chats?.chat)) {
       chats.chat.map((chat) => {
         if (JSON.parse(chat.sessionId) === chatID) {
           setMessList({
             _id: chat.id,
             role: chat.role,
             content: chat.message,
           });
         }
       });
    }
   }, [chatID]);
  // Function to scroll to the bottom of the chat box
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messList]);
  const idkava =
    "https://res.cloudinary.com/dlepfxwjj/image/upload/v1708783540/ava2d_h0vix0.png";

  return (
    <div>
      <div className=" max-w-fit flex flex-col h-full  ">
        <div className="relative flex-grow overflow-y-auto max-h-full"> 
        <div>    
          {messList.map((mess) => (
            <div
              key={mess._id + "_user"}
              className={cn(
                `${
                  mess.role === "user"
                    ? "flex flex-row-reverse "
                    : mess.role === "chatIDK"
                    ? "flex flex-row "
                    : ""
                }, mx-2 gap-2 items-center`
              )}
            >
              <Avatar>
                <AvatarImage
                  src={mess.role === "chatIDK" ? idkava : user_image}
                  alt="@shadcn"
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
              <Card
                key={mess._id + "chat"}
                className={cn(
                  `${
                    mess.role === "user"
                      ? "self-start border-blue-500 "
                      : mess.role === "chatIDK"
                      ? "self-end  border-green-500 "
                      : ""
                  }`,
                  "p-3 m-3 min-w-6/12 w-8/12 border-solid border-2"
                )}
              >
                {/* {replaceNewlinesWithBreaks(mess.content)} */}
                { replaceNewlinesWithBreaks(JSON.parse(JSON.stringify(mess.content)))}
              </Card>
            </div>
          ))}
          </div>     
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
