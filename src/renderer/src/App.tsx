import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./global.css"
import { Routes } from "./routes"

export function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
