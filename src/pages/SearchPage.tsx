import { useSearchParams } from "react-router-dom";
import { useSearchProduct } from "../lib/useProductQuery";
import ProductLoadingCard from "../components/cards/ProductLoadingCard";
import ProductCard from "../components/cards/ProductCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const {
    data: products,
    isLoading,
    error,
  } = useSearchProduct(query as string);
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col flex-wrap p-10">
        {isLoading && (
          <div className="mx-auto my-4 flex flex-wrap gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductLoadingCard key={index} />
            ))}
          </div>
        )}
        {products && products.length > 0 && (
          <div className="my-4 flex min-w-[500px] flex-wrap gap-4">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
