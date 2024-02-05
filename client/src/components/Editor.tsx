
import ReactQuill from 'react-quill';

type Props = {
    content:string
    onChange: (value: string) => void
}

const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

export default function Editor({content, onChange}: Props) {
  return (
    <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={onChange}
      />
  )
}