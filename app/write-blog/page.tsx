"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const page = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");

  const storage = getStorage(app);

  useEffect(() => {
    const uploadImage = () => {
      const name = new Date() + image?.name!;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, image!);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
          });
        }
      );
    };

    if (!image) return;
    uploadImage();
  }, [image]);

  const publish = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log(title, content);
      const res = await fetch("/api/blog/new", {
        method: "POST",
        body: JSON.stringify({ title, content, image: imageURL }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTitle("");
      setContent("");
      setImage(null);
      setImageURL("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center w-full p-4 mt-4">
      <div className="flex flex-col max-w-3xl gap-2 flex-1">
        <label
          htmlFor="media"
          className="w-fit cursor-pointer bg-gray-300 p-1 px-2 mb-2 rounded-sm"
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
          className="w-full text-4xl focus:outline-none"
          value={title}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />
        <ReactQuill
          theme="bubble"
          value={content}
          onChange={setContent}
          placeholder="Tell your story..."
          className="min-h-[50vh] w-full mt-4"
        />
        <p className="text-xs text-gray-500">
          Highlight text to change it's style
        </p>
        <button
          className="bg-green-600 text-white font-semibold rounded-full w-fit p-1 px-4"
          onClick={publish}
        >
          Publish
        </button>
      </div>
    </section>
  );
};

export default page;
