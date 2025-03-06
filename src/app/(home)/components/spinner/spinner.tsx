import { ColorRing } from "react-loader-spinner";

const  ButtonSpinner=()=> {
  return (
    <ColorRing
      visible={true}
      height="25"
      width="25"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  );
}

export default ButtonSpinner;
