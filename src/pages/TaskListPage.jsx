import { useState, memo, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

// Funzione Debounce
function debounce(callback, delay) {
   let timer;
   return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
         callback(value);
      }, delay);
   };
}

const TaskRow = memo(function TaskRow({ task }) {
   const statusClass = {
      "To do": "text-danger",
      Doing: "text-warning",
      Done: "text-success",
   };

   return (
      <tr>
         <th scope="row">{task.id}</th>
         <td>
            <Link to={"/task/" + task.id}>{task.title}</Link>
         </td>
         <td className={statusClass[task.status] ?? "text-secondary"}>
            {task.status}
         </td>
         <td>{new Date(task.createdAt).toLocaleDateString()}</td>
      </tr>
   );
});

export default function TaskListPage() {
   const { tasks } = useGlobalContext();

   const [searchQuery, setSearchQuery] = useState("");
   const debouncedSetSearchQuery = useCallback(
      debounce(setSearchQuery, 500),
      [],
   );

   const [sortBy, setSortBy] = useState("createdAt");
   const [sortOrder, setSortOrder] = useState("1");

   const handleSort = (field) => {
      if (sortBy === field) {
         setSortOrder((prev) => prev * -1);
      } else {
         setSortBy(field);
         setSortOrder(1);
      }
   };

   const sortedTask = useMemo(() => {
      return [...tasks]
         .filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()),
         )
         .sort((a, b) => {
            const statusOptions = ["To do", "Doing", "Done"];
            let comparison;

            switch (sortBy) {
               case "title":
                  comparison = a.title.localeCompare(b.title);
                  break;
               case "status":
                  comparison =
                     statusOptions.indexOf(a.status) -
                     statusOptions.indexOf(b.status);
                  break;
               case "createdAt":
                  comparison =
                     new Date(a.createdAt).getTime() -
                     new Date(b.createdAt).getTime();
                  break;
            }

            return comparison * sortOrder;
         });
   }, [tasks, sortBy, sortOrder, searchQuery]);

   return (
      <>
         <title>Lista Task</title>
         <div className="container">
            <h1>Lista delle Tasks</h1>

            <input
               type="text"
               className="form-control"
               placeholder="Cerca una Task..."
               onChange={(e) => debouncedSetSearchQuery(e.target.value)}
            />

            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col" onClick={() => handleSort("title")}>
                        Nome
                     </th>
                     <th scope="col" onClick={() => handleSort("status")}>
                        Stato
                     </th>
                     <th scope="col" onClick={() => handleSort("createdAt")}>
                        Data di Creazione
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {sortedTask &&
                     sortedTask.map((task) => (
                        <TaskRow key={task.id} task={task} />
                     ))}
               </tbody>
            </table>
         </div>
      </>
   );
}
