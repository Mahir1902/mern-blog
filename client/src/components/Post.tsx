import { format } from "date-fns";
import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  summary: string;
  content: string;
  author: string;
};

export default function Post({
  id,
  title,
  image,
  content,
  createdAt,
  summary,
  author,
}: Props) {
  console.log(image);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[2.5rem]">
      <div className="">
        <Link to={`/post/${id}`}>
          <img
            src={`http://localhost:3000/${image}`}
            alt=""
            className="rounded-lg"
          />
        </Link>
      </div>
      <div className="flex flex-col">
        <Link to={`/post/${id}`}>
          <h2 className="text-2xl font-bold">{title}</h2>
        </Link>
        <p className="my-2 mx-0 text-[#888] text-[0.8rem] font-bold flex gap-3 items-center">
          <a href="" className="text-slate-600">
            {author}
          </a>
          <time>{format(createdAt, "MMM d, yyyy")}</time>
        </p>
        <p className="mx-0 leading-[1.4rem]">{summary}</p>
      </div>
    </div>
  );
}
