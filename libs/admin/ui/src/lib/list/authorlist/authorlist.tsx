import { List, Datagrid, TextField } from "react-admin"

export const AuthorList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="books" />
        </Datagrid>
    </List>
)

export default AuthorList
