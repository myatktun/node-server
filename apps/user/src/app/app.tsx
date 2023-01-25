import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Routes } from "react-router-dom"
import { Header, Home, Grid, Footer } from "@projectx/shared/ui"

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Grid title={"books"} />} />
                <Route path="/notes" element={<Grid title={"notes"} />} />
            </Routes>
            <Footer />
        </QueryClientProvider>
    )
}

export default App
