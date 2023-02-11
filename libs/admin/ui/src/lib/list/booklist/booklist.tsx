import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    SearchInput,
} from "react-admin"

export const BookList = () => (
    <List filters={bookFilters}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="author" />
            <TextField source="category" />
            <TextField source="status" />
            <TextField source="dateAdded" />
            <TextField source="isbn" />
            <TextField source="olid" />
            <EditButton />
        </Datagrid>
    </List>
)

export const BookEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" multiline rows={5} />
            <TextInput source="author" resettable />
            <TextInput source="category" resettable />
            <TextInput source="status" resettable />
            <TextInput source="dateAdded" resettable />
            <TextInput source="isbn" resettable />
            <TextInput source="olid" resettable />
        </SimpleForm>
    </Edit>
)

const bookFilters = [<SearchInput source="name" alwaysOn />]

export default BookList
