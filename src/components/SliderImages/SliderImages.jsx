import image1 from '../../assets/images/slider/1.jpg';
import image2 from '../../assets/images/slider/2.jpg';
import image3 from '../../assets/images/slider/3.jpg';
import image4 from '../../assets/images/slider/4.jpg';
import image5 from '../../assets/images/slider/5.jpg';
import Slider from "react-slick";

import "./sliderImages.css"

function SliderImages() {

    const images = [
        {id: 1,
        image: image1},
        {id: 2,
        image: image2},
        {id: 3,
        image: image3},
        {id: 4,
        image: image4},
        {id: 5,
        image: image5},
    ];

    console.log(images)

    var settings = {
        className: "slider variable-width",
        dots: false,
        arrows: false,
        infinite: true,
        autoplay:true,
        fade: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
      };

    return (
        <div className="images" key={image1}>
            <img src={image1} alt="" />
        </div>
    )
}

export { SliderImages }