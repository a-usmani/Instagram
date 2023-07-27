import { useState } from "react"
import { Link } from "react-router-dom"
import AddComment from "./add-comment"

export default function Comments(props){
    const [comments, setComments] = useState(props.allComments)
    const [commentsSlice, setCommentsSlice] = useState(3) 

    const showNextComments = () => {
        setCommentsSlice(x => x+3)
    }

    return (
        <>
            <div className="p-4 pt-1 ">
                {comments.slice(0, commentsSlice).map((item) => (
                    <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                {comments.length >= 3 && commentsSlice < comments.length && (
                    <button
                        className="text-sm text-gray-base cursor-pointer focus:outline-none"
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter'){
                                showNextComments()
                            }
                        }}
                    >
                        View more comments
                    </button>
                )}
            </div>
            <AddComment
                docId={props.docId}
                comments={comments}
                setComments={setComments}
                commentInput={props.commentInput}
            />
        </>
    )
}