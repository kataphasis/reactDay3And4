import { useState, useContext } from 'react'
import PostList from './components/PostList'
import { BrowserRouter as Router,
    Routes,
    Route,
    Link 
} from 'react-router-dom'
import Profile from './views/Profile'
import Home from './views/Home'
import Inventory from './views/Inventory'
import InventorySingle from './views/InventorySingle'
import firebase from './firebase'
import { AuthContext } from './contexts/AuthProvider'

export default function App() {
    const { login, logout, user } = useContext(AuthContext)
    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/inventory">Inventory</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                    <ul>
                        {
                            (user.loggedIn) ?
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                            :
                            <li>
                                <button onClick={login}>Login</button>
                            </li>
                        }
                    </ul>
                </nav>

                <h2>Current User: {user.username}</h2>

                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="inventory">
                        {/* URL Prefix of /Inventory */}
                        <Route path=":id" element={<InventorySingle />} />
                        <Route path="" element={<Inventory />} />
                    </Route>
                    <Route path="/" element={<Home />}  />
                </Routes>
            </Router>
        </>
    )
}