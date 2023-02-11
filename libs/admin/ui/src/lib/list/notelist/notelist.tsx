import { List, Datagrid, TextField, SearchInput } from "react-admin"

export const NoteList = () => (
    <List filters={noteFilters}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="category" />
            <TextField source="dateAdded" />
        </Datagrid>
    </List>
)

const noteFilters = [<SearchInput source="name" alwaysOn />]

export default NoteList
