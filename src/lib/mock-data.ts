/**
 * Temporary in-memory data for UI development. Replace these exports with repository/API calls
 * when the database is connected; IDs and relationships intentionally mirror the planned schema.
 */
export const demoUsers = {
  farmer: { id: "usr_farmer_001", role: "FARMER", name: "Esther Akinyi", phone: "+254 712 345 678", location: "Maseno, Kisumu County" },
  agent: { id: "usr_agent_001", role: "AGENT", name: "Kisumu Farm Supply", contactName: "David Ouma", phone: "+254 711 410 220", location: "Kisumu, Kenya", serviceRadiusKm: 35, reliability: 96 },
  supplier: { id: "usr_supplier_001", role: "SUPPLIER", name: "East Africa Seed Co.", contactName: "Mercy Wanjiru", location: "Nairobi, Kenya" },
};

export const demoCategories = [
  { id: "cat_grains", name: "Grains & Commodities", slug: "grains" },
  { id: "cat_seeds", name: "Seeds", slug: "seeds" }, { id: "cat_fertilizer", name: "Fertilizers & Plant Nutrition", slug: "fertilizers" },
  { id: "cat_protection", name: "Crop Protection", slug: "crop-protection" }, { id: "cat_livestock", name: "Livestock", slug: "livestock" },
  { id: "cat_equipment", name: "Farm Equipment", slug: "equipment" },
];

export const demoProducts = [
  { id: "prd_white_maize", name: "White Maize", slug: "white-maize", categoryId: "cat_grains", brand: "Trimex Commodity Network", unit: "50 kg bag", price: 3100, image: "/white-maize.png", applicableCrop: "Grain", description: "Clean, graded white maize available for household, trade and institutional sourcing.", bulkAvailable: true },
  { id: "prd_beans_bulk", name: "Dry Beans", slug: "dry-beans", categoryId: "cat_grains", brand: "Trimex Commodity Network", unit: "90 kg bag", price: 9900, image: "/beans-and-pulses.png", applicableCrop: "Pulses", description: "Quality graded beans sourced through the Trimex agricultural network.", bulkAvailable: true },
  { id: "prd_h614", name: "Maize Seed H614", slug: "maize-seed-h614", categoryId: "cat_seeds", brand: "East Africa Seed Co.", unit: "2 kg pack", price: 650, image: "/white-maize.png", applicableCrop: "Maize", description: "High-performing maize seed suited to Kenya's mid-altitude growing zones." },
  { id: "prd_greengrams", name: "Green Grams", slug: "green-grams", categoryId: "cat_seeds", brand: "Trimex Select", unit: "1 kg pack", price: 420, image: "/greengrams.png", applicableCrop: "Pulses", description: "Quality green gram seed for reliable establishment and market-ready harvests." },
  { id: "prd_sorghum", name: "Sorghum Seed", slug: "sorghum-seed", categoryId: "cat_seeds", brand: "East Africa Seed Co.", unit: "1 kg pack", price: 380, image: "/sorghum.png", applicableCrop: "Sorghum", description: "Drought-resilient sorghum seed for productive dryland farming." },
  { id: "prd_sunflower", name: "Sunflower Seed", slug: "sunflower-seed", categoryId: "cat_seeds", brand: "Trimex Select", unit: "1 kg pack", price: 720, image: "/sunflower.png", applicableCrop: "Sunflower", description: "Selected sunflower seed for oilseed production." },
  { id: "prd_beans", name: "Beans & Pulses", slug: "beans-pulses", categoryId: "cat_seeds", brand: "Trimex Select", unit: "1 kg pack", price: 540, image: "/beans-and-pulses.png", applicableCrop: "Beans", description: "Certified bean and pulse seed for diverse farm production." },
];

export const demoInventory = [
  { id: "inv_001", agentId: "usr_agent_001", productId: "prd_h614", quantity: 82, lowStockThreshold: 20, price: 650, status: "AVAILABLE" },
  { id: "inv_002", agentId: "usr_agent_001", productId: "prd_greengrams", quantity: 14, lowStockThreshold: 20, price: 420, status: "LOW_STOCK" },
  { id: "inv_003", agentId: "usr_agent_001", productId: "prd_sorghum", quantity: 46, lowStockThreshold: 15, price: 380, status: "AVAILABLE" },
];

export const demoOrder = {
  id: "ord_tmx_1024", number: "TMX-1024", farmerId: "usr_farmer_001", status: "PROCESSING", deliveryAddress: "Maseno, Kisumu County", createdAt: "2026-09-10T08:35:00.000Z", fulfillmentDeadline: "2026-09-10T16:30:00.000Z",
  items: [{ id: "item_001", productId: "prd_h614", quantity: 10, unitPrice: 650, total: 6500 }], total: 6500,
};

export const demoAssignment = { id: "assign_001", orderId: "ord_tmx_1024", agentId: "usr_agent_001", score: 67, distanceKm: 7, status: "ACCEPTED", assignedAt: "2026-09-10T08:37:00.000Z", acceptedAt: "2026-09-10T08:39:00.000Z" };

export const demoOrderEvents = [
  { id: "evt_001", status: "PENDING", actor: "Farmer", at: "2026-09-10T08:35:00.000Z" }, { id: "evt_002", status: "AGENT_ASSIGNED", actor: "Trimex fulfillment engine", at: "2026-09-10T08:37:00.000Z" },
  { id: "evt_003", status: "ACCEPTED", actor: "Kisumu Farm Supply", at: "2026-09-10T08:39:00.000Z" }, { id: "evt_004", status: "PROCESSING", actor: "Kisumu Farm Supply", at: "2026-09-10T09:10:00.000Z" },
];

export const demoMarketListings = [
  { id: "mkt_001", commodity: "Maize", location: "Kisumu County", quantity: "120 bags", askingPrice: "KES 4,600 / 90 kg bag", status: "OPEN" },
  { id: "mkt_002", commodity: "Green Grams", location: "Makueni County", quantity: "2.5 tonnes", askingPrice: "KES 155 / kg", status: "OPEN" },
  { id: "mkt_003", commodity: "Sorghum", location: "Siaya County", quantity: "80 bags", askingPrice: "KES 3,900 / 90 kg bag", status: "OPEN" },
];

export const demoJournalArticles = [
  { id: "art_001", slug: "connected-future-agricultural-trade", title: "The connected future of agricultural trade", category: "Markets", author: "Trimex Journal", excerpt: "Why the systems around the farm matter as much as the farm itself.", publishedAt: "2026-09-06" },
  { id: "art_002", slug: "why-fulfillment-is-infrastructure", title: "Why fulfillment is infrastructure", category: "Insights", author: "Trimex Journal", excerpt: "The local networks that turn a product catalogue into practical access.", publishedAt: "2026-08-29" },
  { id: "art_003", slug: "networks-closer-to-farm", title: "Building networks that work closer to the farm", category: "Farmers", author: "Trimex Journal", excerpt: "A farmer-first view of agricultural technology infrastructure.", publishedAt: "2026-08-15" },
];

export const demoDashboardMetrics = { agent: { newOrders: 1, processing: 4, lowStock: 2, monthlyRevenue: 184500 }, farmer: { activeOrders: 1, completedOrders: 6, savedProducts: 4 } };
