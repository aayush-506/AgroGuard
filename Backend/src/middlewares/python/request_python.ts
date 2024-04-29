import path from "path"
import { Request, Response, NextFunction } from "express"
import { spawn } from "child_process"

export default async function python_request(request: Request, response: Response, next: NextFunction) {
    const python_script = path.join(__dirname, "python_detection.py")
    const { image_src } = request

    try {
        const spawn_process = await spawn("python", [ python_script, image_src ])
        spawn_process.on("data", (data) => {
            if (data)
                request.image_classification = data.toString()
            else
                request.image_classification = undefined
            next()
        })

        spawn_process.on("error", (error) => {
            request.image_classification = undefined
        })
    } catch (error) {
        request.image_classification = undefined
    }
}
