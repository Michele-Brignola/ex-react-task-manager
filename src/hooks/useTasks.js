import { useState, useEffect } from "react";

export const useTasks = () => {
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      fetch(import.meta.env.VITE_BACKEND_URL + "/tasks")
         .then((res) => res.json())
         .then((data) => setTasks(data))
         .catch((err) => console.error(err));
   }, []);

   const addTask = () => {};
   const removeTask = () => {};
   const updateTask = () => {};

   return { tasks, addTask, removeTask, updateTask };
};
