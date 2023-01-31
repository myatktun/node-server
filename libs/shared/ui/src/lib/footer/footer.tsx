import { Link } from "react-router-dom"
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
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <Link to="/notes">Notes</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => window.scrollTo(0, 0)}>
                        Return to top
                    </Link>
                </li>
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
                    <GitHubIcon className="icon" />
                    <li>
                        <a href="https://github.com/myatktun" target={"_blank"} rel="noreferrer">
                            myatktun
                        </a>
                    </li>
                </div>
                <div className="topic">
                    <EmailIcon className="icon" />
                    <li>myatktun2k@gmail.com</li>
                </div>
                <div className="topic">
                    <PhoneIcon className="icon" />
                    <li>(+959)-250123588</li>
                </div>
            </div>
        </div>
    )
}

export default Footer
