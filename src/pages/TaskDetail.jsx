import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
// Components
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
   const { id } = useParams();
   const navigate = useNavigate();
   const { tasks, removeTask, updateTask } = useGlobalContext();

   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);

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

   const handleUpdate = async (updatedTask) => {
      try {
         await updateTask(updatedTask);
         setShowEditModal(false);
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
            <button
               className="btn btn-danger"
               onClick={() => setShowDeleteModal(true)}
            >
               Elimina Task
            </button>
            <button
               className="btn btn-primary"
               onClick={() => setShowEditModal(true)}
            >
               Modifica
            </button>
         </div>

         {/* Delete Modal */}
         <Modal
            title="Conferma Eliminazione"
            content={<p>Sei sicuro di voler eliminare la task?</p>}
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            confirmText="Elimina"
         />

         {/* Edit Modal */}
         <EditTaskModal
            task={task}
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdate}
         />
      </>
   );
}
