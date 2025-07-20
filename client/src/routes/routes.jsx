import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import AddEventForm from "../pages/AddEventForm/AddEventForm";
import Events from "../pages/Events/Events";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: "/create",
            element: <AddEventForm/>
        },
        {
            path: "/events",
            element: <Events/>
        }
    ]
  },
]);
