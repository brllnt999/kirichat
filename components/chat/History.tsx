"use client";
import {

  DropdownMenuItem,

} from "@/components/ui/dropdown-menu";
import { Chat } from "@/lib/db/schema/chats";
import { TruncatedString, calculateDaysDifference } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {useMessStore} from "@/components/chat/chatStore"
export type Chats =
  | string
  | {
      chat?: undefined;
    }
  | {
      chat: Chat[];
    };


export function History({ chats }: { chats: Chats }) {
    const router = useRouter()   
    const {clearMessList} = useMessStore()
  return (
    <>
      {typeof chats !== "string" &&
        Array.isArray(chats?.chat) &&
        Array.from(new Set(chats.chat.map((chat) => chat.sessionId)))
          .reverse()
          .map((sessionId) => {
            // Find the first chat object with the current sessionId
            const chat = chats.chat.find(
              (chat) => chat.sessionId === sessionId
            );
            return chat ? (
              <DropdownMenuItem
                key={chat.id}
                className="flex flex-col items-start gap-1"
                onSelect={()=>  
                  {clearMessList();    
                  router.replace(`/chat?id=${chat.sessionId.replace(/^"|"$/g, '')}`)}
                }
              >
                <p className="self-start font-light text-sm">
                  {calculateDaysDifference(chat.createdAt) > 0
                    ? `${calculateDaysDifference(chat.createdAt)} days ago`
                    : "Today"}
                </p>
                <div className="flex items-start justify-start">
                  {TruncatedString({ text: chat.message.trim(), limit: 60 })}
                </div>
              </DropdownMenuItem>
            ) : null;
          })}
    </>
  );
}
