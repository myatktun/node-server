import { Admin, Resource } from "react-admin"
import { dataProvider } from "@projectx/admin/provider"
import { BookList, AuthorList, CategoryList, NoteList } from "@projectx/admin/ui"

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="books" list={BookList} />
        <Resource name="authors" list={AuthorList} />
        <Resource name="categories" list={CategoryList} />
        <Resource name="notes" list={NoteList} />
    </Admin>
)

export default App
