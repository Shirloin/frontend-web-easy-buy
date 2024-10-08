import { useGetTransactionByUser } from "../../lib/useTransactionQuery";
import OrderCard from "../cards/OrderCard";

export default function OrderSection() {
  const { data: orders, isLoading } = useGetTransactionByUser();
  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} state="User" />
        ))}
      </div>
    </>
  );
}
