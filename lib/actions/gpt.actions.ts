"use server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`
});

const assistant_id = "asst_91gia7RyyOvL3N9jtS9woZSI";


export async function sendMes(mess: string) {
  // Call GPT-3.5 API to generate a respons
  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "user", "content": `Nếu câu hỏi là tiếng Việt, bắt đầu câu trả lời với cụm từ "Tôi không biết nữa". Nếu câu hỏi là tiếng Anh, bắt đầu câu trả lời bằng "I don't know". Thể hiện sự không chắc chắn trong câu trả lời. Sau đó, cung cấp thêm thông tin phản biện cho câu hỏi và cuối cùng đưa ra câu trả lời hợp lý nhất. Câu hỏi là:  ${mess}. Hãy trả lời bằng tiếng Việt` },
    ],
    model: "gpt-3.5-turbo",
  });

 
  return { data: JSON.stringify(completion.choices[0].message.content) }
}

export const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread;
};

export const createMessage = async ({ threadId, content }:any) => { 
  const messages = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });
  return messages;
}

export const runAssistant = async ({  threadId, instructions }:any) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistant_id,
    instructions: instructions,
  });
  return run;
};

export const runCheck = async ({ threadId, runId }:any) => {
 const check = await openai.beta.threads.runs.retrieve(threadId, runId)


  return check;}
;

export const getMessages = async (threadId:any) => {
  const messages = await openai.beta.threads.messages.list(threadId, {
    order: "asc",
    limit: 100,
  });
  return messages;
};

export async function sendMess (mess:string){
  try{
    const thread = await createThread()
    const thread_id = thread.id
    const message = await createMessage({content:mess,threadId:thread.id})
    const run  = await runAssistant({threadId:thread.id,instructions:""})
   const check = await checkRunStatus({threadId:thread_id,runId:run.id})
    if (check.status ==="completed")
    {  const messages = await getMessages(thread.id)
      const result = messages.data.map((message) => message.content[0])
      const results = (JSON.parse(JSON.stringify(result)))
      console.log(results)
      return results
    }
    console.log("di ia di")
  }
catch(e) { return e}
 }

export async function checkRunStatus({threadId, runId}:any): Promise<any> {
  const initialDelay = 500; // Initial delay before starting to check status
  const checkInterval = 500; // Interval at which to check the status
 
  // Wait for the initial delay
  await new Promise((resolve) => setTimeout(resolve, initialDelay));
 
  let status = await runCheck({ threadId, runId });
 
  while (status.status !== "completed") {
     // If status is not "completed", wait for the checkInterval and then check again
     await new Promise((resolve) => setTimeout(resolve, checkInterval));
      status = await runCheck({ threadId, runId });
  }
 
  return status;
 }