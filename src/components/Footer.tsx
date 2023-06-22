import styled from "@emotion/styled";

import MobileWrapper from "../layouts/MobileWrapper";
import Text from "./atom/Text";
import { ColumnWrapper } from "../layouts/Wrapper";

const Footer = () => {
  return (
    <FooterWrapper>
      <MobileWrapper>
        <SpaceBetweenWrapper>
          <ColumnWrapper>
            <Text typography="h4" bold color="var(--pure-white)">
              Contact us
            </Text>
            <Text typography="p" bold color="var(--pure-white)">
              1zzangjun@gmail.com
            </Text>
          </ColumnWrapper>
          <ColumnWrapper>
            <Text typography="h4" bold color="var(--pure-white)">
              Payment Method
            </Text>
            <Text typography="p" bold color="var(--pure-white)">
              Cash Only
            </Text>
          </ColumnWrapper>
          <ColumnWrapper>
            <Text typography="h4" bold color="var(--pure-white)">
              Term of services
            </Text>
            <Text typography="p" bold color="var(--pure-white)">
              Feel free to use
            </Text>
          </ColumnWrapper>
        </SpaceBetweenWrapper>
      </MobileWrapper>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: relative;
  width: 100%;
  min-height: 200px;
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
