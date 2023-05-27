import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "@emotion/styled";

const MainCarousel = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={false}>
      <CarouselWarpper>안녕</CarouselWarpper>
      <CarouselWarpper>안녕</CarouselWarpper>
    </Carousel>
  );
};

export default MainCarousel;

const CarouselWarpper = styled.div`
  width: 100%;
  height: calc(90vh - 76px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
