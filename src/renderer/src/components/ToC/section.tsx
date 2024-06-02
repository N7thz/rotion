import { ComponentProps } from "react"
import { cn } from "../../lib/utils"

export const TocSection = ({ className, ...porps }: ComponentProps<"span">) => {
    return (
        <span
            className={cn("px-3 py-1 flex flex-col gap-1", className)}
            {...porps}
        />
    )
}
