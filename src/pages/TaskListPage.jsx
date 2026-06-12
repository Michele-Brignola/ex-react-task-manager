import { memo } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

const TaskRow = memo(function TaskRow({ task }) {
   const statusClass = {
      "To do": "text-danger",
      Doing: "text-warning",
      Done: "text-success",
   };

   return (
      <tr>
         <th scope="row">{task.id}</th>
         <td>{task.title}</td>
         <td className={statusClass[task.status] ?? "text-secondary"}>
            {task.status}
         </td>
         <td>{task.createdAt}</td>
      </tr>
   );
});

export default function TaskListPage() {
   const { tasks } = useGlobalContext();
   console.log(tasks);

   return (
      <>
         <title>Lista Task</title>
         <div className="container">
            <h1>Lista delle Tasks</h1>
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Nome</th>
                     <th scope="col">Stato</th>
                     <th scope="col">Data di Creazione</th>
                  </tr>
               </thead>
               <tbody>
                  {tasks.map((task) => (
                     <TaskRow key={task.id} task={task} />
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
}
