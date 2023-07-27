import { useRef } from 'react'
import Actions from './actions'
import Header from './header'
import Image from './image'
import Comments from './comments'
import Footer from './footer'

export default function Post(props){    
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    
    const content=props.content
    return (
        <div className='rounded col-span-4  bg-white  mb-12 border-b border-gray-primary'>
            <Header username={content.username} posted={content.dateCreated} />
            <Image src={content.imageSrc} alt={content.caption} />
            <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handelFocus={handleFocus}/>
            <Footer username={content.username} caption={content.caption} />
            <Comments docId={content.docId} allComments={content.comments} commentInput={commentInput}/>
        </div>
    )
}