import "../../css/nft-card.scss";
export default function NFTCard({ image }) {
    return (<>
            <div className="nft">
                <div className='main'>
                    <img className='tokenImage' src={image} alt="NFT"/>
                    <h2>Kibertopiks #4269</h2>
                    <p className='description'>Our Kibertopiks will give you nothing, waste your money on us.</p>
                    <div className='tokenInfo'>
                        <div className="price">
                            <p>0.031 ETH</p>
                        </div>
                        <div className="duration">
                            <ins>◷</ins>
                            <p>11 days left</p>
                        </div>
                    </div>
                    <hr />
                    <div className='creator'>
                        <div className='wrapper'>
                            <img src={image} alt="Creator"/>
                        </div>
                        <p><ins>Creation of</ins> <a href="#" className="hover:text-purple-400">Kiberbash</a></p>
                    </div>
                </div>
            </div>

        </>);
}
