import { OrderDetails } from "../../components/orders/OrderDetails";

export default function OrderDetailsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">
          View full information about this order
        </p>
      </div>

      <OrderDetails />
    </section>
  );
}