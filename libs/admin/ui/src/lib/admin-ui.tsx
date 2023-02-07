import styled from "styled-components"

/* eslint-disable-next-line */
export interface AdminUiProps {}

const StyledAdminUi = styled.div`
    color: pink;
`

export function AdminUi(props: AdminUiProps) {
    return (
        <StyledAdminUi>
            <h1>Welcome to AdminUi!</h1>
        </StyledAdminUi>
    )
}

export default AdminUi
