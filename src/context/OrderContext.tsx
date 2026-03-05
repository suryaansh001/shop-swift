import React, { createContext, useContext, useState, ReactNode } from "react";
import { Order, OrderStatus, sampleOrders } from "@/data/orders";
import { CartItem } from "./CartContext";

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => string;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

let orderCounter = 1046;

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const id = `ORD-2026-${orderCounter++}`;
    const newOrder: Order = {
      ...order,
      id,
      date: new Date().toISOString().split("T")[0],
      status: "Order Received",
    };
    setOrders((prev) => [newOrder, ...prev]);
    return id;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
