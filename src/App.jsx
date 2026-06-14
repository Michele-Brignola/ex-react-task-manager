import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { GlobalProvider } from "./contexts/GlobalProvider";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Components
import DefaultLayout from "./layouts/DefaultLayout";
import TaskListPage from "./pages/TaskListPage";
import AddTaskPage from "./pages/AddTaskPage";
import TaskDetail from "./pages/TaskDetail";

export default function App() {
   return (
      <GlobalProvider>
         <BrowserRouter>
            <Routes>
               <Route Component={DefaultLayout}>
                  <Route index element={<TaskListPage />} />
                  <Route path="AddTask" element={<AddTaskPage />} />
                  <Route path="Task/:id" element={<TaskDetail />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </GlobalProvider>
   );
}
