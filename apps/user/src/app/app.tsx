import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Routes } from "react-router-dom"
import { Header, Home, Page, Detail, Footer } from "@projectx/shared/ui"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

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
                <Route path="/home" element={<Home titles={["Books", "Notes"]} />} />
                <Route path="/books" element={<Page title={"books"} key="books" />} />
                <Route path="/notes" element={<Page title={"notes"} key="notes" />} />
                <Route path="/authors" element={<Page title={"authors"} key="authors" />} />
                <Route
                    path="/categories"
                    element={<Page title={"categories"} key="categories" />}
                />
                <Route path="/search" element={<Page title={"Search"} key="search" />} />
                <Route path="/:title/:id" element={<Detail />} />
            </Routes>
            <Footer />
        </QueryClientProvider>
    )
}

export default App
