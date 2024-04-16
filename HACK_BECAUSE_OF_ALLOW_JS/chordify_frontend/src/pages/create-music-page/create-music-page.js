import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadFile from "../../utils/upload-file";
import ChooseGenre from "./choose-genre";
export default function CreateMusic() {
    const [form, setForm] = useState({
        "name": "",
        "description": "",
        "supply": "",
        "price": ""
    });
    const [selectedFile, setSelectedFile] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles[0]) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedFile) {
                const url = await UploadFile("images", selectedFile);
            }
        }
        catch (error) {
        }
    };
    return (<>
            <div className="relative w-full h-full flex flex-grow justify-center p-20 box-border ">
                <div className=" max-w-5xl w-full h-full flex flex-grow flex-col items-center  text-white box-border">
                    <h1 className="text-3xl font-semibold self-start py-6 box-border">Create NFT</h1>
                    <div className="w-full h-full flex flex-grow justify-between gap-20">
                        {selectedFile ? (<div className="group relative w-full min-h-full h-full bg-red-200 flex items-center justify-center ring-1 ring-white rounded-md ">
                                    <img src={URL.createObjectURL(selectedFile)} alt="Selected File" className="max-w-full max-h-full w-full h-full rounded-md object-cover "/>
                                    <div className="absolute inset-0 group-hover:bg-black group-hover:bg-opacity-50">

                                    </div>
                                    <XMarkIcon onClick={() => { setSelectedFile(undefined); }} className="absolute z-10 self-center w-10 h-10 group-hover:flex hover:cursor-pointer hidden"/>
                                </div>) : (<div className="w-full min-h-full  flex flex-col justify-center items-center p-4 border-2 border-white border-dashed rounded-md  cursor-pointer hover:border-gray-400 focus:outline-none" {...getRootProps()}>
                                    <span className="flex flex-col items-center gap-1 text-white">
                                        <ArrowUpTrayIcon className="w-10 h-10 "/>
                                        {isDragActive ?
                <p>Drop the files here ...</p> :
                (<>
                                                        <p className="font-bold">Drag and drop media</p>
                                                        <p className="font-semibold">Max size: 25MB</p>
                                                        <p>JPG, PNG, JPEG</p>
                                                    </>)}
                                    </span>
                                    <input multiple={false} accept="image/jpeg, image/png, image/jpg" {...getInputProps()}/>
                                </div>)}
                        <div className="max-w-lg w-full h-fit flex flex-col gap-8 ">
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Name</span>
                                <input onChange={handleInputChange} value={form.name} name="name" className="bg-white py-3 bg-opacity-10 ring-1 ring-white focus:ring-white rounded-md border-none outline-none" type="text" placeholder="Shirloin"/>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Description</span>
                                <textarea onChange={handleInputChange} value={form.description} name="description" className="bg-white py-3 bg-opacity-10  ring-1 ring-white focus:ring-white rounded-md border-none outline-none" id="" cols={30} rows={5} placeholder="Shirloin will give you joy!"></textarea>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Genres</span>
                                <ChooseGenre selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Supply</span>
                                <input onChange={handleInputChange} value={form.supply} name="supply" className="bg-white py-3 bg-opacity-10  ring-1 ring-white focus:ring-white rounded-md border-none outline-none" type="number" placeholder="1-999"/>
                            </label>
                            <label className="form-control w-full">
                                <span className="label-text text-white pb-2 font-semibold text-lg">Price</span>
                                <input onChange={handleInputChange} value={form.price} name="price" className="bg-white py-3 bg-opacity-10  ring-1 ring-white focus:ring-white rounded-md border-none outline-none" type="number" placeholder="1-999"/>
                            </label>
                            <button onClick={handleSubmit} className=" bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold rounded-md px-6 py-3 ml-0">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}
