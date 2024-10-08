import { IoTrashOutline } from "react-icons/io5";
import { ICartItem } from "../../interfaces/ICartItem";
import { formatNumber } from "../../util/Util";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCartStore } from "../../hooks/useCartStore";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  useDeleteCartItem,
  useUpdateCartQuantity,
} from "../../lib/useCartQuery";
import { ICart } from "../../interfaces/ICart";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface CartItemCardProps {
  cart: ICart;
  item: ICartItem;
}

export default function CartItemCard({ cart, item }: CartItemCardProps) {
  const {
    cartItems,
    toggleItemSelection,
    setQuantity,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
  } = useCartStore();
  const updateCartQuantity = useUpdateCartQuantity();
  const deleteCartItem = useDeleteCartItem();
  const [error, setError] = useState("");
  const actionRef = useRef<HTMLDivElement>(null);

  const cartItem = cartItems.find(
    (c) => c.cart._id === cart._id && c.item._id === item._id,
  );

  const validate = useCallback(
    (quantity: number) => {
      if (quantity === undefined) return;

      if (quantity < 1) {
        setError("Quantity must be at least 1");
      } else if (quantity > item.variant.stock) {
        setError("Quantity must be lower than total stock");
      } else {
        setError("");
      }
    },
    [item.variant.stock],
  );

  const updateQuantity = useCallback(async () => {
    const itemId = item._id;
    const cartId = cart._id;
    try {
      await updateCartQuantity.mutateAsync({
        cartItemId: itemId,
        quantity: cartItem!.quantity,
      });
    } catch (error: any) {
      setQuantity(cartId, itemId, item.quantity);
    } finally {
      setError("");
    }
  }, [
    cartItem,
    updateCartQuantity,
    item._id,
    cart._id,
    item.quantity,
    setQuantity,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        updateQuantity();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updateQuantity]);

  const onQuantityChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    const cartId = cart._id;
    const itemId = item._id;
    setQuantity(cartId, itemId, quantity);
    validate(quantity);
  };

  const handleIncrementQuantity = async () => {
    const cartId = cart._id;
    const itemId = item._id;
    incrementCartItem(cartId, itemId);
    validate(cartItem!.quantity);
  };

  const handleDecrementQuantity = async () => {
    const cartId = cart._id;
    const itemId = item._id;
    decrementCartItem(cartId, itemId);
    validate(cartItem!.quantity - 1);
  };

  const handleDeleteCartItem = async () => {
    const cartId = cart._id;
    const itemId = item._id;
    try {
      const message = await deleteCartItem.mutateAsync({ cartItemId: itemId });
      removeCartItem(cartId, itemId);
      toast.success(message!);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex items-start gap-6">
            <input
              type="checkbox"
              className="h-5 w-5 accent-black ring-0"
              checked={cartItem?.isSelected ?? false}
              onChange={() => toggleItemSelection(cart._id, item._id)}
            />
            <Link
              to={`/product/${item.variant.product._id}`}
              className="flex items-start gap-2"
            >
              <img
                className="h-20 w-20 rounded-md object-cover"
                src={item.variant.imageUrl}
                alt=""
              />
              <div className="text-sm font-semibold">
                <p className="text-error">Stock: {item.variant.stock}</p>
                <p>{item.variant.product.name}</p>
                <p>{item.variant.name}</p>
                <p>Rp{formatNumber(item.variant.price)}</p>
              </div>
            </Link>
          </div>
          <p className="font-bold">
            Rp{formatNumber(item.variant.price * (cartItem?.quantity ?? 1))}
          </p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <div ref={actionRef} className="flex items-center justify-end gap-2">
            <button onClick={handleDeleteCartItem}>
              <IoTrashOutline className="h-6 w-6 text-gray-400" />
            </button>
            <div className="flex w-20 items-center justify-between rounded-md px-1 py-0.5 ring-1 ring-gray-500">
              <button
                disabled={!cartItem || cartItem.quantity <= 1}
                onClick={handleDecrementQuantity}
                className={`h-6 w-6 rounded-md ${!cartItem || cartItem.quantity <= 1 ? "cursor-not-allowed text-gray-200 hover:bg-none" : "text-primary hover:bg-gray-200"}`}
              >
                <AiOutlineMinus className="h-4 w-4 self-center" />
              </button>
              <input
                className={`mx-2 w-6 text-center text-sm outline-none ring-0`}
                type="number"
                value={cartItem?.quantity ?? 1}
                onChange={onQuantityChange}
              />
              <button
                disabled={!cartItem || cartItem.quantity >= item.variant.stock}
                onClick={handleIncrementQuantity}
                className={`h-6 w-6 rounded-md ${!cartItem || cartItem.quantity >= item.variant.stock ? "cursor-not-allowed text-gray-200 hover:bg-none" : "text-primary hover:bg-gray-200"}`}
              >
                <AiOutlinePlus className="h-4 w-4 self-center" />
              </button>
            </div>
          </div>
          <p className="text-xs font-semibold text-error">{error}</p>
        </div>
      </div>
    </>
  );
}

export function CartItemLoading() {
  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="skeleton h-6 w-6" />
            <div className="flex items-start gap-2">
              <div className="skeleton h-20 w-20 rounded-md" />
              <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-4 w-32" />
              </div>
            </div>
          </div>
          <p className="skeleton h-4 w-20"></p>
        </div>
        <div className="skeleton h-8 w-20 self-end"></div>
      </div>
    </>
  );
}
