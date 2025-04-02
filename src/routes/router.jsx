
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Upload from "../pages/Upload";
import SingleVideo from "../components/SingleVideo";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AdminLogin from "../Admin/AdminLogin";
import AdminProtect from "../Admin/AdminProtect";
import AdminDashboard from "../Admin/AdminDashboard";
import AdminUsers from "../Admin/AdminUsers";
import UnauthorizedPage from "../Admin/Unauthorized";
import AdminVideos from "../Admin/AdminVideos";
import AdminComment from "../Admin/AdminComment";
import AdminReaction from "../Admin/AdminReaction";
import AdminSettings from "../Admin/AdminSettings";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children : [
            {
                path:'',
                element: <Home /> 
            },
            {
                path:'login',
                element:<Login />
            },
            {
                path:'/register',
                element:<Register />
            },
            {
                path:'upload',
                element:<Upload />
            },
            {
                path:'videos/:videoId',
                element:<SingleVideo />
            },
            {
                path:'/profile',
                element:<Profile />
            }
        ]
    },
    {
        path:'/admin',
        element: <AdminProtect>
            <AdminLogin />
        </AdminProtect>
    },
    {
        path:'/unauthorized',
        element:<UnauthorizedPage />
    },
    {
        path:'/admin/dashboard',
        element:<AdminProtect>
            <AdminDashboard />
        </AdminProtect>,
        children:[
            {
                path:'users',
                element:<AdminProtect>
                    <AdminUsers />
                </AdminProtect>
            },
            {
                path:'videos',
                element:<AdminProtect>
                    <AdminVideos />
                </AdminProtect>
            },
            {
                path:'comments',
                element:<AdminProtect>
                    <AdminComment />
                </AdminProtect>
            },
            {
                path:'reactions',
                element: <AdminProtect>
                    <AdminReaction />
                </AdminProtect>
            },
            {
                path:'settings',
                element:<AdminProtect>
                    <AdminSettings />
                </AdminProtect>
            }
        ]
    }
])

export {
    router 
}