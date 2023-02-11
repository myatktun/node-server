import { List, Datagrid, TextField, ArrayField, SearchInput, useRecordContext } from "react-admin"

export const CategoryList = () => (
    <List filters={categoryFilters}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <ArrayField source="books">
                <MyArrayField />
            </ArrayField>
        </Datagrid>
    </List>
)

const MyArrayField = () => {
    const record = useRecordContext()
    return record.books.map((book: string) => (
        <ul key={`${book}`}>
            <li key={`${book}`}>
                <a href={`/books/${book}`}>{book}</a>
            </li>
        </ul>
    ))
}

const categoryFilters = [<SearchInput source="name" alwaysOn />]

export default CategoryList
