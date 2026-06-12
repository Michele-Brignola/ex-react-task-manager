import { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalProvider = ({ children }) => {
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      fetch(import.meta.env.VITE_BACKEND_URL + "/tasks")
         .then((res) => res.json())
         .then((data) => setTasks(data))
         .catch((err) => console.error(err));
   }, []);

   const addTask = (task) => {
      setTasks((prev) => [...prev, task]);
   };

   const removeTask = (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
   };

   const value = { tasks, addTask, removeTask };
   return (
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
   );
};
