import React from 'react'
import { topMeals } from '../../assets/Data/TopMeels';
import CarouselItem from './CarouselItem';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const MultiItemCarousel = () => {




    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false
    };

    return (
        <div>

            <Slider {...settings}>
                {
                    topMeals.map((item) => <CarouselItem key={item} image={item.image} title={item.title} />)
                }
            </Slider>

        </div>
    )
}

export default MultiItemCarousel