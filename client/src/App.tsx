import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Post from "./components/Post";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";



function App() {
  return (

    
    <Routes>
      <Route path="/" element={<Layout/>}>

      {/* Home */}
      <Route index element={
      
          <HomePage/>
      
        }/>
      

      {/* login */}
      <Route path="/login" element={<LoginPage/>}/>

      {/* register */}
      <Route path="/register" element={<RegisterPage/>}/>


      {/* Create post */}
      <Route path="/create" element={<CreatePostPage/>}/>

      {/* Single Post */}
      <Route path="/post/:id" element={<PostPage/>}/>

      {/* Edit Post page */}
      <Route path="/edit/:id" element={<EditPostPage/>}/>

      </Route>

    </Routes>


    
  );
}

export default App;
