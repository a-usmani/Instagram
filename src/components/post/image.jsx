export default function Image(props){
    return <img className="border border-separate rounded-md border-gray-primary" src={props.src} alt={props.caption}/>
}