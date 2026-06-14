import { useState, useRef, useMemo } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

export default function AddTaskPage() {
   const { addTask } = useGlobalContext();

   // Stati e Ref
   const [title, setTitle] = useState("");
   const descriptionRef = useRef();
   const statusRef = useRef();

   const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

   const taskTitleError = useMemo(() => {
      if (title.trim().length <= 0) {
         return "nome task non può essere vuoto";
      }
      if ([...title].some((c) => symbols.includes(c))) {
         return "nome task non può contenere simboli";
      }
   }, [title]);

   const resetForm = () => {
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "";
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (taskTitleError) return;

      const newTask = {
         title: title.trim(),
         description: descriptionRef.current.value.trim(),
         status: statusRef.current.value.trim(),
      };

      try {
         await addTask(newTask);
         alert("task creata con successo");
         resetForm();
      } catch (err) {
         alert(err.message);
      }
   };

   return (
      <>
         <title>Aggiungi Task</title>
         <div className="container">
            <h1>Aggiunta Task</h1>
            <form onSubmit={handleSubmit}>
               {/* title */}
               <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                     Nome della Task:
                  </label>
                  <input
                     type="text"
                     id="title"
                     className="form-control"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
               {/* Descrizione */}
               <div className="mb-3 d-flex flex-column">
                  <label htmlFor="description" className="form-label">
                     Descrizione:
                  </label>
                  <textarea id="description" ref={descriptionRef} />
               </div>
               {/* Specializzazione */}
               <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                     Specializzazione:
                  </label>
                  <select id="status" className="form-select" ref={statusRef}>
                     <option value="To do">To do</option>
                     <option value="Doing">Doing</option>
                     <option value="Done">Done</option>
                  </select>
               </div>
               {/* Submit Button */}
               <button type="submit" className="btn btn-danger">
                  Aggiungi
               </button>
            </form>
         </div>
      </>
   );
}
