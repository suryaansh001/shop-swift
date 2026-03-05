export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  enabled: boolean;
  inventory: number;
}

export const sampleProducts: Product[] = [
  {
    id: "p1",
    name: "Copper Electrical Cable",
    price: 1250,
    description: "High-quality 2.5mm copper cable, 100m roll. Perfect for residential wiring.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    category: "Cables",
    enabled: true,
    inventory: 150,
  },
  {
    id: "p2",
    name: "Industrial Switchboard",
    price: 850,
    description: "Heavy-duty switchboard with MCB slots. Suitable for commercial installations.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    category: "Switchgear",
    enabled: true,
    inventory: 75,
  },
  {
    id: "p3",
    name: "Transformer Oil",
    price: 3200,
    description: "Premium grade transformer oil, 20L can. Meets IS 335 specifications.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop",
    category: "Oils",
    enabled: true,
    inventory: 40,
  },
  {
    id: "p4",
    name: "High Voltage Insulator",
    price: 450,
    description: "Porcelain disc insulator rated for 11kV. Weather-resistant design.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=400&fit=crop",
    category: "Insulators",
    enabled: true,
    inventory: 200,
  },
  {
    id: "p5",
    name: "Control Panel Kit",
    price: 5600,
    description: "Complete control panel assembly kit with contactors, relays and enclosure.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop",
    category: "Panels",
    enabled: true,
    inventory: 25,
  },
  {
    id: "p6",
    name: "PVC Wiring Roll",
    price: 1100,
    description: "Flame-retardant PVC insulated copper wire, 1.5mm, 90m roll.",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=400&h=400&fit=crop",
    category: "Cables",
    enabled: true,
    inventory: 180,
  },
];
