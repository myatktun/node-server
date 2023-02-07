import { List, Datagrid, TextField } from "react-admin"

export const NoteList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="category" />
            <TextField source="dateAdded" />
        </Datagrid>
    </List>
)

export default NoteList
