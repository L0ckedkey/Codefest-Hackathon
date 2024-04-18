import { useEffect, useState } from "react"
import "../../css/nft-card.scss"
import { MusicType } from "../../types/music-type"
import { UserType } from "../../types/user-type"
import { chordify_backend } from "../../../../declarations/chordify_backend"
export default function NFTCard({ music }: { music: MusicType }) {

    return (
        <>
            <a href="" className="nft">
                <div className='main'>
                    <img className='tokenImage' src={music.imageUrl} alt="NFT" />
                    <h2>{music.name} #4269</h2>
                    <p className='description'>{music.description}.</p>
                    <div className='tokenInfo'>
                        <div className="price">
                            <p>{music.price} ETH</p>
                        </div>
                        <div className="duration">
                            <ins>◷</ins>
                            <p>11 days left</p>
                        </div>
                    </div>
                    <hr />
                    <div className='creator'>
                        <div className='wrapper'>
                            <img src={music.author.imageUrl} alt="Creator" />
                        </div>
                        <p><ins>Creation of</ins> <a href="#" className="hover:text-purple-400">Kiberbash</a></p>
                    </div>
                </div>
            </a>

        </>
    )
}