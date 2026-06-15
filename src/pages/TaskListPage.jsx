import { memo } from "react";
import { Link } from "react-router-dom";
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
                  {tasks &&
                     tasks.map((task) => <TaskRow key={task.id} task={task} />)}
               </tbody>
            </table>
         </div>
      </>
   );
}
