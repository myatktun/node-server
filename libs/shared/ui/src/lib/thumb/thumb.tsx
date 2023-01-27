import { Link } from "react-router-dom"

interface ThumbProps {
    title: string
    item: { _id?: string; name: string; author?: string; olid?: string }
}

const Thumb = ({ title, item }: ThumbProps) => {
    if (title.toLowerCase().includes("books")) {
        return item.olid ? (
            <div className="listItem">
                <Link to={`/books/${item._id}`}>
                    <img
                        src={`https://covers.openlibrary.org/b/olid/${item.olid}-M.jpg`}
                        alt={`${item.name}`}
                        className="listItemImg"
                    />
                </Link>
            </div>
        ) : (
            <div className="listItem">
                <Link to={`/books/${item._id}`}>
                    {item.name}
                    {"\nAuthor: "}
                    {item.author}
                </Link>
            </div>
        )
    }

    return (
        <div className="listItem">
            <Link to={`/books/${item._id}`}>{item.name}</Link>
        </div>
    )
}
export default Thumb
