import express from "express"
import multer from "multer"
import { createUser, signInUser, uploadProfile, signOutUser } from "#@/controllers"
import { validateUser, validateToken, UserSignupValidator, UserSignInValidator } from "#@/middlewares/validation"


const route = express.Router()

const storage = multer.diskStorage({})
//@ts-ignore
const fileFilter = (request: any, file: any, callback: any) => {
    if (!file.mimetype.startsWith("image")) {
        callback("Invalid Image File", false)
    }

    callback(null, true)
}
const uploadStorage = multer({
    storage,
    fileFilter
})

route.post("/create-user", UserSignupValidator, validateUser, createUser)
route.post("/login-user", UserSignInValidator, validateUser, signInUser)
route.post("/logout-user", validateToken, signOutUser)
route.post("/update-profile", validateToken, uploadStorage.single("profile"), uploadProfile)

export default route