import { StyledSharedUiFooter } from "./footer.styles"
import EmailIcon from "@mui/icons-material/Email"
import GitHubIcon from "@mui/icons-material/GitHub"
import PhoneIcon from "@mui/icons-material/Phone"

/* eslint-disable-next-line */
export interface SharedUiFooterProps {}

export function Footer() {
    return (
        <StyledSharedUiFooter>
            <About />
            <Discover />
            <Contact />
        </StyledSharedUiFooter>
    )
}

const About = () => {
    return (
        <div>
            <span className="title">About</span>
            <div className="body">
                <li>About the site</li>
                <li>How the site is deployed</li>
            </div>
        </div>
    )
}

const Discover = () => {
    return (
        <div>
            <span className="title">Discover</span>
            <div className="body">
                <li>Home</li>
                <li>Books</li>
                <li>Notes</li>
                <li>Return to Top</li>
            </div>
        </div>
    )
}

const Contact = () => {
    return (
        <div>
            <span className="title">Contact</span>
            <div className="body">
                <div className="topic">
                    <GitHubIcon />
                    <li>github.com/user</li>
                </div>
                <div className="topic">
                    <EmailIcon />
                    <li>email</li>
                </div>
                <div className="topic">
                    <PhoneIcon />
                    <li>(+123)4567890</li>
                </div>
            </div>
        </div>
    )
}

export default Footer
