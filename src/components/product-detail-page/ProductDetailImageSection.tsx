import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IProductVariant } from "../../interfaces/IProductVariant";

interface ProductDetailImageSectionProps {
  productVariants?: IProductVariant[];
  isLoading?: boolean;
}

export default function ProductDetailImageSection({
  productVariants,
  isLoading,
}: ProductDetailImageSectionProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (isLoading) {
    return ProductDetailImageLoading();
  }

  const handleSlideChange = () => {
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <>
      <div className="sticky top-28 h-fit">
        <img
          className="h-80 w-80 rounded-xl object-cover"
          src={productVariants![imageIndex].imageUrl}
          alt=""
        />
        <div className="relative mt-2 flex w-80">
          <Swiper
            className="w-full"
            slidesPerView={5}
            direction="horizontal"
            spaceBetween={2}
            onSlideChange={handleSlideChange}
            onSwiper={(swiper) => {
              setSwiper(swiper);
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {productVariants?.map((variant, index) => (
              <SwiperSlide key={variant._id}>
                <img
                  onClick={() => setImageIndex(index)}
                  className={`h-16 w-16 cursor-pointer rounded-md object-cover ${index === imageIndex ? "border-2 border-primary" : ""}`}
                  src={variant.imageUrl}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 flex items-center justify-between">
            <button
              onClick={() => swiper.slidePrev()}
              className={`absolute left-0 z-10 rounded-md bg-black bg-opacity-50 p-1 text-white ${isBeginning && "hidden"}`}
            >
              <FaAngleLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => swiper.slideNext()}
              className={`absolute right-0 z-10 rounded-md bg-black bg-opacity-50 p-1 text-white ${isEnd && "hidden"}`}
            >
              <FaAngleRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductDetailImageLoading() {
  return (
    <>
      <div className="">
        <div className="skeleton h-80 w-80 rounded-xl" />
        <div className="relative mt-2 flex w-80">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div
                  className={`skeleton h-14 w-14 cursor-pointer rounded-md object-cover`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
