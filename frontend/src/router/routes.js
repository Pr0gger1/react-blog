import MainPage from "../pages/MainPage";
import Error404 from "../pages/Error404";
import PostEditor from "../pages/PostEditor";
import Profile from "../pages/Profile";
import PostPage from "../pages/PostPage";

export const routes = isAuth => {
    if (isAuth) {
        return [
            {path: "/", element: <MainPage/>},
            {path: "/write-post", element: <PostEditor/>},
            {path: "/post/:id", element: <PostPage/>},
            {path: "/user/:id", element: <Profile/>},
            {path: "*", element: <Error404/>}
        ]
    }
    return [
        {path: "/", element: <MainPage/>},
        {path: "/post/:id", element: <PostPage/>},
        {path: "*", element: <Error404/>}
    ]
}