import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import Spinner from "@/components/Spinner";

export default function BillboardForm({
  _id,
  title: existingTitle,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [images, setImages] = useState(existingImages || "");
  const [isUploading, setIsUploading] = useState(false);
  const [goToBillboards, setGoToBillboards] = useState(false);
  const router = useRouter();

  async function saveBillboard(ev) {
    ev.preventDefault();
    const data = {
      title,
      images,
    };

    if (_id) {
      //update
      await axios.put("/api/billboards", { ...data, _id });
    } else {
      //create
      await axios.post("/api/billboards", data);
    }
    setGoToBillboards(true);
  }

  if (goToBillboards) {
    router.push("/billboards");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function removeImage(imageLink) {
    setImages((prevImages) => prevImages.filter((link) => link !== imageLink));
  }

  return (
    <form onSubmit={saveBillboard}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 bg-white p-4 shadow-sm rounded-sm
                border border-gray-200 relative"
              >
                <img src={link} alt="" className="rounded-lg" />
                <button
                  onClick={() => removeImage(link)}
                  className="z-10 absolute top-0 right-0 text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label
          className="w-24 h-24 flex flex-col items-center justify-center text-center
          text-sm gap-1 text-primary  rounded-sm bg-white shadow-md
          cursor-pointer border border-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
