import { RotatingTriangles } from "react-loader-spinner";

const Loader = ({ height = 100, width = 100 }: LoaderProps) => {
  return (
    <RotatingTriangles
      visible={true}
      height={height}
      width={width}
      ariaLabel="rotating-triangels-loading"
      wrapperStyle={{}}
      wrapperClass="rotating-triangels-wrapper"
    />
  );
};

export default Loader;
