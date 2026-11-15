interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[#F0E5DA]/70 via-[#FAF7F2] to-[#F0E5DA]/70 bg-[length:200%_100%] rounded-2xl ${className}`}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-24 rounded-lg" />
        <Skeleton className="w-10 h-10 rounded-2xl" />
      </div>
      <Skeleton className="h-9 w-32 rounded-xl" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="h-3 w-36 rounded-md" />
      </div>
    </div>
  );
}

export function PlatformCardSkeleton() {
  return (
    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E5DA] space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-20 rounded-md" />
        <Skeleton className="h-3 w-12 rounded-md" />
      </div>
      <Skeleton className="h-7 w-24 rounded-lg" />
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}

export function TableSkeletonRows({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-[#F0E5DA]/60">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="p-4">
              {c === 0 ? (
                <div className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-2xl shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3.5 w-28 rounded-md" />
                    <Skeleton className="h-2.5 w-20 rounded-md" />
                  </div>
                </div>
              ) : c === cols - 1 ? (
                <div className="flex justify-center">
                  <Skeleton className="h-7 w-16 rounded-xl" />
                </div>
              ) : (
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function ProgressCardSkeleton() {
  return (
    <div className="p-6 rounded-3xl bg-white border border-[#F0E5DA] shadow-[0_10px_25px_-4px_rgba(37,51,74,0.05)] space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32 rounded-lg" />
        <Skeleton className="h-4 w-16 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-3 w-10 rounded" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
