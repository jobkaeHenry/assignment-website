import styled from "@emotion/styled";

import MobileWrapper from "../layouts/MobileWrapper";
import Text from "./atom/Text";

const Footer = () => {
  return (
    <FooterWrapper>
      <MobileWrapper>
        <SpaceBetweenWrapper>
          <Text typography="h4" bold color="var(--pure-white)">Contact us</Text>
          <Text typography="h4" bold color="var(--pure-white)">Payment Method</Text>
          <Text typography="h4" bold color="var(--pure-white)">Term of Service</Text>
        </SpaceBetweenWrapper>
      </MobileWrapper>
      <MadeWith
        src="https://shop-static.plugo.world/img/made_with_plugo.0803995.png"
        alt="logo"
      />
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: relative;
  width: 100%;
  min-height: 240px;
  margin-top: 36px;
  padding: 36px;
  background-color: var(--bg-main);
  color: var(--pure-white);
`;

const SpaceBetweenWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
`;

const MadeWith = styled.img`
  position: absolute;
  bottom: 24px;
  left: 24px;
  height: 48px;
`;
