export default function Footer(props){
    return(
        <div className="p-4 pt-2 pb-1">
            <span className="mr-1 font-bold">{props.username}</span>
            <span >{props.caption}</span>
        </div>
    )
}