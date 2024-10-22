import { useEffect, useState } from "react";

export default function Cart({
  totalItems,
  addedItems,
  onDeleteItem,
  onOpenOrderConfirmed,
}) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPriceQuantity = addedItems.reduce(
      (acc, curr) => curr.quantity * curr.price + acc,
      0
    );
    setTotalPrice(totalPriceQuantity);
  }, [addedItems]);

  return (
    <aside className="h-auto w-full lg:w-3/12 lg:ml-5">
      <div className="flex flex-col bg-white p-5 rounded-2xl">
        <h2 className="text-preset-2 text-custom-red font-bold">
          Your Cart ({totalItems})
        </h2>
        {totalItems ? (
          <>
            {addedItems.map((item, index) => (
              <div key={index}>
                <section className="flex justify-between items-center text-preset-4 mt-4">
                  <div>
                    <h3 className="font-semi-bold mb-2">{item.name}</h3>
                    <p>
                      <span className="text-custom-red font-semi-bold mr-4">
                        {item.quantity}x
                      </span>
                      <span className="text-custom-rose-500 mr-4">
                        @ $
                        {Number.isInteger(item.price)
                          ? item.price + ".00"
                          : item.price.toFixed(2)}
                      </span>
                      <span className="text-custom-rose-500 font-semi-bold mr-4">
                        $
                        {Number.isInteger(item.quantity * item.price)
                          ? (item.quantity * item.price).toFixed(2)
                          : item.quantity * item.price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div
                    className="border-2 rounded-full border-custom-rose-400 w-7 h-7 flex justify-center items-center cursor-pointer hover:border-custom-rose-900"
                    onClick={() => onDeleteItem(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                      className="hover:fill-custom-rose-900"
                    >
                      <path
                        fill="#CAAFA7"
                        d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                      />
                    </svg>
                  </div>
                </section>
                <hr className="my-4" />
              </div>
            ))}
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h4 className="text-preset-4 text-custom-rose-900">
                  Order Total
                </h4>
                <p className="text-preset-2 text-custom-rose-900 font-bold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="bg-custom-rose-50 p-4 mt-3 flex justify-around">
                <img
                  src="/assets/images/icon-carbon-neutral.svg"
                  alt="carbon neutral icon"
                />
                <p className="text-preset-4 text-custom-rose-900">
                  This is a <span className="font-bold">carbon-neutral</span>{" "}
                  delivery
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center my-10">
            <img
              src="/assets/images/illustration-empty-cart.svg"
              alt="Empty cart illustration"
            />
            <p className="ml-5 text-center text-preset-4 font-regular text-custom-rose-500">
              Your added items will appear here
            </p>
          </div>
        )}
      </div>
      {totalItems > 0 && (
        <button
          onClick={onOpenOrderConfirmed}
          className="bg-custom-red text-white w-full p-2 mt-4 rounded-full hover:opacity-90 transition-opacity duration-1000"
        >
          Start New Order
        </button>
      )}
    </aside>
  );
}
