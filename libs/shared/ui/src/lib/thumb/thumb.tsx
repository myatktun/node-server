interface ThumbProps {
    title: string
    item: { name: string; author?: string; olid?: string }
}

const Thumb = ({ title, item }: ThumbProps) => {
    if (title.toLowerCase() === "books") {
        return item.olid !== "unknown" ? (
            <img
                src={`https://covers.openlibrary.org/b/olid/${item.olid}-M.jpg`}
                alt={`${item.name}`}
                className="listItemImg"
            />
        ) : (
            <div className="listItem">
                {item.name}
                {"\nAuthor: "}
                {item.author}
            </div>
        )
    }

    return <div className="listItem">{item.name}</div>
}
export default Thumb
