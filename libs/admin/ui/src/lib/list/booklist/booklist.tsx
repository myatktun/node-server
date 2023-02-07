import { List, Datagrid, TextField } from "react-admin"

export const BookList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="author" />
            <TextField source="category" />
            <TextField source="status" />
            <TextField source="dateAdded" />
            <TextField source="isbn" />
            <TextField source="olid" />
        </Datagrid>
    </List>
)

export default BookList
