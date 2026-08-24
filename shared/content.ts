// The prioritization deck: services to sort into Yes / Maybe / No.

export const FRAMING = {
  intro: "Which of these would you prioritise?",
  question: "Sort each card into Yes, Maybe or No.",
};

export interface PriorityCard {
  id: string;
  name: string;
}

export const CARDS: PriorityCard[] = [
  { id: "workshop", name: "In-person workshop" },
  { id: "scenarios", name: "Learning in scenarios" },
  { id: "elearning", name: "Self-paced e-learning" },
  { id: "hybrid", name: "Hybrid course" },
  { id: "videos", name: "Explanatory videos" },
  { id: "refreshers", name: "Regular refreshers" },
  { id: "microlearning", name: "Microlearning modules" },
  { id: "jobaids", name: "Job aids & cheat sheets" },
  { id: "peer", name: "Peer learning circles" },
  { id: "coaching", name: "Coaching & mentoring" },
  { id: "webinars", name: "Live webinars" },
  { id: "simulations", name: "Interactive simulations" },
];

export const CARD_BY_ID: Record<string, PriorityCard> = Object.fromEntries(CARDS.map((c) => [c.id, c]));

export const GROUPS = ["yes", "maybe", "no"] as const;
export type Group = (typeof GROUPS)[number];
export const GROUP_LABEL: Record<Group, string> = { yes: "Yes", maybe: "Maybe", no: "No" };
