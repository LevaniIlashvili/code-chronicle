"use client";
import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import TextEditor from "@/components/TextEditor";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { updateBlog } from "@/lib/features/blogs/blogsSlice";
import { useRouter } from "next/navigation";
import { unstable_noStore as no_store } from "next/cache";

const page = ({ params }: { params: { id: string } }) => {
  no_store();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const storage = getStorage(app);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setImageURL(data.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [params.id]);

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

  const edit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!session || !session.user)
      return alert("You must be logged in to edit a blog");
    try {
      const res = await fetch(`/api/blog/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
          image: imageURL,
          userId: session.user.id,
          dateCreated: new Date(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(updateBlog(data));
      setTitle("");
      setContent("");
      setImage(null);
      setImageURL("");
      router.push("/blog/" + data._id);
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
          {image ? image.name : "Upload Cover Image"}
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
        <TextEditor content={content} setContent={setContent} />
        <p className="text-xs text-gray-500">
          Highlight text to change it's style
        </p>
        <div className="flex gap-2">
          <button>Cancel</button>
          <button
            className="bg-green-600 text-white font-semibold rounded-full w-fit p-1 px-4"
            type="button"
            onClick={edit}
          >
            Edit
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
