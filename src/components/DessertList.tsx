import { ReactElement } from "react";
import DessertItem from "./DessertItem";

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
  desserts: Dessert[];
  onAddedItems: Item[];
  onIncreaseQuantity: (item: Dessert) => void;
  onDecreaseQuantity: (item: Dessert) => void;
  onDeleteItem: (item: Dessert) => void;
}

export default function DessertList({
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDeleteItem,
  onAddedItems,
  desserts,
}: Props): ReactElement {
  return (
    <section className="w-full lg:w-9/12">
      <h1 className="text-preset-1 font-bold mb-4">Desserts</h1>
      <section className="grid gap-10 grid-cols-1 sm:grid-cols-3">
        {desserts.map((dessert) => (
          <DessertItem
            key={dessert.name}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
            onDeleteItem={onDeleteItem}
            onAddedItems={onAddedItems}
            dessert={dessert}
          />
        ))}
      </section>
    </section>
  );
}
