import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/store/userStore"

type Props = {}

export default function Header({}: Props) {

  // const [username, setUsername] = useState<string | null>(null)
  const {username, setUsername} = useUserStore()

  const navigate = useNavigate()
  useEffect(() => {
    
    const getSession = async () => {
      const res = await axios.get('http://localhost:3000/profile', {withCredentials: true})
      console.log(res)
      setUsername(res.data.username)
      
    }


    getSession()

  },[])

  // const logout = async () => {
  //      const res = await axios.get('http://localhost:3000/auth/logout')
  //     setUsername(null)
  // }

  const logout = async () => {
    
    const res = await axios.get('http://localhost:3000/auth/logout', {withCredentials: true})
    console.log(res)
    setUsername(null)
    navigate('/login')
  }

  // console.log(username)

  return (
    <header className="flex justify-between mb-[3rem] mt-[1.25rem]">
        <Link to="/" className="font-bold text-[1.5rem]">
          MyBlog
        </Link>
        {username ? (
          <div className="flex flex-col items-center gap-4">
            <div className="font-semibold text-lg">Welcome {username}</div>
          <div className="flex gap-4">
          <Button variant={`secondary`}><Link to={`/create`}>Create Post</Link></Button>
          <Button onClick={logout}>Logout</Button>
          </div>
          </div>
        ) : (
          <nav className="flex gap-4">
          <Link to='/login'>Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        )}
        {/* <div className="flex gap-4">
          <Button variant={`ghost`}>Create new post</Button>
          <Button onClick={logout}>Logout</Button>
        </div> */}
        
      </header>
  )
}