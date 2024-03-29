import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { useNewPostStore } from "@/store/newPostStore";
import axios from "axios";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

type Props = {};



export default function CreatePostPage({}: Props) {
  const {
    title,
    content,
    summary,
    files,
    setTitle,
    setSummary,
    setContent,
    setFiles,
  } = useNewPostStore();

  const navigate = useNavigate();

  const createNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Send as form data cause of image
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    if (files) formData.set("file", files);

    const res = await axios.post("http://localhost:3000/create", formData, {
      withCredentials: true,
    });

    if (res.status === 201) {
      setTitle("");
      setSummary("");
      setContent("");
      setFiles(null);
      navigate("/");
    }
  };

  return (
    <form className="p-4 flex flex-col gap-3" onSubmit={createNewPost}>
      <input
        className="border w-full px-2 py-2 rounded-lg hover:bg-gray-200/20 transition focus:outline-none placeholder:text-black/50 font-semibold"
        type="text"
        name=""
        id=""
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border w-full px-2 py-2 rounded-lg hover:bg-gray-200/20 transition focus:outline-none placeholder:text-black/50 font-semibold truncate"
        type="text"
        name="image"
        id=""
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <input
        className="border w-full px-2 py-2 rounded-lg hover:bg-gray-200/20 transition focus:outline-none placeholder:text-black/50 font-semibold"
        type="file"
        onChange={(e) => setFiles(e.target.files![0])}
      />

      {/* <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={(newValue) => setContent(newValue)}
      /> */}
      <Editor content={content} onChange={(newValue:string) => setContent(newValue)}/>

      <Button className="text-lg  bg-slate-600">Create Post</Button>
    </form>
  );
}
