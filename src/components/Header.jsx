import { Link, NavLink } from "react-router-dom";

export default function Header() {
   const navLinks = [
      { to: "/", label: "Lista Task" },
      { to: "/AddTask", label: "Aggiungi Task" },
   ];

   return (
      <header className="bg-danger sticky-top shadow-sm mb-2">
         <nav className="navbar navbar-expand-lg navbar-light container">
            <Link to="/" className="navbar-brand fw-bold text-white fs-4">
               Header
            </Link>

            {/* Hamburger Button */}
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nav Links */}
            <div className="collapse navbar-collapse">
               <ul className="navbar-nav d-flex mx-2 gap-md-4">
                  {navLinks.map(({ to, label }, id) => (
                     <li key={id} className="nav-item">
                        <NavLink
                           to={to}
                           className="nav-link text-white fw-semibold"
                        >
                           {label}
                        </NavLink>
                     </li>
                  ))}
               </ul>
            </div>
         </nav>
      </header>
   );
}
