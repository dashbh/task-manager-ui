export default function TaskCardSkeleton() {
  return (
    <article className="min-h-[150px] md:min-h-[90px] md:items-center flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 px-4 py-3 bg-white rounded-lg shadow-sm animate-pulse">
      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4" />

      {/* Description */}
      <div className="h-4 bg-gray-200 rounded w-full" />

      {/* Status */}
      <div className="h-4 bg-gray-200 rounded w-1/2" />

      {/* Due Date */}
      <div className="h-4 bg-gray-200 rounded w-1/2" />

      {/* Actions */}
      <div className="flex gap-3">
        <div className="h-4 bg-gray-200 rounded w-10" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>
    </article>
  );
}
