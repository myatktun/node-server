import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"

/* eslint-disable-next-line */
export interface ErrorProps { }

const Error = () => {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Sorry, something went wrong.
        </Alert>
    )
}

export default Error
