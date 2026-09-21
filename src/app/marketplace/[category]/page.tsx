import { notFound } from "next/navigation";
import { demoCategories, demoProducts } from "@/lib/mock-data";

export function generateStaticParams() { return demoCategories.map((category) => ({ category: category.slug })); }

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params; const category = demoCategories.find((item) => item.slug === slug); if (!category) notFound(); const products = demoProducts.filter((item) => item.categoryId === category.id);
  return <main className="categoryPage"><nav className="shopNav"><a className="brand" href="/">TRIMEX <small>INC.</small></a><div><a href="/marketplace">Marketplace</a><a href="/about">About Us</a><a href="/auth">Account</a></div><a className="cart" href="/marketplace">Cart (0)</a></nav><header><p>Marketplace / {category.name}</p><h1>{category.name}</h1><span>Browse products available through the Trimex network.</span><form action="/marketplace"><input name="search" placeholder={`Search ${category.name.toLowerCase()}...`} /><button>Search</button></form></header><section><div className="categoryToolbar"><strong>{products.length} products</strong><a href="/marketplace">All products ↗</a></div><div className="productGrid">{products.map((product) => <article className="product" key={product.id}><div className="productImage"><img src={product.image} alt={product.name} /><span>Available</span></div><div className="productInfo"><p>{category.name}</p><h3>{product.name}</h3><small>{product.unit}</small><strong>KES {product.price.toLocaleString()}</strong><a className="catalogueButton" href="/marketplace">View & add to cart ↗</a></div></article>)}</div></section></main>;
}
