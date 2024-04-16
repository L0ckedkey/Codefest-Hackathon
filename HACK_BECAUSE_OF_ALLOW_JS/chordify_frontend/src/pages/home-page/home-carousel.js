import { useEffect } from "react";
import { useImage } from "../../hooks/use-image";
import Splide from '@splidejs/splide';
export default function Carousel() {
    const { images } = useImage();
    useEffect(() => {
        var splide = new Splide(".splide", {
            type: 'loop',
            perMove: 1,
            perPage: 5,
            autoplay: true,
            gap: '1rem',
            pagination: false,
            snap: true,
            lazyLoad: 'nearby',
            breakpoints: {
                640: {
                    perPage: 2,
                    gap: '1rem',
                },
                480: {
                    perPage: 1,
                    gap: '1rem'
                }
            }
        });
        splide.mount();
    }, []);
    return (<>
            <section className="splide group  " aria-label="Splide Basic HTML Example">
                <div className="splide__arrows text-xl group-hover:opacity-100 opacity-0 transition-all duration-300">
                </div>
                <div className="splide__track">
                    <ul className="splide__list">
                        {images.map((image, index) => (<li key={index} className="splide__slide overflow-hidden rounded-lg hover:cursor-pointer ">
                                    <img className="rounded-md w-full hover:scale-110  transition-transform duration-300" src={image} alt=""/>
                                </li>))}
                    </ul>
                </div>
            </section>
        </>);
}
