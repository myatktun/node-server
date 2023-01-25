import { SharedUiHeader } from "@projectx/shared/ui/header"
import { SharedUiCarousel } from "@projectx/shared/ui/carousel"
import { SharedUiFooter } from "@projectx/shared/ui/footer"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
const titles = ["Books", "Notes"]

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SharedUiHeader />
            {titles.map((title, index) => (
                <SharedUiCarousel key={index} title={title} index={index} />
            ))}
            <SharedUiFooter />
        </QueryClientProvider>
    )
}

export default App
