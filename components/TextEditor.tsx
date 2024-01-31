"use client";
import React, { useCallback } from "react";
import "highlight.js/styles/default.css";
import hljs from "highlight.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const TextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    syntax: {
      highlight: useCallback(
        (text: string) => hljs.highlightAuto(text).value,
        []
      ), // Ensure stable reference
    },
  };

  return (
    <div>
      {/* text editor height is set in global.css  */}
      <ReactQuill
        theme="bubble"
        value={content}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
