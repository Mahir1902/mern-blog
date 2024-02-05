import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { useNewPostStore } from "@/store/newPostStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

export default function EditPostPage({}: Props) {
  const { id } = useParams();
  const navigate = useNavigate()

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

  //get the post with the id to set the values
  useEffect(() => {
    axios.get(`http://localhost:3000/post/${id}`).then((res) => {
      setTitle(res.data.title);
      setSummary(res.data.summary);
      setContent(res.data.content);
    });
  }, []);

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Send as form data cause of image
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    if(files instanceof File) {
        formData.set("file", files);
    }

    const res = await axios.put(`http://localhost:3000/post/${id}`, formData, {withCredentials: true});
    navigate(`/post/${id}`)
    console.log(res)
  };

  return (
    <form className="p-4 flex flex-col gap-3" onSubmit={updatePost}>
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
        multiple
        onChange={(e) => setFiles(e.target.files![0])}
      />

      <Editor content={content} onChange={(newValue) => setContent(newValue)} />

      <Button className="text-lg  bg-slate-600">Update Post</Button>
    </form>
  );
}
