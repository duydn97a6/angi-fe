interface AiExplanationProps {
  explanation: string;
}

export function AiExplanation({ explanation }: AiExplanationProps) {
  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <p className="flex gap-1.5 text-caption text-gray-600">
        <span>💡</span>
        <span>{explanation}</span>
      </p>
    </div>
  );
}