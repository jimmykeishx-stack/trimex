"use client";

import { useEffect, useState } from "react";

type DemoOrder = { number: string; total: number; location: string; items: { name: string; quantity: number }[] };

export function DemoOrderBanner({ view }: { view: "farmer" | "agent" }) {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  useEffect(() => { const saved = localStorage.getItem("trimex-demo-order"); if (saved) setOrder(JSON.parse(saved)); }, []);
  if (!order) return null;
  return <div className="demoOrder"><span>Live demo order</span><strong>{order.number}</strong><p>{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")} · KES {order.total.toLocaleString()}</p><small>{view === "farmer" ? `Delivery to ${order.location}` : `Fulfill to ${order.location}`}</small></div>;
}
