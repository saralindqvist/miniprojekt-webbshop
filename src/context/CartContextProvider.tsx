import { createContext, FC, useContext, useState } from "react";
import { useLocalStorageState } from "../components/hooks/useLocalStorageState";
import { ProductData } from "../ProductData";
import { ShippingProvider } from "../ShippingProviderData";

export interface ItemData extends ProductData {
  quantity: number;
}
interface ContextValue {
  cart: ItemData[];
  shipper: ShippingProvider;
  paymentMethod: String;
  addToCart: (product: ProductData) => void;
  onAddQuantity: (product: ItemData) => void;
  onReduceQuantity: (product: ItemData) => void;
  removeFromCart: (product: ItemData) => void;
  emptyCart: () => void;
  selectShippment: (provider: ShippingProvider) => void;
  selectPaymentMethod: (method: String) => void;
}

export const CartContext = createContext<ContextValue>({
  cart: [],
  shipper: {
    providerName: "",
    cost: 0,
    deliveryTime: "",
  },
  paymentMethod: "",
  addToCart: () => {},
  onAddQuantity: () => {},
  onReduceQuantity: () => {},
  removeFromCart: () => {},
  emptyCart: () => {},
  selectShippment: () => {},
  selectPaymentMethod: () => "",
});

const CartProvider: FC = (props) => {
  const [cart, setCart] = useLocalStorageState<ItemData[]>([], "cc-cart");
  const [shipper, setShipper] = useState<ShippingProvider>({
    providerName: "Postnord",
    cost: 495,
    deliveryTime: "3-5 Weekdays",
  });
  const [paymentMethod, setPaymentMethod] = useState<String>("");

  const addToCart = async (product: ProductData) => {
    if (cart.some((item) => item.id === product.id)) {
      const updatedCart = cart.map((item) => {
        if (product.id !== item.id) return item;
        return { ...item, quantity: item.quantity + 1 };
      });
      setCart(updatedCart); // update to LS
    } else {
      const cartItem: ItemData = { ...product, quantity: 1 };
      setCart([...cart, cartItem]);
    }
  };

  const onAddQuantity = (product: ItemData) => {
    const updatedQuantity = cart.map((item) => {
      if (product.id !== item.id) return item;
      return { ...item, quantity: item.quantity + 1 };
    });
    setCart(updatedQuantity);
  };

  const onReduceQuantity = (product: ItemData) => {
    const updatedQuantity = cart.map((item) => {
      if (product.id === item.id && item.quantity > 1)
        return { ...item, quantity: item.quantity - 1 };
      return item;
    });
    setCart(updatedQuantity);
  };

  const removeFromCart = (product: ItemData) => {
    if (cart.find((item) => item.id === product.id)) {
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
    }
  };

  const emptyCart = () => {
    setCart([]);
  };

  const selectShippment = (provider: ShippingProvider) => {
    setShipper(provider);
  };

  const selectPaymentMethod = (method: String) => {
    setPaymentMethod(method);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        shipper,
        paymentMethod,
        addToCart,
        onAddQuantity,
        onReduceQuantity,
        removeFromCart,
        emptyCart,
        selectShippment,
        selectPaymentMethod,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
