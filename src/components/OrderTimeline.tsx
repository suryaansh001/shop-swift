import { CheckCircle2, Circle, Package, Truck, CreditCard, ClipboardCheck } from "lucide-react";
import { OrderStatus, ORDER_STATUSES } from "@/data/orders";

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  "Order Received": <ClipboardCheck className="h-5 w-5" />,
  "Payment Verified": <CreditCard className="h-5 w-5" />,
  "Order Packed": <Package className="h-5 w-5" />,
  "Out for Delivery": <Truck className="h-5 w-5" />,
  "Delivered": <CheckCircle2 className="h-5 w-5" />,
};

const OrderTimeline = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-0">
      {ORDER_STATUSES.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={status} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                } ${isActive ? "ring-4 ring-primary/20" : ""}`}
              >
                {statusIcons[status]}
              </div>
              {index < ORDER_STATUSES.length - 1 && (
                <div
                  className={`h-10 w-0.5 ${
                    index < currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
            <div className="pb-8 pt-2">
              <p className={`text-sm font-semibold ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                {status}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
