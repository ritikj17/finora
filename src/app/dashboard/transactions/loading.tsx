import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionsLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="rounded-md border mt-8">
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <Skeleton className="h-9 w-[250px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-9 w-[80px]" />
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-[100px]" />
            ))}
          </div>
          {[1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div key={row} className="flex items-center justify-between py-2 border-b last:border-0">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-5 w-[80px] rounded-full" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ))}
        </div>
        <div className="border-t px-4 py-3 flex items-center justify-between">
          <Skeleton className="h-4 w-[150px]" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-[80px]" />
            <Skeleton className="h-8 w-[80px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
