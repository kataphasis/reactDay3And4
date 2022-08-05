
import { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function PostForm() {
    const {
        addPost
    } = useContext(DataContext)
    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        addPost(data.name1, data.body)
        event.target.reset()
        console.log(data.name1, data.year)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name1">Name</label>
                <input type="text" name="name1" id="" />
            </div>
            <div className="form-group">
                <label htmlFor="year">Year</label>
                <input type="text" name="year" id="" />
            </div>
            <div className="form-group">
                <label htmlFor="selling_price">Selling price</label>
                <input type="text" selling_price="selling_price" id="" />
            </div>
            <div className="form-group">
                <label htmlFor="km_driven">km driven</label>
                <input type="text" name="km_driven" id="" />
            </div>
            <button type="submit">Add Post</button>
        </form>
    )
}