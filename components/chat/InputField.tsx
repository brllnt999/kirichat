"use client";
import { Button, Input } from "@nextui-org/react";
import React, {  useEffect, useState } from "react";
import { useMessStore } from "./chatStore";
import { v4 as uuidv4 } from "uuid";
import { createMessage, createThread, getMessages, runAssistant, runCheck, sendMes, sendMess } from "@/lib/actions/gpt.actions";
import {PaperPlaneIcon} from "@radix-ui/react-icons"
import { createChatAction } from "@/lib/actions/chats";


export default function InputField({user_image,user_id}:{user_image:string,user_id:string}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const {  setMessList } = useMessStore();
  const [sessionId,setSessionId] = useState('')

   useEffect(()=>{ 
      const session_id = JSON.stringify(uuidv4())
      setSessionId(session_id)
  },[])

    const sendMessage = async (message: string) => {
      // const {thread_id, messages} = await sendMess(message)
    // const result = await sendMess(message)
    // console.log(result[1].text.value) 
    setLoading(true)
    await createChatAction({
      userId:user_id,
      sessionId:sessionId,
      role:"user",
      message:message
    })
    setMessList({ _id: uuidv4(), role: "user", content: message });
    const data = await sendMes(message);
    data &&
      setMessList({ _id: uuidv4(), role: "chatIDK", content: `${data.data}` });
      createChatAction({
        userId:user_id,
        sessionId:sessionId,
        role: "chatIDK",
        message:`${data.data}`
      })
    // sendMess(message)
    setLoading(false);
  };
  
 

  return (
    <form className=" w-full flex flex-row justify-between bottom-[10px]">
      <Input
        name="ask"
        label="Ask chat here"
        labelPlacement="inside"
        value={value}
        onValueChange={setValue}
        endContent={
          <Button
            size="md"
            variant="shadow"
            type="submit"
            isDisabled={loading}
            onClick={(e) => {
              e.preventDefault();
              sendMessage(value);
              setValue("");
            }}
          >
            <PaperPlaneIcon />
          </Button>
        }
      />
    </form>
  );
}
