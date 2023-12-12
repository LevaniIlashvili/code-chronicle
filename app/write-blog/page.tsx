"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const page = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <section className="flex flex-col items-center w-full p-4 mt-4">
      <div className="flex flex-col w-[700px]">
        <label
          htmlFor="media"
          className="w-fit cursor-pointer bg-gray-300 p-1 mb-2 rounded-sm"
        >
          {image ? image.name : "Upload Image"}
        </label>
        <input
          type="file"
          name="media"
          id="media"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <input
          type="text"
          placeholder="Title"
          className="text-4xl focus:outline-none"
        />
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
          className="min-h-[300px] mt-4"
        />
        <button className="bg-green-600 text-white font-semibold rounded-full w-fit p-1 px-4">
          Publish
        </button>
      </div>
    </section>
  );
};

export default page;
