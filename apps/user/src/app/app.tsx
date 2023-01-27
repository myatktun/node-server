import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Routes } from "react-router-dom"
import { Header, Home, Page, Footer } from "@projectx/shared/ui"

const queryClient = new QueryClient()

export function App() {
    if (!process.env.NX_API_URL) {
        console.error(new Error("No API URL set"))
        return <div>Something went wrong</div>
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <Routes>
                <Route path="/" element={<Home titles={["Books", "Notes"]} />} />
                <Route path="/books" element={<Page title={"books"} key="books" />} />
                <Route path="/notes" element={<Page title={"notes"} key="notes" />} />
                <Route path="/authors" element={<Page title={"authors"} key="authors" />} />
                <Route
                    path="/categories"
                    element={<Page title={"categories"} key="categories" />}
                />
            </Routes>
            <Footer />
        </QueryClientProvider>
    )
}

export default App
