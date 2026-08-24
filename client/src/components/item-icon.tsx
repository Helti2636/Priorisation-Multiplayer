// Hand-drawn object illustrations, one warm style matching the backpack.
// Fixed illustration colours (see training.css :root) so they read in light & dark.

const shapes: Record<string, React.ReactNode> = {
  map: (
    <>
      <path d="M9 13 18 10 30 13 39 10 39 37 30 40 18 37 9 40 Z" fill="#efe2c6" />
      <path d="M18 10 V37" strokeWidth="1.6" />
      <path d="M30 13 V40" strokeWidth="1.6" />
      <path d="M13 31 Q19 23 25 27 T33 19" stroke="#b9542f" strokeWidth="1.8" fill="none" strokeDasharray="2 2.5" />
      <circle cx="33" cy="19" r="2.4" fill="#b9542f" strokeWidth="1.4" />
    </>
  ),
  compass: (
    <>
      <circle cx="24" cy="24" r="15" fill="#d9b25f" />
      <circle cx="24" cy="24" r="10.5" fill="#f6efdd" />
      <path d="M24 15 27 24 24 24 Z" fill="#b9542f" />
      <path d="M24 33 21 24 24 24 Z" fill="#c9925a" />
      <circle cx="24" cy="24" r="1.6" fill="#4a3720" stroke="none" />
    </>
  ),
  flashlight: (
    <>
      <path d="M20 13 28 13 33 5 15 5 Z" fill="#f4e3a3" opacity="0.55" stroke="none" />
      <path d="M18 20 30 20 27 13 21 13 Z" fill="#bd8850" />
      <ellipse cx="24" cy="13" rx="3.4" ry="1.4" fill="#f6e3a0" />
      <rect x="19" y="20" width="10" height="20" rx="2" fill="#9a6b38" />
      <path d="M19 29 H29" />
    </>
  ),
  tent: (
    <>
      <path d="M24 10 42 40 6 40 Z" fill="#8ea262" />
      <path d="M24 19 32 40 16 40 Z" fill="#63723f" />
      <path d="M24 7 V11" />
    </>
  ),
  notebook: (
    <>
      <rect x="13" y="9" width="23" height="30" rx="2" fill="#f4ecd6" />
      <rect x="13" y="9" width="7" height="30" rx="2" fill="#b9542f" />
      <path d="M24 17 H33 M24 23 H33 M24 29 H33" strokeWidth="1.6" />
      <circle cx="16.5" cy="15" r="1" fill="#4a3720" stroke="none" />
      <circle cx="16.5" cy="24" r="1" fill="#4a3720" stroke="none" />
      <circle cx="16.5" cy="33" r="1" fill="#4a3720" stroke="none" />
    </>
  ),
  star: <path d="M24 6 27.6 17 40 18 30 25 33.6 38 24 30.6 14.4 38 18 25 8 18 20.4 17 Z" fill="#e2b24a" />,
  firstaid: (
    <>
      <path d="M18 15 V12 H30 V15" fill="#e9e0cd" />
      <rect x="8" y="15" width="32" height="22" rx="3" fill="#e9e0cd" />
      <path d="M22 20 H26 V24 H30 V28 H26 V32 H22 V28 H18 V24 H22 Z" fill="#c0392b" />
    </>
  ),
  binoculars: (
    <>
      <rect x="9" y="14" width="11" height="4" rx="2" fill="#6f4e28" />
      <rect x="28" y="14" width="11" height="4" rx="2" fill="#6f4e28" />
      <rect x="9" y="16" width="11" height="20" rx="5" fill="#9a6b38" />
      <rect x="28" y="16" width="11" height="20" rx="5" fill="#9a6b38" />
      <path d="M19 20 H29 V25 H19 Z" fill="#9a6b38" />
      <circle cx="14.5" cy="32" r="3" fill="#bcd0d6" />
      <circle cx="33.5" cy="32" r="3" fill="#bcd0d6" />
    </>
  ),
  water: (
    <>
      <rect x="19" y="5" width="10" height="3" rx="1" fill="#4a3720" />
      <rect x="20" y="8" width="8" height="7" fill="#6f9aa0" />
      <rect x="18" y="14" width="12" height="26" rx="4" fill="#6f9aa0" />
      <path d="M18 22 H30" strokeWidth="1.6" />
    </>
  ),
  snacks: (
    <>
      <circle cx="24" cy="27" r="12" fill="#c0392b" />
      <path d="M24 15 V11" />
      <path d="M24 13 q4-3 7-1" fill="#8ea262" stroke="none" />
      <path d="M24 13 q4-3 7-1" />
    </>
  ),
  matches: (
    <>
      <rect x="22" y="18" width="4" height="22" rx="1.5" fill="#caa26a" />
      <path d="M24 8 c3 3 4 5 4 7 a4 4 0 0 1-8 0 c0-2 1-4 4-7 Z" fill="#e07b3a" />
      <path d="M24 12 c1.5 1.5 2 2.6 2 3.6 a2 2 0 0 1-4 0 c0-1 .7-2 2-3.6 Z" fill="#f2c14e" stroke="none" />
    </>
  ),
  boots: (
    <>
      <path d="M17 8 h6 v14 l7 4 c2.5 1.4 2 5 -1 5 H17 a2 2 0 0 1-2-2 V10 a2 2 0 0 1 2-2 Z" fill="#7a5230" />
      <path d="M14 27 H31" strokeWidth="1.8" />
    </>
  ),
  powerbank: (
    <>
      <rect x="15" y="8" width="18" height="32" rx="3" fill="#5a6472" />
      <rect x="19" y="12" width="10" height="4" rx="1" fill="#9aa6b5" />
      <path d="M25 21 20 30 24 30 23 36 29 26 25 26 26 21 Z" fill="#e2b24a" stroke="none" />
      <rect x="21" y="37" width="6" height="3" rx="1" fill="#3a2a1a" />
    </>
  ),
};

export function ItemIcon({ id, size = 46 }: { id: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="#4a3720"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[id] ?? <circle cx="24" cy="24" r="12" fill="#c9925a" />}
    </svg>
  );
}
