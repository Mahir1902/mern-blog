import { create } from "zustand";

type NewPostStore = {
  title: string;
  summary: string;
  content: string;
  files:File | null
  setTitle: (title: string) => void;
  setSummary: (summary: string) => void;
  setContent: (content: string) => void;
  setFiles: (file: File | null) => void
};

export const useNewPostStore = create<NewPostStore>((set) => ({
  title: "",
  summary: "",
  content: "",
  files:null ,
  setTitle: (title) => set({ title }),
  setSummary: (summary) => set({ summary }),
  setContent: (content) => set({ content }),
  setFiles: (files) => set({ files }),
}));
