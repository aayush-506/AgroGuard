import { Request, Response, NextFunction } from "express"

export default async function image_processing_middleware(request: Request, response: Response, next: NextFunction) {
    try {
        if (!request.image_src) next()
        await fetch("http://127.0.0.1/predict", {
            method: "POST",
            body: JSON.stringify({
                "image_src": request.image_src
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer MY_AUTH_TOKEN'
            }
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.status !== "status")
                    request.image_classification = undefined
                else
                    request.image_classification = data.data
                next()
            })
    } catch (err) {
        console.error("Console -> Python")
        console.error(err)
        next()
    }
}