import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

const TextEditor = ({ content, setContent }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: "bubble",
        modules: {
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"],
            ["clean"],
          ],
        },
      });

      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });

      quill.on("selection-change", (range, oldRange, source) => {
        quill.getModule("toolbar").container.style.display = "";
      });

      quill.root.innerHTML = content;
    }
  }, []);

  return (
    <div>
      <div ref={quillRef} style={{ height: "300px" }} />
    </div>
  );
};

export default TextEditor;
