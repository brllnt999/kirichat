import { getChatMessageByUser } from '@/lib/actions/chats';
import {create} from 'zustand';

type MessStore = {
  messList: Array<{ _id: string; role: string | null; content: string|null }>;
  setMessList: (newMess: { _id: string; role: string | null; content: string|null }) => void;
  clearMessList: () => void;
};

export const useMessStore = create<MessStore>((set) => ({
 messList: [
    { _id: "init", role: "chatIDK", content: "Hỏi thử một câu xem sao?" },
 ],
 setMessList: (newMess) =>
    set((state) => ({
      messList: [...state.messList, newMess],
    })),
 clearMessList: () =>
    set(() => ({
      messList: [],
    })),
}));

