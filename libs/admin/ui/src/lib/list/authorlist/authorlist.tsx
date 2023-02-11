import { List, Datagrid, TextField, ArrayField, SearchInput, useRecordContext } from "react-admin"

export const AuthorList = () => (
    <List filters={authorFilters}>
        <Datagrid>
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
                <a href={`/books/#/books/${book}`}>{book}</a>
            </li>
        </ul>
    ))
}

const authorFilters = [<SearchInput source="name" alwaysOn />]

export default AuthorList
