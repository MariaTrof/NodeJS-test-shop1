import { FC } from "react";
import ContentLoader from "react-content-loader";

export interface IProductPageSkeleton {}

const ProductPageSkeleton: FC<IProductPageSkeleton> = ({}) => {
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
      <rect x="0" y="50" rx="0" ry="0" width="1200" height="85" />
      <rect x="0" y="150" rx="0" ry="0" width="300" height="290" />
      <rect x="500" y="150" rx="0" ry="0" width="500" height="30" />
      <rect x="500" y="200" rx="0" ry="0" width="500" height="30" />
      <rect x="500" y="250" rx="0" ry="0" width="500" height="50" />
      <rect x="500" y="320" rx="0" ry="0" width="500" height="80" />
      <rect x="0" y="500" rx="0" ry="0" width="500" height="40" />
      <rect x="0" y="550" rx="0" ry="0" width="900" height="40" />
      <rect x="0" y="605" rx="0" ry="0" width="1200" height="70" />
      <rect x="0" y="685" rx="0" ry="0" width="1200" height="35" />
      <rect x="0" y="730" rx="0" ry="0" width="230" height="45" />
      <rect x="20" y="730" rx="0" ry="0" width="230" height="45" />
    </ContentLoader>
  );
};

export default ProductPageSkeleton;

//можно заменить на любой другой спинер загрузки или поменять под форму самой страницы
