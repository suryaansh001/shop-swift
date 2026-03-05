export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentScreenshot?: string;
  date: string;
}

export type OrderStatus = 
  | "Order Received"
  | "Payment Verified"
  | "Order Packed"
  | "Out for Delivery"
  | "Delivered";

export const ORDER_STATUSES: OrderStatus[] = [
  "Order Received",
  "Payment Verified",
  "Order Packed",
  "Out for Delivery",
  "Delivered",
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-2026-1042",
    customerName: "Amit Verma",
    email: "amit@example.com",
    phone: "9876543210",
    address: "42, MG Road, Indore, MP 452001",
    items: [
      { productId: "p1", name: "Copper Electrical Cable", price: 1250, quantity: 3, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
      { productId: "p4", name: "High Voltage Insulator", price: 450, quantity: 10, image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=400&fit=crop" },
    ],
    total: 8250,
    status: "Payment Verified",
    date: "2026-03-01",
  },
  {
    id: "ORD-2026-1043",
    customerName: "Priya Sharma",
    email: "priya@example.com",
    phone: "9123456780",
    address: "15, Nehru Nagar, Bhopal, MP 462003",
    items: [
      { productId: "p5", name: "Control Panel Kit", price: 5600, quantity: 1, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop" },
    ],
    total: 5600,
    status: "Order Received",
    date: "2026-03-03",
  },
  {
    id: "ORD-2026-1044",
    customerName: "Suresh Traders",
    email: "suresh@traders.com",
    phone: "9988776655",
    address: "Shop 7, Industrial Area, Jabalpur, MP",
    items: [
      { productId: "p3", name: "Transformer Oil", price: 3200, quantity: 2, image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop" },
      { productId: "p6", name: "PVC Wiring Roll", price: 1100, quantity: 5, image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=400&h=400&fit=crop" },
    ],
    total: 11900,
    status: "Delivered",
    date: "2026-02-25",
  },
  {
    id: "ORD-2026-1045",
    customerName: "Rajesh Electricals",
    email: "rajesh@elec.com",
    phone: "9112233445",
    address: "Main Market, Ujjain, MP 456001",
    items: [
      { productId: "p2", name: "Industrial Switchboard", price: 850, quantity: 4, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop" },
    ],
    total: 3400,
    status: "Out for Delivery",
    date: "2026-02-28",
  },
];

export const sampleCredits = [
  {
    id: "c1",
    customerName: "Rajesh Traders",
    email: "rajesh@traders.com",
    phone: "9876501234",
    creditLimit: 100000,
    creditUsed: 40000,
    status: "Active" as const,
    transactions: [
      { date: "2026-02-15", orderId: "ORD-2026-1030", amount: 25000, type: "Credit" as const },
      { date: "2026-02-20", orderId: "ORD-2026-1035", amount: 15000, type: "Credit" as const },
      { date: "2026-02-25", orderId: "", amount: 10000, type: "Paid" as const },
    ],
  },
  {
    id: "c2",
    customerName: "Gupta Electronics",
    email: "gupta@elec.com",
    phone: "9988001122",
    creditLimit: 50000,
    creditUsed: 48000,
    status: "Active" as const,
    transactions: [
      { date: "2026-01-10", orderId: "ORD-2026-0990", amount: 28000, type: "Credit" as const },
      { date: "2026-02-05", orderId: "ORD-2026-1020", amount: 20000, type: "Credit" as const },
    ],
  },
  {
    id: "c3",
    customerName: "Patel & Sons",
    email: "patel@sons.com",
    phone: "9556677889",
    creditLimit: 75000,
    creditUsed: 12000,
    status: "Blocked" as const,
    transactions: [
      { date: "2026-03-01", orderId: "ORD-2026-1041", amount: 12000, type: "Credit" as const },
    ],
  },
];
