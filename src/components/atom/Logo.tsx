import logo from "../../assets/logo.jpg";
const Logo = ({ width = "48px", height = "48px" }) => {
  return <img src={logo} width={width} height={height} alt={"logo"}></img>;
};

export default Logo;
