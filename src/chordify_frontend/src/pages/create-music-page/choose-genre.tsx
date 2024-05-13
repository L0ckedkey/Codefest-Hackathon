import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useRef, useState } from "react"
import { Genres } from "../../types/genres"
import { MAIN_TABS } from "../../types/consts";

interface ChooseGenreProps {
    selectedGenres: string[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ChooseGenre({ selectedGenres, setSelectedGenres }: ChooseGenreProps) {



    const [isOpen, setIsOpen] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    const [searchQuery, setSearchQuery] = useState('')

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSelectGenre = (genre: string) => {
        handleClick()
        if (!selectedGenres.includes(genre)) {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }

    const handleOutsideClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current!.contains(e.target as HTMLElement)) {
            setIsOpen(false);
        }
    };

    const handleRemoveGenre = (genre: string) => {
        setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const filteredGenres = Array.from(MAIN_TABS).filter((genre) => (
        genre.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    ))

    return (
        <>
            <div ref={dropdownRef}>
                {
                    isOpen ? (
                        <div className="relative w-full h-fit flex flex-col gap-4">
                            <input onChange={handleInputChange} value={searchQuery} placeholder="Search..."
                                className="bg-transparent w-full rounded-md border-none outline-none ring-1 ring-white py-3 text-md text-white focus:outline-none focus:ring-1 focus:ring-white focus:bg-none placeholder:text-gray-400" type="search" autoComplete="off" />
                            <div className="z-10 absolute inset-x-0 bg-white bg-opacity-20 backdrop-blur-md  max-h-60 mt-14 flex flex-col  rounded-md overflow-y-auto">
                                {
                                    filteredGenres.map((genre, index) => (
                                        <div onClick={() => handleSelectGenre(genre)}  className="w-full border-b-2 border-white flex items-center hover:bg-white hover:bg-opacity-30 hover:cursor-pointer" key={index}>
                                            <p className="p-3">{genre}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    ) :
                        (
                            <>
                                <div className="bg-white flex flex-wrap items-center gap-2 p-3 bg-opacity-10 ring-1 ring-white focus:ring-white rounded-md text-sm text-center font-medium">
                                    {
                                        selectedGenres.length < 1 ? (

                                            <div className="w-fit h-fit px-3 py-1 rounded-full bg-white bg-opacity-20 opacity-30">
                                                Rock
                                            </div>
                                        ) :
                                            (
                                                <>
                                                    {
                                                        selectedGenres.map((genre, index) => (
                                                            <div key={index} className="w-fit h-fit px-3 py-1 flex items-center gap-1 rounded-full bg-white bg-opacity-20">
                                                                <XMarkIcon  onClick={() => handleRemoveGenre(genre)} className="w-4 h-4 cursor-pointer" />
                                                                {genre}
                                                            </div>

                                                        ))
                                                    }
                                                </>
                                            )
                                    }
                                    <button className="w-fit " >
                                        <PlusCircleIcon onClick={handleClick} className="w-6 h-6" />
                                    </button>
                                </div>
                            </>
                        )
                }
            </div>
        </>
    )
}