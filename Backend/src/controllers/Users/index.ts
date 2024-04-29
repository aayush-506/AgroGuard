import { Request, Response } from "express"
import JWT from "jsonwebtoken"
import { UserModel } from "#@/models/User"
import { StatusCode } from "#@/utils"
import { JWT_SECRET } from "#@/secrets"
import { cloudinary } from "#@/helper"

export async function createUser(request: Request, response: Response) {
    const { name, email, password } = request.body
    const isEmailExists = await UserModel.isEmailRedundant(email)

    if (isEmailExists) {
        return response.status(StatusCode.CONFICT).json({
            success: false,
            message: `The user '${email}' already exist`,
        })
    }

    const user = new UserModel({
        name,
        email,
        password,
    })
    await user.save()

    return response.status(StatusCode.CREATED).json({
        user: user.asjson(),
        success: true,
    })
}

export async function signInUser(request: Request, response: Response) {
    const { email, password } = request.body

    const user = await UserModel.findOne({ email })
    if (!user)
        return response.status(StatusCode.NOT_FOUND).json({
            success: false,
            message:
                "NotFound: Make sure your 'email' exists and corresponds to the 'password'.",
        })

    const isUserExists = await user.comparePassword(password)
    if (!isUserExists)
        return response.status(StatusCode.UNAUTHORIZED).json({
            success: false,
            message:
                "NotFound: Make sure your 'email' exists and corresponds to the 'password'.",
        })

    const token = JWT.sign({ userid: user._id }, JWT_SECRET, {
        expiresIn: "1d",
    })

    let old_tokens = user.tokens || []

    if (old_tokens.length) {
        old_tokens = old_tokens.filter(t => {
            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
            if (timeDiff < 86400) {
                return t;
            }
            return
        })
    }

    await UserModel.findByIdAndUpdate(user._id, {
        tokens: [ ...old_tokens, {
            token,
            signedAt: Date.now().toString()
        } ]
    })

    return response.status(StatusCode.OK).json({
        success: true,
        user: user.asjson(),
        token,
    })
}

export async function uploadProfile(request: Request, response: Response) {
    const userObject = request.userObject
    if (!userObject)
        return response.status(StatusCode.UNAUTHORIZED).json({
            success: false,
            message:
                "Unauthorized: Your Token is incorrect. You are not allowed to access requested resource.",
        })

    try {
        // cloudinary.uploader.upload(request.file?.path,
        //     { public_id: "olympic_flag" },
        //     function (error, result) { console.log(result); });
        if (!request.file?.path)
            return response.status(StatusCode.BAD_REQUEST).json({
                success: false, message: "BadRequest: Profile Image not received"
            })
        const result = await cloudinary.uploader.upload(request.file?.path, {
            public_id: `${userObject._id}_profile`,
            width: 500,
            height: 500,
            crop: 'fill'
        })

        const updatedUser = await UserModel.findByIdAndUpdate(userObject._id, {
            profilePicture: result.url
        }, { new: true })

        return response.status(StatusCode.CREATED).json({
            success: true,
            message: "Created: Profile picture uploaded.",
            user: updatedUser?.asjson()
        })
    } catch (error: any) {
        return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}

export async function signOutUser(request: Request, response: Response) {
    const authorization_token = request.headers.authorization?.split(" ")
    if (authorization_token?.length !== 2)
        return response.status(StatusCode.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized: Authorization Token is missing in the Headers."
        })

    const userObject = request.userObject
    if (!userObject)
        return response.status(StatusCode.UNAUTHORIZED).json({
            success: false,
            message:
                "Unauthorized: Your Token is incorrect. You are not allowed to access requested resource.",
        })

    const tokens = userObject.tokens
    const newTokens = tokens?.filter(t => t.token !== authorization_token[ 1 ])
    await UserModel.findByIdAndUpdate(userObject._id, {
        tokens: newTokens
    })
    return response.status(StatusCode.OK).json({
        success: true,
        message: "Disconnect: User is logged out."
    })
}