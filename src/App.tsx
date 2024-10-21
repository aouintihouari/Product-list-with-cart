import { ReactElement, useEffect, useState } from "react";
import Loader from "./components/Loader";
import DessertList from "./components/DessertList";
import Cart from "./components/Cart";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Error to fetch data.");
        const data = await response.json();
        setDesserts(data);
      } catch (error: unknown) {
        console.log(error);
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
      } else {
        return [...previousItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleDecreaseQuantity = (item: Item): void => {
    setAddedItems((previousItems) => {
      const existingItem = previousItems.find(
        (addedItem) => addedItem.name === item.name
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return previousItems.filter(
            (addedItem) => addedItem.name !== item.name
          );
        } else {
          return previousItems.map((addedItem) =>
            addedItem.name === item.name
              ? { ...addedItem, quantity: addedItem.quantity - 1 }
              : addedItem
          );
        }
      }
      return previousItems;
    });
  };

  const handleDeleteItem = (item: Item): void => {
    const filteredItems = addedItems.filter(
      (previousItem) => previousItem.name !== item.name
    );
    setAddedItems(filteredItems);
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
            desserts={desserts}
          />
          <Cart
            totalItems={totalItems}
            addedItems={addedItems}
            onDeleteItem={handleDeleteItem}
          />
        </>
      )}
    </main>
  );
}
