import { GlobalContext } from "./GlobalContext";
import { useTasks } from "../hooks/useTasks";

export const GlobalProvider = ({ children }) => {
   const taskData = useTasks();
   return (
      <GlobalContext.Provider value={taskData}>
         {children}
      </GlobalContext.Provider>
   );
};
