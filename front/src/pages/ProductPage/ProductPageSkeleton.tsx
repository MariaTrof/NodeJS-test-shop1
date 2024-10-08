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
      <rect x="0" y="100" rx="0" ry="0" width="1200" height="50" />
      <rect x="0" y="100" rx="0" ry="0" width="1200" height="200" />
      <rect x="0" y="100" rx="0" ry="0" width="1200" height="350" />
    

    </ContentLoader>
  );
};

export default ProductPageSkeleton;

//можно заменить на любой другой спинер загрузки или поменять под форму самой страницы
