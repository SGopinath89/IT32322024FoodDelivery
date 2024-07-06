import React from 'react'
import CarouselItem from './CarouselItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const MultiItemCarousel = ({foods}) => {




    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        responsive: [
            {
              breakpoint: 1024, 
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600, 
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
    };

    return (
        <div className='border'>

            <Slider {...settings}>
                {
                    foods?.map((item) => <CarouselItem key={item} image={item.images[0]} title={item?.name} price={item?.price} />)
                }
            </Slider>

        </div>
    )
}

export default MultiItemCarousel