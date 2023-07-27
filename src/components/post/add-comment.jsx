import { useContext, useState } from "react"
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";

export default function AddComment(props){
    const [comment,setComment] = useState('')
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: user } = useContext(UserContext) 
    const displayName = user.displayName

    const handleSubmitComment = (event) => {
        event.preventDefault()
    
        props.setComments([...props.comments, { displayName, comment }])
        setComment('')
    
        return firebase
          .firestore()
          .collection('photos')
          .doc(props.docId)
          .update({
            comments: FieldValue.arrayUnion({ displayName, comment })
          })
    }

    return (
        <div >
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) => comment.length >=1 ? handleSubmitComment(event) : event.preventDefault}
            >
                <input
                    aria-label='Add a comment'
                    autoComplete="off"
                    type='text'
                    placeholder='Add a comment...'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 focus:outline-none'
                    onChange={({target}) => setComment(target.value)}
                    value={comment}
                    ref={props.commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}