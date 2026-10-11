type MarketplaceProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  availability?: "AVAILABLE" | "LOW_STOCK" | "UNAVAILABLE";
  viewHref: string;
};

const money = (value: number) => `KES ${value.toLocaleString()}`;

export function MarketplaceProductCard({ product, onAdd }: { product: MarketplaceProduct; onAdd?: (id: string) => void }) {
  const unavailable = product.availability === "UNAVAILABLE";
  const status = unavailable ? "Unavailable" : product.availability === "LOW_STOCK" ? "Low stock" : "In stock";

  return <article className={`productCard${unavailable ? " isUnavailable" : ""}`}>
    <div className="productImage"><img src={product.image} alt={product.name} /><span>{status}</span></div>
    <div className="productInfo">
      <p>{product.category}</p><h3>{product.name}</h3>
      <div className="productPrice"><strong>{money(product.price)}</strong><small>per {product.unit}</small></div>
      <div className={`productActions${onAdd ? "" : " singleAction"}`}><a className="productButton secondary" href={product.viewHref}>View product</a>{onAdd && <button className="productButton primary" disabled={unavailable} onClick={() => onAdd(product.id)}>{unavailable ? "Unavailable" : "Add to cart"}</button>}</div>
    </div>
  </article>;
}
