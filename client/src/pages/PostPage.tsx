import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { format } from "date-fns";
import { useUserStore } from "@/store/userStore";
import { FilePenLine } from 'lucide-react';

type Props = {}

type PostType = {
    _id:string
    title: string;
    image: string;
    createdAt: string;
    summary: string;
    content: string;
    author: {
        _id:string,
        username: string;
    }
}

export default function PostPage({}: Props) {

    const [singlePost, setSinglePost] = useState<PostType | null>(null)

    const {username} = useUserStore()

    const {id} = useParams()
    //Grab the info of the post
    useEffect(()=> {
        axios.get(`http://localhost:3000/post/${id}`).then((res) => {
            setSinglePost(res.data)
            console.log(singlePost)
        })
    }, [])

    if(!singlePost) return <p>...Loading</p>

  return (
    <div >
        <div className="max-h-[14rem] flex ">

        <img className="object-cover rounded-lg" src={`http://localhost:3000/${singlePost?.image}`} alt="" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-5 p-2">
        <h1 className="text-2xl font-bold text-center">{singlePost.title}</h1>
        {username === singlePost.author.username && <Link to={`/edit/${id}`} ><FilePenLine className="h-5 w-5 text-slate-500"/></Link>}
        </div>
        <div className="flex gap-4 mt-3 items-center justify-center">
            <time className="font-semibold text-slate-500">{format(singlePost.createdAt, "MMM d, yyyy")}</time>
            <p className="font-bold text-slate-600">by {singlePost.author.username}</p>
        </div>
       
        <div className="mt-4 leading-relaxed" dangerouslySetInnerHTML={{__html:singlePost.content}}/>
    </div>
  )
}