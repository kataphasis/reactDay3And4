import { createContext, useState, useEffect, useContext } from "react"
import { getFirestore, getDoc, getDocs, collection, doc, addDoc, orderBy, query, collectionGroup } from '@firebase/firestore'
import { id } from "prelude-ls"
import { AuthContext } from './AuthProvider'
export const DataContext = createContext()

export const DataProvider = (props) => {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()

    useEffect(() => {
        const getPosts = async() => {
            const collectionRef = collection(db, "Cars")
            const q = query(collectionRef, orderBy('id', 'asc'))
            const collectionSnap = await getDocs(q)
            let postsArr = []

            collectionSnap.forEach((docSnap) => {
                postsArr.push({
                    ...docSnap.data(),
                    id: docSnap.id
                })
            })

            console.log(postsArr)

            setPosts(postsArr)
        }
        getPosts()
    }, [])

    const getSinglePost = async (id) => {
        const collectionRef = collectionGroup(db, "Cars")
        const q = query(collectionRef, orderBy('id', 'asc'))
        const collectionSnap = await getDocs(q)
        
        let postsArr = []

        let resultDoc = {}

        collectionSnap.forEach((docSnap) => {
            if (docSnap.id === id) {
                resultDoc = {
                    id: id,
                    ...docSnap.data()
                }
            }
        })

        return resultDoc
    }

    const addPost = async(name1, year, selling_price, km_driven) => {
        if (!user.loggedIn) {
            throw new Error("You can't add a car if not signed in")
        }

        const newPost = {
            name1: name1,
            year: year,
            selling_price: selling_price,
            km_driven: km_driven
        }
        
        const docRef = await addDoc(collection(db, "users", user.id, "Cars"), newPost)
        
        newPost.id = docRef.id

        setPosts([newPost, ...posts])

        console.log(docRef)
        console.log("New post added", docRef.id)
    }

    const values = {
        posts,
        getSinglePost,
        addPost
    }

    return (
        <DataContext.Provider value={values}>
            { props.children }
        </DataContext.Provider>
    )
}