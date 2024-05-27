import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios, { AxiosError } from "axios";
import Card from "./Card";

type Props = {
  onPress?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  image?: {
    name: string;
    data?: string | null;
  } | null;
};
export default function UploadForm({ image, onPress }: Props) {
  // Defining Hooks
  const [diseaseState, setDiseaseState] = useState<
    {
      disease: string;
      treatments: string[];
    } | null
  >(null);

  let uploadImage: undefined | ((data: typeof image) => void) = undefined;
  const handleError = useCallback((error: unknown) => {
    if (error instanceof AxiosError) {
      if (!error.response) return console.error(error.message);

      const statusCode = error.response?.status;
      if (statusCode === 500) {
        toast.error(
          "Cannot upload your image due to Server error. Please try again later.",
          {
            action: {
              label: "Try again",
              onClick: () => uploadImage?.(image),
            },
          },
        );
      } else if (statusCode === 400 || statusCode === 415) {
        toast.error(
          error.response.data.message ??
            "Cannot process your data due to some user-side errors.",
        );
      }
    } else if (error instanceof Error) console.error(error.message);
    else console.error(error);
  }, [image, uploadImage]);

  // Defining Fuctions
  uploadImage = useCallback(
    (data: typeof image) => {
      if (!data || !data.data) return;
      setDiseaseState(null);
      toast.info("Your request is being processed. Please wait a moment.");
      const formData = new FormData();
      const file = prepareFileForUpload(data.data, data.name);
      formData.append("image", file);
      axios
        .post("/api/disease/predict", formData)
        .then((data) => {
          const result = data.data;
          if (result["status"]) {
            const data_ = {
              disease: result["data"]["disease"],
              treatments: result["data"][
                "treatments"
              ] as string[],
            };
            setDiseaseState({ ...data_ });
            toast.success(
              "Your request has been successfully processed.",
            );
          }
        })
        .catch(handleError);
    },
    [handleError],
  );

  // function handleError(error: unknown) {}

  function prepareFileForUpload(image: string, name: string): File {
    const arr = image.split(",");
    const mime = arr[0].match(/:(.*?);/)![1]; //? ! -> TypeScript Special
    const bstr = atob(arr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], name, {
      type: mime,
    });
  }

  // Handle Side Effects
  useEffect(() => {
    uploadImage(image);
  }, [image, uploadImage]);
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <div className="flex gap-10 flex-wrap  w-full h-full justify-center items-center p-20">
        <div
          onClick={onPress}
          className={`
                cursor-pointer
                flex
                justify-center
                items-center
                flex-col
                w-[555px]
                h-[420px]
                ${image ? "p-0" : "p-20"}
                text-center
                bg-white-5
                dark:bg-dark-2
                rounded-[61px]
                outline
                outline-[#d3d3d3]
                dark:outline-[#6b6b6b]
                outline-0
                hover:outline-1
                transition-all
                overflow-hidden
            `}
        >
          {image && image.data
            ? (
              <img
                src={image.data}
                alt="Uploaded"
                className="object-fit h-full custom-scale"
              />
            )
            : (
              <>
                <img
                  src="/mage_image-upload.png"
                  alt="Mage image upload logo"
                />
                <h1 className="text-[41px] font-[900] dark:text-white">
                  Choose Images
                </h1>
                <p className="text-[17px] dark:text-white-1">
                  You haven't chosen any images. Upload your images to identify
                  diseases.
                </p>
              </>
            )}
        </div>
        <div
          className={`
                    flex
                    justify-center
                    items-center
                    flex-col
                    ${image ? "w-[555px]" : "w-[0px]"}
                    h-[420px]
                    text-center
                    bg-white-5
                    dark:bg-dark-2
                    rounded-[61px]
                    overflow-hidden
                    transite-width
                    overflow-y-scroll
                `}
        >
          {diseaseState
            ? (
              <>
                <div className="h-full w-full p-8 flex-col items-center">
                  <h1 className=" font-[900] text-[29px] dark:text-white cursor-pointer border-b">
                    {diseaseState.disease}
                  </h1>
                  <p className=" font-[600] mt-[20px] text-xl text-[#8d8d8d] dark:text-[#CECECE]">
                    Treatments
                  </p>

                  <div className="mt-3 flex flex-col gap-5">
                    {diseaseState.treatments.map(
                      (treatment, index) => (
                        <Card
                          treatment={treatment}
                          key={`card-${index}`}
                        />
                      ),
                    )}
                  </div>
                  <div className="h-[20px]" />
                </div>
              </>
            )
            : (
              <Box>
                <CircularProgress size={100} />
                <p className="dark:text-white mt-2">
                  Uploading your image
                  <br />
                  Please be patient
                </p>
              </Box>
            )}
        </div>
      </div>
    </>
  );
}
