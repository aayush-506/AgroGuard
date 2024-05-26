// for submitting picture
import React, { useState } from "react";

export function FileSubmit() {
  const [file, setFile] = useState<File>();
  const [img, setImg] = useState<string>("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setFile(image);
      setImg(URL.createObjectURL(image));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.log("No file");
    } else {
      console.log(file);
    }
    setFile(undefined);
    setImg("");
  };

  return (
    <div className="w-1/2 p-6 flex flex-col justify-center item-center">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center bg-gray-200 h-56 w-auto mb-5 rounded-lg">
          {img !== "" && <img className="h-40 rounded-lg" src={img} />}
          <label
            htmlFor="pic-upload"
            className=" text-center block cursor-pointer border text-xl font-semibold"
          >
            {file === (null || undefined) && ("Add Picture")}
          </label>
          <input
            name="plant"
            id="pic-upload"
            className="hidden"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button className=" w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-2 text-center">
          Submit
        </button>
      </form>
    </div>
  );
}
