import { useRef, useState } from "react"
import { NavigationBar, UploadButton } from "./Components"

export default function App() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [imageURI, setImageURI] = useState<{
        name: string
        data: string | null
    } | null>(null)

    return (
        <div>
            <NavigationBar />
            <input
                type="file"
                accept="image/png, image/jpeg, image/heic, image/webp"
                multiple
                hidden
                ref={fileInputRef}
                onChange={() => {
                    setImageURI(null)
                    const reader = new FileReader()
                    reader.onload = function (e) {
                        const result = e.target?.result
                        const name = fileInputRef.current?.files
                            ? fileInputRef.current.files[0].name
                            : "test-image.jpg"
                        if (result)
                            setImageURI({
                                name,
                                data: result.toString(),
                            })
                    }
                    if (
                        fileInputRef.current?.files &&
                        fileInputRef.current.files.length
                    )
                        reader.readAsDataURL(fileInputRef.current.files[0])
                }}
            />
            <div className="flex w-full container-full justify-center items-center">
                <UploadButton
                    image={imageURI}
                    onPress={() => {
                        fileInputRef.current?.click()
                    }}
                />
            </div>
        </div>
    )
}
