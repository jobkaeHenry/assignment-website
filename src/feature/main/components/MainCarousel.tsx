import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "@emotion/styled";

const MainCarousel = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={false} showStatus={false}>
      <CarouselWarpper src="https://d2kchovjbwl1tk.cloudfront.net/vendors/19/assets/image/1685114333408-GG_Banner_Website.jpg" />
      <CarouselWarpper src="https://d2kchovjbwl1tk.cloudfront.net/vendors/19/assets/image/1684890670432-GG_Banner_Website_8.jpg" />
    </Carousel>
  );
};

export default MainCarousel;

const CarouselWarpper = styled.img`
  width: 100vw;
  height: calc(90vh - 76px);
  display: flex;
  object-fit: cover;
  align-items: center;
  justify-content: center;
  /* 모바일에서 드래그시 Swipe로 인해 화면이동이 안되는 이슈로 인해 모바일에선 사이즈를 줄임  */
  @media screen and (max-width: 768px) {
    height: calc(70vh - 76px);
  }
`;
