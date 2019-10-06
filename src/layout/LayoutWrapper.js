import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Root, Header, Nav, Content, Footer } from "layout";
import SelectChannel from "components/SelectChannel";
import ChannelSettingsBtn from "components/ChannelSettingsBtn";
import NavBar from "components/NavBar";

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
        <SelectChannel />
        <ChannelSettingsBtn />
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
      <Footer>
        <NavBar />
      </Footer>
    </Root>
  );
};

export default LayoutWrapper;
