import { useEffect, useState } from "react";
import { chordify_backend } from "../../../declarations/chordify_backend"

export default function Debug() {

    const [genres, setGenres] = useState<any>([])

    useEffect(() => {

        async function fetchGenres() {
            try {
                const res = await chordify_backend.getUsers()
                setGenres(res)
            } catch (error) {
                console.log(error)
            }
        }

        fetchGenres()
    }, [])

    return (
        <>
            <div className="min-h-screen bg-black grid place-items-center px-10 text-white text-xl">
                {
                    genres.map((genre: any) => (
                        <h1 key={genre.id}>{genre.username}</h1>
                    ))
                }
            </div>
        </>
    )
}