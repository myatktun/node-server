import { Header, Carousel, Footer } from "@projectx/shared/ui"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
const titles = ["Books", "Notes"]

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            {titles.map((title, index) => (
                <Carousel key={index} title={title} index={index} />
            ))}
            <Footer />
        </QueryClientProvider>
    )
}

export default App
