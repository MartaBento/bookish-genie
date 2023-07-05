function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin text-3xl">📚</div>
      <div className="ml-2">Starting to cook some recommendations...</div>
    </div>
  );
}

export default LoadingSpinner;
