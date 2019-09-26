import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Root, Header, Nav, Content, Footer } from "layout";

const config = {
  navAnchor: "left",
  navVariant: {
    xs: "temporary",
    sm: "persistent",
    md: "permanent",
  },
  navWidth: {
    xs: 240,
    sm: 256,
    md: 256,
  },
  collapsible: {
    xs: false,
    sm: false,
    md: false,
  },
  collapsedWidth: {
    xs: 64,
    sm: 64,
    md: 64,
  },
  clipped: {
    xs: false,
    sm: false,
    md: false,
  },
  headerPosition: {
    xs: "relative",
    sm: "relative",
    md: "relative",
  },
  squeezed: {
    xs: false,
    sm: false,
    md: true,
  },
  footerShrink: {
    xs: false,
    sm: false,
    md: true,
  },
};

const LayoutWrapper = props => {
  const { children } = props;
  return (
    <Root config={config} style={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Header
        menuIcon={{
          inactive: <MenuIcon />,
          active: <ChevronLeftIcon />,
        }}
      >
        이곳은 헤더입니다
      </Header>
      <Nav
        collapsedIcon={{
          inactive: <ChevronLeftIcon />,
          active: <ChevronRightIcon />,
        }}
        //   header={
        //     // you can provide fixed header inside nav
        //     // change null to some react element
        //     ctx => <div>nav header</div>
        //   }
      >
        이곳은 네비게이션입니다
      </Nav>
      <Content>{children}</Content>
      <Footer>이곳은 푸터푸터</Footer>
    </Root>
  );
};

export default LayoutWrapper;
