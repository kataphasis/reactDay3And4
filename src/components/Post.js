import { Link } from 'react-router-dom'

export default function Post(props) {

    function buildHeader() {
        let resHeader;

        if (!props.hideLink) {
            resHeader = (
                <Link to={"/inventory/" + props.post.id}>
                    {props.post.id}: { props.post.name1 }
                </Link>
            )
        } else {
            resHeader = (
                <>{props.post.id}: { props.post.name1 }</>
            )
        }

        return resHeader
    }

    return (
        <div className="card card-item">
            <h2>
                { buildHeader() }
            </h2>
            <p>{ props.post.year }</p>
            <p>{ props.post.selling_price }</p>
            <p>{ props.post.km_driven }</p>
        </div>
    )
}