export default function VerifiedBadge({ size = "md" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${sizes[size]} bg-blue-500 rounded-full flex-shrink-0`}
      title="Verified Celebrity"
    >
      <svg
        className={`${iconSizes[size]} text-white`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
  );
}