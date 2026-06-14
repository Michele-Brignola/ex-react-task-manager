import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

export default function TaskDetail() {
   const { id } = useParams();
   const navigate = useNavigate();
   const { tasks, removeTask } = useGlobalContext();

   const task = tasks.find((t) => t.id == id);

   const handleDelete = async () => {
      try {
         await removeTask(task.id);
         alert("Task eliminata con successo");
         navigate("/");
      } catch (err) {
         console.error(err);
         alert(err.message);
      }
   };

   if (!task) {
      return <h2>Task non Trovata</h2>;
   }

   return (
      <>
         <title>Dettagli Task</title>
         <div className="container">
            <h1>{task.title}</h1>
            <p>
               <strong>Descrizione:</strong> {task.description}
            </p>
            <p>
               <strong>Status:</strong> {task.status}
            </p>
            <p>
               <strong>Data di Creazione: </strong>
               {new Date(task.createdAt).toLocaleDateString()}
            </p>
            <button className="btn btn-danger" onClick={handleDelete}>
               Elimina Task
            </button>
         </div>
      </>
   );
}
