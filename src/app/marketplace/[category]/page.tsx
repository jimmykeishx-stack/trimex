import { notFound } from "next/navigation";
import { MarketplaceProductCard } from "@/components/marketplace-product-card";
import { demoCategories, demoProducts } from "@/lib/mock-data";

export function generateStaticParams() { return demoCategories.map((category) => ({ category: category.slug })); }

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = demoCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  const products = demoProducts.filter((item) => item.categoryId === category.id).map((product) => ({ ...product, category: category.name, viewHref: "/marketplace", availability: "AVAILABLE" as const }));

  return <main className="categoryPage"><nav className="shopNav"><a className="brand" href="/">TRIMEX <small>INC.</small></a><div><a href="/marketplace">Marketplace</a><a href="/about">About Us</a><a href="/auth">Account</a></div><a className="cart" href="/marketplace">Cart (0)</a></nav><header><p>Marketplace / {category.name}</p><h1>{category.name}</h1><span>Browse products available through the Trimex network.</span><form action="/marketplace"><input name="search" placeholder={`Search ${category.name.toLowerCase()}...`} /><button>Search</button></form></header><section><div className="categoryToolbar"><strong>{products.length} products</strong><a href="/marketplace">All products ↗</a></div>{products.length ? <div className="productGrid">{products.map((product) => <MarketplaceProductCard key={product.id} product={product} />)}</div> : <div className="catalogueState"><strong>No products available yet</strong><p>We are adding verified products to this category. Browse the full marketplace in the meantime.</p><a className="productButton primary" href="/marketplace">Browse marketplace</a></div>}</section></main>;
}
