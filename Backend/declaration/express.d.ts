import { IUser } from "../src/models/User/index.ts"
import { Request } from "express-serve-static-core"

declare module 'express-serve-static-core' {
    interface Request {
        image_src?: string
        image_classification?: string[]
        userObject?: IUser
    }
}