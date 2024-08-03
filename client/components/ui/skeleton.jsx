import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />);
}

const InitialSkeleton = () => (
  <div className="rounded px-8 pt-6 pb-8 sm:w-[500px] w-full flex flex-col justify-center items-center">
    <Skeleton className="flex bg-gray-200 py-3 justify-center px-8 items-center mt-5 mb-8 w-80 h-10" />
    <div className='flex justify-center items-center sm:w-full mb-6 w-1/2'>
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="px-4 text-gray-200">or</span>
        <div className="flex-grow border-t border-gray-200"></div>
    </div>
    <Skeleton className="w-72 h-10 mb-5" />
    <Skeleton className="w-72 h-10 mb-3" />
    <Skeleton className="w-72 h-10 mb-3" />
    <Skeleton className="w-32 h-10 mb-5" />
  </div>

);

export { InitialSkeleton, Skeleton }
