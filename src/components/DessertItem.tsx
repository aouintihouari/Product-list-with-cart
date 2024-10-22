import { ReactElement, useEffect, useState } from "react";

interface DessertImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Dessert {
  image: DessertImage;
  name: string;
  category: string;
  price: number;
}

interface Item {
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  onIncreaseQuantity: (item: Dessert) => void;
  onDecreaseQuantity: (item: Dessert) => void;
  onDeleteItem: (item: Dessert) => void;
  onAddedItems: Item[];
  dessert: Dessert;
}

export default function DessertItem({
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDeleteItem,
  onAddedItems,
  dessert,
}: Props): ReactElement {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [itemQuantity, setItemQuantity] = useState<number>(0);

  useEffect(() => {
    const item = onAddedItems.find((item) => item.name === dessert.name);
    setItemQuantity(item ? item.quantity : 0);
  }, [onAddedItems, dessert.name]);

  function handleSelect(): void {
    setIsActive(true);
    onIncreaseQuantity(dessert);
  }

  function handleDeselect(): void {
    setIsActive(false);
  }

  function handleIncrease(): void {
    onIncreaseQuantity(dessert);
  }

  function handleDecrease(): void {
    if (itemQuantity <= 1) {
      handleDeselect();
      onDeleteItem(dessert);
    } else {
      onDecreaseQuantity(dessert);
    }
  }

  return (
    <section className="flex flex-col">
      <div className="relative">
        <picture>
          <source srcSet={dessert.image.desktop} media="(min-width: 1024px)" />
          <source srcSet={dessert.image.tablet} media="(min-width: 768px)" />
          <source srcSet={dessert.image.mobile} media="(min-width: 767px)" />
          <img
            className={`w-full rounded-xl border-2 ${
              isActive && itemQuantity > 0 ? "border-custom-red" : ""
            }`}
            src={dessert.image.mobile}
            alt="Dessert"
            title="Dessert"
          />
        </picture>
        <div className="w-full flex justify-center">
          {isActive && itemQuantity > 0 ? (
            <div className="absolute -bottom-4 flex justify-between items-center bg-custom-red w-6/12 p-2 rounded-3xl border-2 border-custom-rose-400 hover:opacity-95 transition-opacity duration-1000">
              <div
                onClick={handleDecrease}
                className="flex justify-center items-center border-white border-2 rounded-full w-300 h-300 cursor-pointer"
              >
                <img
                  src="../assets/images/icon-decrement-quantity.svg"
                  alt="Decrease Quantity"
                />
              </div>
              <p className="text-preset-4 font-semi-bold text-white">
                {itemQuantity}
              </p>
              <div
                onClick={handleIncrease}
                className="flex justify-center items-center border-white border-2 rounded-full w-300 h-300 cursor-pointer"
              >
                <img
                  src="../assets/images/icon-increment-quantity.svg"
                  alt="Increase Quantity"
                />
              </div>
            </div>
          ) : (
            <button
              onClick={handleSelect}
              className="absolute -bottom-4 flex justify-center items-center bg-white w-6/12 p-2 rounded-3xl border-2 border-custom-rose-400"
            >
              <img
                className="mr-2"
                src="../assets/images/icon-add-to-cart.svg"
                alt="Add to Cart"
              />
              <p className="text-preset-4 font-semi-bold">Add to Cart</p>
            </button>
          )}
        </div>
      </div>
      <ul className="flex flex-col my-8">
        <li className="text-preset-4 text-custom-rose-500">
          {dessert.category}
        </li>
        <li className="text-preset-3 text-custom-rose-900 font-bold">
          {dessert.name}
        </li>
        <li className="text-preset-3 text-custom-red font-semi-bold">
          $
          {Number.isInteger(dessert.price)
            ? `${dessert.price}.00`
            : `${dessert.price.toFixed(2)}`}
        </li>
      </ul>
    </section>
  );
}
