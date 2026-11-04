export function DoodleArrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 220 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 24C45 8 110 4 165 16C178 19 186 21 196 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M178 8C186 13 192 17 197 21C191 24 184 29 180 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleHeart({ className = "" }) {
  return (
    <svg
      viewBox="0 0 60 56"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 50C30 50 4 33.5 4 16.8C4 7.7 11 2 18.5 2C24 2 28 5.3 30 10C32 5.3 36 2 41.5 2C49 2 56 7.7 56 16.8C56 33.5 30 50 30 50Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 24, strokeWidth = 1.25, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DoodleUnderline({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 10C25 4 60 2 92 7C100 8.2 108 10.5 118 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
