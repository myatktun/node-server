interface ThumbProps {
    title: string
    item: { name: string; author?: string; olid?: string }
}

const Thumb = (props: ThumbProps) => {
    if (props.title.toLowerCase() === "books") {
        return props.item.olid ? (
            <img
                src={`https://covers.openlibrary.org/b/olid/${props.item.olid}-M.jpg`}
                alt=""
                className="listItemImg"
            />
        ) : (
            <div className="listItem">
                {props.item.name}
                {"\nAuthor: "}
                {props.item.author}
            </div>
        )
    }

    return <div className="listItem">{props.item.name}</div>
}
export default Thumb
