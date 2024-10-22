import { ReactElement, useEffect, useState } from "react";
import Loader from "./components/Loader";
import DessertList from "./components/DessertList";
import Cart from "./components/Cart";
import OrderConfirmed from "./components/OrderConfirmed";

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

export default function App(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [desserts, setDesserts] = useState<Dessert[] | null>(null);
  const [addedItems, setAddedItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [showOrderConfirmed, setShowOrderConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data: Dessert[] = await response.json();
        setDesserts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Fetch error:", error.message);
        } else {
          console.error("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const total = addedItems.reduce((acc, curr) => acc + curr.quantity, 0);
    setTotalItems(total);
  }, [addedItems]);

  const handleClear = (): void => {
    setAddedItems([]);
    setShowOrderConfirmed(false);
  };

  const handleIncreaseQuantity = (item: Item): void => {
    setAddedItems((previousItems) => {
      const existingItem = previousItems.find(
        (addedItem) => addedItem.name === item.name
      );
      if (existingItem) {
        return previousItems.map((addedItem) =>
          addedItem.name === item.name
            ? { ...addedItem, quantity: addedItem.quantity + 1 }
            : addedItem
        );
      }
      return [...previousItems, { ...item, quantity: 1 }];
    });
  };

  const handleDecreaseQuantity = (item: Item): void => {
    setAddedItems((previousItems) => {
      return previousItems
        .map((addedItem) =>
          addedItem.name === item.name
            ? { ...addedItem, quantity: Math.max(addedItem.quantity - 1, 0) }
            : addedItem
        )
        .filter((addedItem) => addedItem.quantity > 0);
    });
  };

  const handleDeleteItem = (item: Item): void => {
    setAddedItems((previousItems) =>
      previousItems.filter((addedItem) => addedItem.name !== item.name)
    );
  };

  const handleOpenOrderConfirmed = (): void => {
    setShowOrderConfirmed(true);
  };

  return (
    <main className="grid grid-cols-1 lg:flex lg:justify-around p-10 lg:p-20 w-full">
      {loading ? (
        <Loader />
      ) : (
        <>
          <DessertList
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onDeleteItem={handleDeleteItem}
            onAddedItems={addedItems}
            desserts={desserts ?? []}
          />
          <Cart
            totalItems={totalItems}
            addedItems={addedItems}
            onDeleteItem={handleDeleteItem}
            onOpenOrderConfirmed={handleOpenOrderConfirmed}
          />
          {showOrderConfirmed && (
            <OrderConfirmed onAddedItem={addedItems} onClear={handleClear} />
          )}
        </>
      )}
    </main>
  );
}
