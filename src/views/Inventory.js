import {useContext} from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import { DataContext } from '../contexts/DataProvider'

export default function Inventory() {
    return (
        <>
            <h1>Inventory</h1>
            <PostForm />
            <PostList />
        </>
    )
}