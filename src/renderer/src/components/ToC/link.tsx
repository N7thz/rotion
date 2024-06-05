import { ComponentProps } from "react"
import { NavLink, NavLinkProps } from "react-router-dom"
import { cn } from "@/lib/utils"

interface TocLinkPros extends NavLinkProps { }

export const TocLink = ({ to, className, ...props }: TocLinkPros) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => {
                return cn(
                    "block text-zinc-50/80 hover:text-zinc-50"
                    ,
                    { "bg-rotion-700": isActive }
                    , className
                )
            }}
            {...props}
        />
    )
}
