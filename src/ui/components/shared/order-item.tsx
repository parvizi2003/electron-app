import type { OrderItem } from "@/types";

export function OrderItem({ orderItem }: { orderItem: OrderItem }) {
  return (
    <div className="relative flex items-center gap-x-4 border-b p-4 last:border-b-0">
      {/* <div className="absolute top-0 right-0 bottom-0 left-0"></div> */}
      <img
        src="https://media.dodostatic.net/image/r:292x292/01986452c56379458b20a26023f0790d.avif"
        className="size-12"
      />
      <div>
        <h3 className="mb-2 font-bold">{orderItem.product_name}</h3>
        <div className="flex items-center gap-x-2">
          <span> $ {orderItem.price_at_add}</span>
        </div>
      </div>
    </div>
  );
}
