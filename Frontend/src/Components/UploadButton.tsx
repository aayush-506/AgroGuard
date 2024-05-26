import React, { useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

type Props = {
    onPress?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    image?: {
        name: string
        data?: string | null
    } | null
}
export default function UploadButton({ image, onPress }: Props) {
    useEffect(() => {
        if (!image || !image.data) return

        const formData = new FormData()
        const file = prepareFileForUpload(image.data, image.name)
        formData.append("image", file)
        fetch("/api/disease/predict", {
            method: "POST",
            body: formData,
        })
    }, [image])
    return (
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
                {image && image.data ? (
                    <img
                        src={image.data}
                        alt="Uploaded"
                        className="object-fit h-full custom-scale"
                    />
                ) : (
                    <>
                        <img
                            src="/mage_image-upload.png"
                            alt="Mage image upload logo"
                        />
                        <h1 className="text-[41px] font-[900] dark:text-white">
                            Choose Images
                        </h1>
                        <p className="text-[17px] dark:text-white-1">
                            You haven't chosen any images. Upload your images to
                            identify diseases.
                        </p>
                    </>
                )}
            </div>
            <div
                className={`
                    cursor-pointer
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
                `}
            >
                <Box>
                    <CircularProgress size={100} />
                    <p className="dark:text-white mt-2">
                        Uploading your image
                        <br />
                        Please be patient
                    </p>
                </Box>
            </div>
        </div>
    )
}

function prepareFileForUpload(image: string, name: string): File {
    const arr = image.split(",")
    const mime = arr[0].match(/:(.*?);/)![1] //? ! -> TypeScript Special
    const bstr = atob(arr[1])

    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) u8arr[n] = bstr.charCodeAt(n)
    return new File([u8arr], name, {
        type: mime,
    })
}
