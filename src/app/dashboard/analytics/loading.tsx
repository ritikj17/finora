import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-8 w-[120px] mb-2" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow p-6">
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[150px] mb-8" />
          <div className="flex items-end justify-between h-[300px] space-x-2">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="w-full bg-primary/20" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
            ))}
          </div>
        </div>
        
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow p-6">
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[150px] mb-8" />
          <div className="flex items-center justify-center h-[300px]">
            <Skeleton className="h-[250px] w-[250px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
