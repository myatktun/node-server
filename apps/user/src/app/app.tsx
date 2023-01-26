import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Routes } from "react-router-dom"
import { Header, Home, Page, Footer } from "@projectx/shared/ui"

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Routes>
                <Route path="/" element={<Home titles={["Books", "Notes"]} />} />
                <Route path="/books" element={<Page title={"books"} />} />
                <Route path="/notes" element={<Page title={"notes"} />} />
            </Routes>
            <Footer />
        </QueryClientProvider>
    )
}

export default App
