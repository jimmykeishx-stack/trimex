import { notFound } from "next/navigation";

const pages: Record<string, [string, string[]]> = {
  platform: ["Infrastructure for a connected agricultural economy.", ["Connected input fulfillment", "Local Agent network", "Agricultural services", "Markets and trade"]],
  farmers: ["Everything farmers need to grow.", ["Discover inputs", "Order and delivery", "Agricultural services", "Market opportunity"]],
  agents: ["Powering the local agricultural network.", ["Receive orders", "Manage inventory", "Serve farmers", "Work with suppliers"]],
  suppliers: ["Helping agricultural suppliers reach the market.", ["Product visibility", "Agent distribution", "Demand intelligence", "Order management"]],
  markets: ["Connecting agricultural production to opportunity.", ["Aggregation", "Market opportunity", "Buyer demand", "Commodity trade"]],
  company: ["Built in Africa. Designed to scale across Africa.", ["African ambition", "Practical technology", "Trusted networks", "Long-term thinking"]],
  partner: ["Build the connected agricultural economy with us.", ["Become an Agent", "Supply the network", "Connect your service", "Explore partnerships"]],
  journal: ["Ideas, intelligence and stories shaping African agriculture.", ["Agricultural insights", "Market analysis", "Input guides", "Trimex stories"]],
};

export function generateStaticParams() { return Object.keys(pages).map((section) => ({ section })); }

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params; const page = pages[section]; if (!page) notFound();
  return <main className="sub"><nav className="subNav"><a className="brand" href="/">TRIMEX <small>INC.</small></a><div><a href="/platform">Platform</a><a href="/farmers">Farmers</a><a href="/agents">Agents</a><a href="/markets">Markets</a></div></nav><header><p className="eyebrow">Trimex {section}</p><h1>{page[0]}</h1><p>Built as part of one connected Trimex platform—simple on the surface, with the right operational depth underneath.</p></header><section className="subContent"><p className="eyebrow">What this unlocks</p><div className="pills">{page[1].map((item,index)=><article key={item}><span>0{index+1}</span><h2>{item}</h2><p>Designed to make the agricultural network work more intelligently together.</p></article>)}</div></section><section className="subCta"><p className="eyebrow light">Trimex Inc.</p><h2>The future of African agriculture will be connected.</h2><a className="button lime" href="mailto:hello@trimex.africa">Partner with Trimex ↗</a></section></main>;
}
