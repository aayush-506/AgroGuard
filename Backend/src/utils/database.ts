import mongoose from "mongoose"
import { MONGDB_URI } from "#@/secrets"


export default function connectDatabase() {
    mongoose.connect(MONGDB_URI)
        .then(() => {
            console.log("Connected to the Database.")
        })
        .catch((error: any) => {
            console.error(error.message, MONGDB_URI)
        })
}