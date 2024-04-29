/**
 * @file index.ts
 * @description Create a file 'index.ts' and copy all these variable
 * and assign respective value
 */
// @ts-nocheck
export const MONGODB_USERNAME: string
export const MONGODB_PASSWORD: string
export const MONGODB_DATABASE: string
export const MONGDB_URI: string = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@{ database-url }/${MONGODB_DATABASE}?retryWrites=true&w=majority&appName={ cluster-name }`

export const JWT_SECRET: string

export const CLOUDINARY_API_KEY: string
export const CLOUDINARY_API_SECRET: string
export const CLOUDINARY_CLOUDNAME: string