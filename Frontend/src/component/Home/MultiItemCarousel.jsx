import React from 'react'
import CarouselItem from './CarouselItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const MultiItemCarousel = ({foods}) => {




    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1800,
        arrows: false,
        responsive: [
            {
              breakpoint: 1200, 
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 980, 
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
    };

    return (
        <div className='border border-gray-400'>

            <Slider {...settings}>
                {
                    foods?.map((item) => <CarouselItem key={item} image={item.images[0]} title={item?.name} price={item?.price} restaurantId={item?.restaurant?.id} />)
                }
            </Slider>

        </div>
    )
}

export default MultiItemCarousel