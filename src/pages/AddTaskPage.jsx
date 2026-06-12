import { useState, useRef } from "react";

export default function AddTaskPage() {
   // Stati e Ref
   const [title, setTitle] = useState("");
   const descriptionRef = useRef();
   const statusRef = useRef();

   const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

   const handleSubmit = (e) => {
      e.preventDefault();

      if (
         title.trim().length <= 0 ||
         [...title].some((c) => symbols.includes(c))
      ) {
         console.error("Title non valido.");
         return;
      }

      console.log(`
         Dati form:
         - Title: ${title.trim()}
         - Description: ${descriptionRef.current.value.trim()}
         - Status: ${statusRef.current.value.trim()}
      `);
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
