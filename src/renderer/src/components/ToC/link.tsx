import { ComponentProps } from "react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"

interface TocLinkPros extends ComponentProps<"a"> {
    link?: string
}

export const TocLink = ({ link, className, ...props }: TocLinkPros) => {
    return (
        <Link
            to={link ?? "/"}
            className={
                cn("block text-zinc-50/80 hover:text-zinc-50", className)
            }
            {...props}
        />
    )
}
