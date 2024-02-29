import ChatBox from "@/components/chat/ChatBox";
import ChatHero from "@/components/chat/ChatHero";
import InputField from "@/components/chat/InputField";
import { getUserAuth } from "@/lib/auth/utils";
import { ScrollShadow } from "@nextui-org/react";

import React from "react";
import { getChatMessageByUser } from "@/lib/actions/chats";
import UserButton from "@/components/chat/UserButton";
import { History } from "@/components/chat/History";

const ChatPage = async ({params}:{params:{id:string}}) => {
  const { session } = await getUserAuth();
  const user_image = session?.user.picture as string;
  const user_id = session?.user.id as string;
  const chats = await getChatMessageByUser(user_id);

  return (
    <div className="flex flex-col md:flex-row h-[90vh] md:h-full w-full items-center justify-center">
      <div
        className="basis-1/3 flex justify-between md:flex-grow md:flex-col items-center md:mx-auto pt-4 md:pt-0 md:justify-center
       w-10/12 md:w-full h-[10vh] md:h-[100vh] "
      >
        <ChatHero />

      </div>
      <div className="relative h-[85vh] pt-8 md:pt-0 md:h-full basis-2/3 flex flex-col items-center mx-auto gap-8 w-full">
        <div className="h-[70vh] w-10/12 overflow-auto md:mx-20 flex flex-col-reverse bottom-0  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] rounded-lg ">
          <ScrollShadow hideScrollBar>
            <ChatBox user_image={user_image} chats={chats}  />
          </ScrollShadow>
        </div>
        <div className=" flex flex-grow flex-row items-center gap-3 justify-center static w-10/12 bottom-[10px] h-[15vh]">
        <UserButton>
          <History chats={chats} />
        </UserButton>
          <InputField user_image={user_image} user_id={user_id} />
        </div>
      </div>
      {/* <div className="h-[10vh] md:h-[0vh] md:hidden"> */}


    </div>
  );
};

export default ChatPage;
