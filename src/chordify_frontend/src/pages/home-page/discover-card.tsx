import { useEffect, useState } from "react"
import "../../css/discover-card.scss"
import { MusicType } from "../../types/music-type"
import { UserType } from "../../types/user-type"
import { chordify_backend } from "../../../../declarations/chordify_backend"
import { Link, redirect } from "react-router-dom"
import formatRemainingTime from "../../utils/format-time"

export default function DiscoverCard({ music }: { music: MusicType }) {
    const [remainingTime, setRemainingTime] = useState<string>(formatRemainingTime(music.saleEnd));

    const goToAuthor = () => {
        return redirect(`/author/${music.author.id}`)
    }
    useEffect(() => {
        let animationFrameId: number;

        const updateTime = () => {
            setRemainingTime(formatRemainingTime(music.saleEnd));
            animationFrameId = requestAnimationFrame(updateTime);
        };

        updateTime();

        return () => cancelAnimationFrame(animationFrameId);
    }, [music.saleEnd]);
    return (
        <>
            <Link  to={`/music/${music.id}`} className="nft">
                <div className='main'>
                    <img className='tokenImage' src={music.imageUrl} alt="NFT" />
                    <h2 className="text-white">{music.name}</h2>
                    <p className='description text-ellipsis text-wrap line-clamp-2'>{music.description}.</p>
                    <div className='tokenInfo'>
                        <div className="price">
                            <p>{music.price} ICP</p>
                        </div>
                        <div className="duration">
                            <ins>◷</ins>
                            <p>{remainingTime}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='creator'>
                        <div className='wrapper'>
                            <img src={music.author.imageUrl} alt="Creator" />
                        </div>
                        <p>
                            <ins>Creation of </ins>
                            <button onClick={goToAuthor} className="hover:text-purple-400 text-white">
                                {music.author.username}
                            </button>
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}