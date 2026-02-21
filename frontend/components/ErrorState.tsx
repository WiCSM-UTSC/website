
type ErrorStateProps = {
  message?: string;
  subtitle?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

function ErrorState({
  message = "Unable to load content at this time. Please try again later!",
  subtitle = "Something went wrong on our end :(",
  onRetry,
  retryLabel = "Try Again",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white/60 rounded-2xl shadow-sm">
      <svg
        className="w-16 h-16 text-[#513C97] mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <span className="text-lg text-gray-700 font-medium mb-2">{message}</span>
      <span className="text-sm text-gray-500 mb-6">{subtitle}</span>
      
    </div>
  );
}

export default ErrorState;
