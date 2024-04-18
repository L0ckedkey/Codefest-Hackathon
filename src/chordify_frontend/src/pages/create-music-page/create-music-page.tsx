import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import UploadFile from "../../utils/upload-file"
import ChooseGenre from "./choose-genre"
import { chordify_backend } from "../../../../declarations/chordify_backend"
import {useAuth} from "../../contexts/auth-context"
import { useLoading } from "../../contexts/loading-context"
import { toast } from "react-toastify"

export default function CreateMusic() {

    const {user, isLoggedIn} = useAuth()
    const {setIsLoading} = useLoading()

    const defaultForm = {
        "name": "",
        "description": "",
        "supply": "",
        "price": ""
    }

    const [form, setForm] = useState(defaultForm)
    const [selectedFile, setSelectedFile] = useState<File>()
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles[0]) {
            setSelectedFile(acceptedFiles[0])
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })
    }

    const reset = () => {
        setForm(defaultForm)
        setSelectedGenres([])
        setSelectedFile(undefined)
    }

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        if(!isLoggedIn){
            toast.error("Please Login!")
            return
        }
        if(!selectedFile){
            toast.error("Please Select Image")
            return
        }
        if(!form.name || !form.description || !form.price || !form.supply || selectedGenres.length === 0){
            toast.error("All Field Must Be Filled")
            return
        }
        try {
            setIsLoading(true)
            reset()
            const url = await UploadFile("images", selectedFile)
            const res = await chordify_backend.createMusic({
                authorId: user.id,
                name: form.name,
                description: form.description,
                price: BigInt(form.price),
                supply: BigInt(form.supply),
                genres: selectedGenres,
                imageUrl: url
            })
            setIsLoading(false)
            toast.success("Create NFT Success")
        } catch (error) {
            toast.error("Create NFT Failed")
            console.log(error)
        }
    }


    return (
        <>
            <div className="relative w-full h-full flex flex-grow justify-center p-20 box-border ">
                <div className=" max-w-5xl w-full h-full flex flex-grow flex-col items-center  text-white box-border">
                    <h1 className="text-3xl font-semibold self-start py-6 box-border">Create NFT</h1>
                    <div className="w-full h-full flex flex-grow justify-between gap-20">
                        {
                            selectedFile ? (
                                <div className="group relative  w-full min-h-full  bg-red-200 flex items-center justify-center ring-1 ring-white rounded-md ">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected File"
                                        className="w-full min-h-full  rounded-md object-cover "
                                    />
                                    <div className="absolute inset-0 group-hover:bg-black group-hover:bg-opacity-50">

                                    </div>
                                    <XMarkIcon onClick={() => { setSelectedFile(undefined) }} className="absolute z-10 self-center w-10 h-10 group-hover:flex hover:cursor-pointer hidden" />
                                </div>
                            ) : (
                                <div className="w-full min-h-full  flex flex-col justify-center items-center p-4 border-2 border-white border-dashed rounded-md  cursor-pointer hover:border-gray-400 focus:outline-none" {...getRootProps()}>
                                    <span className="flex flex-col items-center gap-1 text-white">
                                        <ArrowUpTrayIcon className="w-10 h-10 " />
                                        {
                                            isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                (
                                                    <>
                                                        <p className="font-bold">Drag and drop media</p>
                                                        <p className="font-semibold">Max size: 25MB</p>
                                                        <p >JPG, PNG, JPEG</p>
                                                    </>
                                                )
                                        }
                                    </span>
                                    <input multiple={false} accept="image/jpeg, image/png, image/jpg" {...getInputProps()} />
                                </div>
                            )
                        }
                        <div className="max-w-lg w-full h-fit flex flex-col gap-8 ">
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Name</span>
                                <input onChange={handleInputChange} value={form.name} name="name" className="bg-white py-3 bg-opacity-10 ring-1 ring-white focus:ring-white rounded-md border-none outline-none" type="text" placeholder="Shirloin" />
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Description</span>
                                <textarea onChange={handleInputChange} value={form.description} name="description" className="bg-white py-3 bg-opacity-10  ring-1 ring-white focus:ring-white rounded-md border-none outline-none" id="" cols={30} rows={5} placeholder="Shirloin will give you joy!"></textarea>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Genres</span>
                                <ChooseGenre selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Supply</span>
                                <input onChange={handleInputChange} value={form.supply} name="supply" className="bg-white py-3 bg-opacity-10  ring-1 ring-white focus:ring-white rounded-md border-none outline-none" type="number" placeholder="1-999" />
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Price</span>
                                <input onChange={handleInputChange} value={form.price} name="price" className="bg-white py-3 bg-opacity-10  ring-1 ring-white focus:ring-white rounded-md border-none outline-none" type="number" placeholder="1-999" />
                            </label>
                            <button onClick={handleSubmit} className=" bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold rounded-md px-6 py-3 ml-0">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}