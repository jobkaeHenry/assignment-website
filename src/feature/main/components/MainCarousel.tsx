import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "@emotion/styled";
import banner1 from '../../../assets/banner-1.png'
import banner2 from '../../../assets/banner-2.png'

const MainCarousel = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={false} showStatus={false}>
      <CarouselWarpper src={banner2} />
      <CarouselWarpper src={banner1} />
    </Carousel>
  );
};

export default MainCarousel;

const CarouselWarpper = styled.img`
  width: 100vw;
  height: calc(70vh - 76px);
  display: flex;
  object-fit: cover;
  align-items: center;
  justify-content: center;
`;
