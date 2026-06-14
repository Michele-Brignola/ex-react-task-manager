import { useState, useEffect } from "react";

export const useTasks = () => {
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      fetch(import.meta.env.VITE_BACKEND_URL + "/tasks")
         .then((res) => res.json())
         .then((data) => setTasks(data))
         .catch((err) => console.error(err));
   }, []);

   const addTask = async (newTask) => {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/tasks", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newTask),
      });
      const { success, message, task } = await res.json();
      if (!success) throw new Error(message);

      setTasks((prev) => [...prev, task]);
   };

   const removeTask = async (taskId) => {
      const res = await fetch(
         import.meta.env.VITE_BACKEND_URL + "/tasks/" + taskId,
         {
            method: "DELETE",
         },
      );
      const { success, message } = await res.json();
      if (!success) throw new Error(message);

      setTasks((prev) => prev.filter((t) => t.id !== taskId));
   };

   const updateTask = () => {};

   return { tasks, addTask, removeTask, updateTask };
};
