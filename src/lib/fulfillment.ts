export type AgentCandidate = { id: string; name: string; inventory: number; distanceKm: number; reliability: number; deliveryCapacity: number; price: number; active: boolean };
export type AgentAssignment = AgentCandidate & { score: number; assignmentStatus: "ASSIGNED" | "ACCEPTED" | "REJECTED" };

/** A transparent first-pass ranking model; replace weights, not the workflow, as the network matures. */
export function rankEligibleAgents(candidates: AgentCandidate[], requestedQuantity: number): AgentAssignment[] {
  return candidates.filter((agent) => agent.active && agent.inventory >= requestedQuantity).map((agent) => ({
    ...agent,
    score: Math.round((agent.inventory >= requestedQuantity ? 35 : 0) + Math.max(0, 25 - agent.distanceKm) + agent.reliability * 0.2 + agent.deliveryCapacity * 0.1 + Math.max(0, 15 - agent.price / 100)),
    assignmentStatus: "ASSIGNED" as const,
  })).sort((a, b) => b.score - a.score);
}

export function selectBestAgent(candidates: AgentCandidate[], requestedQuantity: number) { return rankEligibleAgents(candidates, requestedQuantity)[0] ?? null; }
