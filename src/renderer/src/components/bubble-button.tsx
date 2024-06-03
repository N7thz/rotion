import { ComponentProps, ReactNode } from "react"

interface BubbleButtonProps extends ComponentProps<"button"> {
    children: ReactNode
}

export const BubbleButton = (props: BubbleButtonProps) => {

    return (

        <button
            className="p-2 text-zinc-500 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-white hover:bg-rotion-700 
            data-[active=true]:text-rotion-50"
            {...props}
        />
    )
}
