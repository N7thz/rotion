import { ComponentProps } from "react"
import { cn } from "../../lib/utils"

export const TocRoot = ({ className, ...props }: ComponentProps<"div">) => {
    return (
        <div {...props} className={cn("flex flex-col", className)} />
    )
}
