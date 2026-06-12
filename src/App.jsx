import { BrowserRouter, Routes, Route } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Contexts
import { GlobalProvider } from "./contexts/GlobalProvider";

// Components
import DefaultLayout from "./layouts/DefaultLayout";
import TaskListPage from "./pages/TaskListPage";
import AddTaskPage from "./pages/AddTaskPage";

export default function App() {
   return (
      <GlobalProvider>
         <BrowserRouter>
            <Routes>
               <Route Component={DefaultLayout}>
                  <Route index element={<TaskListPage />} />
                  <Route path="AddTask" element={<AddTaskPage />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </GlobalProvider>
   );
}
