"use client";

import { useMemo, useState } from "react";
import { MarketplaceProductCard } from "@/components/marketplace-product-card";
import { demoCategories, demoProducts } from "@/lib/mock-data";

const money = (value: number) => `KES ${value.toLocaleString()}`;
const catalogueProducts = demoProducts.map((product) => {
  const category = demoCategories.find((item) => item.id === product.categoryId);
  return { ...product, category: category?.name ?? "Agricultural inputs", viewHref: `/marketplace/${category?.slug ?? "seeds"}`, availability: "AVAILABLE" as const };
});

export default function Marketplace() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const filteredProducts = useMemo(() => catalogueProducts.filter((product) => (activeCategory === "all" || product.categoryId === activeCategory) && `${product.name} ${product.category} ${product.applicableCrop}`.toLowerCase().includes(query.toLowerCase())), [activeCategory, query]);
  const items = catalogueProducts.filter((product) => cart[product.id]).map((product) => ({ ...product, quantity: cart[product.id] }));
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const add = (id: string) => setCart((old) => ({ ...old, [id]: (old[id] || 0) + 1 }));
  const change = (id: string, delta: number) => setCart((old) => ({ ...old, [id]: Math.max(0, (old[id] || 0) + delta) }));
  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); localStorage.setItem("trimex-demo-order", JSON.stringify({ number: `TMX-${Math.floor(1000 + Math.random() * 9000)}`, items, total, location: form.get("location"), phone: form.get("phone"), status: "AGENT_ASSIGNED", createdAt: new Date().toISOString() })); setComplete(true); };

  return <main className="shop"><nav className="shopNav"><a className="brand" href="/">TRIMEX <small>INC.</small></a><div><a href="/marketplace">Marketplace</a><a href="/access">Portals</a><a href="/markets">Markets</a></div><button className="cart" onClick={() => setOpen(true)}>Cart <span>{count}</span></button></nav>
    <header className="shopHero"><p className="eyebrow">Trimex Marketplace</p><h1>Inputs for the work ahead.</h1><p>Search, select, order. Trimex handles the fulfilment.</p><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search products and commodities" aria-label="Search agricultural inputs" /></label></header>
    <section className="catalogue" aria-labelledby="featured-products"><div className="catalogueTop"><div><p className="eyebrow">Browse products</p><h2 id="featured-products">Featured products</h2></div><span>{filteredProducts.length} of {catalogueProducts.length} products</span></div><div className="categoryRow" aria-label="Product categories"><button className={activeCategory === "all" ? "active" : ""} onClick={() => setActiveCategory("all")}>All products</button>{demoCategories.map((category) => <button className={activeCategory === category.id ? "active" : ""} onClick={() => setActiveCategory(category.id)} key={category.id}>{category.name}</button>)}</div><div className="productGrid">{filteredProducts.map((product) => <MarketplaceProductCard key={product.id} product={product} onAdd={add} />)}</div>{!filteredProducts.length && <div className="catalogueState"><strong>No products found</strong><p>Try another search term or browse all product categories.</p><button className="productButton primary" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Show all products</button></div>}</section>
    <section className="shopPromise"><p className="eyebrow light">The Trimex promise</p><h2>You choose the product. We handle the network.</h2><div><span>01<br /><b>Find inputs</b></span><span>02<br /><b>Place your order</b></span><span>03<br /><b>Receive delivery</b></span></div></section>
    {open && <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping cart"><div className="drawerHead"><div><p className="eyebrow">Your order</p><h2>Cart ({count})</h2></div><button aria-label="Close cart" onClick={() => setOpen(false)}>×</button></div>{complete ? <div className="confirmation"><span>✓</span><h3>Order request received.</h3><p>Trimex has assigned the order to an eligible Agent. See how it appears in each portal.</p><div className="confirmationActions"><a className="button lime" href="/farmer">Track as farmer ↗</a><a className="button dark" href="/agent">View Agent order ↗</a></div></div> : <><div className="cartItems">{items.length ? items.map((item) => <div className="cartItem" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{money(item.price)} · {item.unit}</p><div className="quantity"><button onClick={() => change(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button><span>{item.quantity}</span><button onClick={() => change(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button></div></div><strong>{money(item.price * item.quantity)}</strong></div>) : <p className="empty">Your cart is ready when you are.</p>}</div>{items.length > 0 && <form className="checkout" onSubmit={submitOrder}><label>Delivery location<input required name="location" placeholder="Town, ward or farm location" /></label><label>Phone number<input required name="phone" type="tel" placeholder="e.g. 0712 345 678" /></label><div className="total"><span>Order total</span><strong>{money(total)}</strong></div><p>Delivery and fulfilment details are confirmed after Trimex matches your order with the right Agent.</p><button className="button lime" type="submit">Request fulfilment ↗</button></form>}</>}</aside>}{open && <button className="backdrop" aria-label="Close cart" onClick={() => setOpen(false)} />}
  </main>;
}
