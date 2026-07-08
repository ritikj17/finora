import { Skeleton } from "@/components/ui/skeleton";

export default function AdvisorLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow flex-1 flex flex-col overflow-hidden mt-4">
        {/* Chat Header */}
        <div className="flex items-center space-x-4 border-b p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-5 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-6 space-y-6 overflow-hidden">
          {/* AI Message */}
          <div className="flex w-full space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-20 w-[400px] rounded-2xl rounded-tl-none" />
            </div>
          </div>
          
          {/* User Message */}
          <div className="flex w-full justify-end space-x-4">
            <Skeleton className="h-12 w-[300px] rounded-2xl rounded-tr-none" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          
          {/* AI Message */}
          <div className="flex w-full space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-[150px] w-[500px] rounded-2xl rounded-tl-none" />
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-muted/20">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-12 flex-1 rounded-md" />
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
