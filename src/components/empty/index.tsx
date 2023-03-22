import React from "react";

interface IProps {
  text?: string
}

const EmptyData: React.FC<IProps> = ({text = 'No data'}) => {
  return (
    <div className="flex w-full min-h-[300px] flex-col items-center justify-center space-y-4">
      <svg
        className="w-16 h-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 14h6M9 10h6M9 6h6M5 14h.01M5 10h.01M5 6h.01M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      <p className="text-gray-400 text-lg font-medium">{text}</p>
    </div>
  );
};

export default EmptyData;
