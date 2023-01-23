import { SharedUiHeader } from "@projectx/shared/ui/header"
import { SharedUiCarousel } from "@projectx/shared/ui/carousel"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
const titles = ["Books", "Notes"]

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SharedUiHeader />
            {titles.map((title) => (
                <SharedUiCarousel title={title} />
            ))}
        </QueryClientProvider>
    )
}

export default App
