const platformLayers = [
  ["Inputs", "Quality agricultural products, available through a trusted local supply network."],
  ["Services", "Field support, finance, logistics and practical guidance that keep farmers moving."],
  ["Markets", "Clearer demand, better price discovery and more reliable routes to buyers."],
  ["Trade", "Aggregation, quality assurance and fulfilment for commodity buyers and partners."],
  ["Intelligence", "Useful data that helps every part of the network make better decisions."],
];

export default function AboutPage() {
  return (
    <main className="about aboutFull">
      <section className="aboutHero">
        <video className="video" autoPlay muted loop playsInline>
          <source src="/hero-page.mp4" type="video/mp4" />
        </video>
        <div className="veil" />
        <nav className="shopNav aboutNav">
          <a className="brand" href="/">TRIMEX <small>INC.</small></a>
          <div>
            <a href="/marketplace">Marketplace</a>
            <a href="/procurement">For businesses</a>
            <a href="/journal">Journal</a>
          </div>
          <a className="navButton" href="/auth">Create account ↗</a>
        </nav>
        <div className="aboutHeroContent">
          <p className="eyebrow light">About Trimex</p>
          <h1>Feeding Africa and the World.</h1>
          <p>Trimex is building the commercial and digital infrastructure that connects African agriculture—from a farmer&apos;s field to local trade and global markets.</p>
          <a className="button lime" href="/marketplace">Explore the marketplace ↗</a>
        </div>
      </section>

      <section className="aboutIntro">
        <p className="eyebrow">Who we are</p>
        <div>
          <h2>A connected agricultural economy, built around the people doing the work.</h2>
          <p>Across Africa, farmers, agents, suppliers and buyers each solve a different part of the agricultural journey. Trimex brings those parts closer together so commerce can be more transparent, dependable and useful for everyone involved.</p>
          <p>We are not just a storefront. We are a network for accessing inputs, coordinating services, moving commodities and creating better routes to market.</p>
        </div>
      </section>

      <section className="aboutVision">
        <article><p className="eyebrow">Our mission</p><h2>Make agricultural commerce work better—from product discovery to fulfilment, aggregation and market access.</h2></article>
        <article><p className="eyebrow">Our vision</p><p>Africa&apos;s agricultural economy should be connected, trusted and ready to compete at scale. Every participant should have a clearer path to opportunity.</p></article>
      </section>

      <section className="aboutNetworkSection">
        <p className="eyebrow">The Trimex network</p>
        <h2>Designed around real agricultural relationships.</h2>
        <p className="sectionLead">Trimex supports the ecosystem rather than replacing it: local agents stay local, suppliers reach demand, and farmers gain stronger options for inputs, services and markets.</p>
        <div className="aboutNetworkGrid">
          <div className="networkNode"><b>01</b><h3>Farmers</h3><p>Access inputs, expertise and routes to market.</p></div>
          <div className="networkNode"><b>02</b><h3>Agents</h3><p>Serve communities with tools to sell, support and coordinate.</p></div>
          <div className="networkCore"><span>THE</span><strong>TRIMEX</strong><small>PLATFORM</small></div>
          <div className="networkNode"><b>03</b><h3>Suppliers</h3><p>Place trusted products where farmers need them.</p></div>
          <div className="networkNode"><b>04</b><h3>Markets & buyers</h3><p>Source quality commodities through a more visible network.</p></div>
        </div>
      </section>

      <section className="aboutLayers">
        <div><p className="eyebrow">How Trimex works</p><h2>One platform, from the first input to the final market.</h2></div>
        <div className="layerList">{platformLayers.map(([title, description], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="aboutPeople">
        <article><p className="eyebrow">For farmers</p><h2>More confidence for every growing season.</h2><p>Find products, compare choices, request support and build relationships that continue beyond a single transaction.</p><a href="/farmers">Explore farmer tools ↗</a></article>
        <article><p className="eyebrow">For agents</p><h2>Local commerce, strengthened by better tools.</h2><p>Agents are the human infrastructure of agriculture. Trimex gives them ways to manage demand, serve clients and grow their businesses.</p><a href="/agents">Explore the agent network ↗</a></article>
        <article><p className="eyebrow">For suppliers</p><h2>A trusted way to reach the field.</h2><p>Bring verified products into the network and get closer to the farming communities that depend on them.</p><a href="/suppliers">Partner with Trimex ↗</a></article>
      </section>

      <section className="aboutTrade">
        <div><p className="eyebrow light">Markets and trade</p><h2>From fragmented supply to dependable trade.</h2><p>Trimex connects the production side of agriculture with buyers who need clearer quality, aggregation and fulfilment.</p></div>
        <ol><li>Production</li><li>Aggregation</li><li>Quality & logistics</li><li>Buyers & markets</li></ol>
      </section>

      <section className="aboutScale">
        <p className="eyebrow">Built for African scale</p>
        <h2>Digital infrastructure should make the physical economy easier to navigate.</h2>
        <div><article><strong>Local first</strong><p>Designed for the relationships and realities of agricultural communities.</p></article><article><strong>Trust by design</strong><p>Clearer product, service and trade relationships across the network.</p></article><article><strong>Ready to grow</strong><p>A platform built to connect regions, categories and new market opportunities.</p></article></div>
      </section>

      <section className="aboutJournal"><p className="eyebrow">The Trimex Journal</p><h2>Ideas from the field, the market and the future of food.</h2><a className="textLink" href="/journal">Visit the Journal ↗</a></section>

      <section className="aboutFinal"><p className="eyebrow light">Join the network</p><h2>A stronger agricultural economy is built together.</h2><p>Whether you farm, supply, serve growers or buy commodities, there is a place for you in Trimex.</p><div><a className="button lime" href="/auth">Create account ↗</a><a className="button ghost" href="/marketplace">Browse marketplace</a></div></section>
    </main>
  );
}
