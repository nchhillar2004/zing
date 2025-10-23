import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

export default function Loading({className}: {className?: string}) {
    return (
        <div className={cn("z-50 w-full h-full flex justify-center items-center", className)}>
            <Spinner className="size-6" />
        </div>

    );
}
