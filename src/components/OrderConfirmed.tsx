import { useEffect, useState } from "react";

interface DessertImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Dessert {
  image: DessertImage;
  name: string;
  price: number;
  category: string;
}

interface Item extends Dessert {
  image: DessertImage;
  quantity: number;
}

interface Props {
  onClear: () => void;
  onAddedItem: Item[]; // Update this line
}

export default function OrderConfirmed({ onAddedItem, onClear }: Props) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPriceQuantity = onAddedItem.reduce(
      (acc: number, curr: Item) => curr.quantity * curr.price + acc, // Change acc type to number
      0
    );
    setTotalPrice(totalPriceQuantity);
  }, [onAddedItem]);

  return (
    <>
      <section>
        <div className="fixed top-0 left-0 bg-black opacity-60 z-10 w-full h-full"></div>
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-white sm:w-11/12 md:w-6/12 h-auto rounded-lg flex flex-col p-10">
            <div className="flex flex-col">
              <img
                className="w-11 mb-4"
                src="/assets/images/icon-order-confirmed.svg"
                alt="Order Confirmed Icon"
              />
              <h3 className="text-preset-1 font-bold mb-2">Order Confirmed</h3>
              <p className="text-custom-rose-500">
                We hope you enjoy your food!
              </p>
            </div>
            <ul className="bg-custom-rose-50 mt-4 p-4 rounded-lg">
              {onAddedItem.map((item: Item, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center">
                    <img
                      className="w-12 mr-4"
                      src={item.image.thumbnail}
                      alt={item.name}
                    />
                    <div className="text-preset-4">
                      <p className="font-semibold">{item.name}</p>
                      <div className="flex">
                        <p className="text-custom-red font-semibold mr-5">
                          {item.quantity}x
                        </p>
                        <p className="text-custom-rose-500">
                          {Number.isInteger(item.price)
                            ? item.price + ".00"
                            : item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-preset-3 text-custom-rose-900">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </li>
              ))}
              <div className="flex justify-between text-preset-4 py-2">
                <p>Order total: </p>
                <p className="font-bold text-lg text-preset-2 text-custom-rose-900">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </ul>
            <button
              onClick={onClear}
              className="bg-custom-red text-white w-full p-2 mt-4 rounded-full hover:opacity-90 transition-opacity duration-1000"
            >
              Start New Order
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
