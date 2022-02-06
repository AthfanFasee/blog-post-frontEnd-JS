import axios from "axios";
import { useEffect, useContext } from "react";
import UpdatePost from "../../Components/UpdatePost/UpdatePost";
import UserPosts from "../../Components/UserPosts/UserPosts";
import { HomePageContext } from "../../Helper/HomePageContexts/HomePageProvider";
import './HomePage.css'
import Pagination from './Pagination/Pagination'


//Using contextApi to pass props to Child Components


function HomePage({ isAuth }) {

  const {page, postLists, setPostLists, newtitle, newpostText, editsection, isEditsection} = useContext(HomePageContext)

  const token = localStorage.getItem('token')

  

  //Getting Posts from MongoDB when the HomePage Component is rendered
  const url = 'http://localhost:4000/api/v1/posts'
  useEffect(() => {
    const getPosts = async () => {
      const {data} = await axios.get(url+`?page=${page}`)
      setPostLists(data.posts);
      console.log(data.posts)
    };
    getPosts();
  }, [page]);


  //Updating the Post(Editing the Post)

  const updatePost = async (id) => {
      axios.patch(url+`/${id}`, {title: newtitle, postText: newpostText }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      isEditsection(false);
      window.location.reload();
  }
  
  
  
  
  //Deleting the post
  const deletePost = async (id) => {
    axios.delete(url+`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    window.location.reload();
}

  

  


  return (
    <div className="homePage">

      {/*Warning Users to SignIn when they are not SignedIn */}
      {!token && <p>Please Login to createPosts or to comment</p>}
      {!editsection && <Pagination />}
      {/*Showing Posts when HomePage Component is Rendered */}
      {postLists.map((post) => {
        return(
          <div key={post._id}>
          <UserPosts post={post} isAuth={isAuth} deletePost={deletePost}/></div> //delete post ithukkulle props ah pohuma
         )
      })}


    {/* Rendering UpdatePost Component only when UpdateButton is clicked */}
    {editsection && 
    <UpdatePost updatePost={updatePost}/>
    }

    {/* Page SetUp(Pagination) */}
    {!editsection && <Pagination />}
    </div>)
}

export default HomePage;
