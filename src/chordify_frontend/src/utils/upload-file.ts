import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

export default async function UploadFile(path: string, file: File) {
    const timestamp = new Date().getTime()
    const filename = `${timestamp}_${file.name}`
    const filePath = `${path}/${filename}`;
    const storageRef = ref(storage, filePath)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}