import { FC } from "react";
import ContentLoader from "react-content-loader";

export interface IProductPageSkeleton {}

const StockSkeleton: FC<IProductPageSkeleton> = ({}) => {
  return (
    <ContentLoader
      speed={2}
      width={1200}
      height={1000}
      viewBox="0 0 1200 1000"
      backgroundColor="rgb(211,211,211)"
      foregroundColor="#ecebeb"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <rect x="0" y="50" rx="0" ry="0" width="1200" height="100" />
      <rect x="0" y="160" rx="0" ry="0" width="1200" height="100" />
      <rect x="0" y="260" rx="0" ry="0" width="1200" height="100" />
      <rect x="0" y="360" rx="0" ry="0" width="1200" height="100" />
      <rect x="0" y="460" rx="0" ry="0" width="1200" height="100" />
    </ContentLoader>
  );
};

export default StockSkeleton;
