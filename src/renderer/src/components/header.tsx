import { CodeXml, Trash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "./ui/breadcrumb"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <header
            className="region-drag border-b border-rotion-400 px-3 py-2 flex justify-between items-center"
        >
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                to="/"
                                className="flex gap-2 items-center"
                            >
                                <CodeXml color="red" />
                                Estrutura técnica
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/docs/components">
                                Back-end
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Unititled
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Button
                className="flex gap-2 bg-transparent hover:bg-rotion-700"
            >
                <Trash size={20} />
                Apagar
            </Button>
        </header>
    )
}
