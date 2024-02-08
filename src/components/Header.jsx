import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "./logoportal.png";  
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      {/* Sustituye el texto por la imagen del logo */}
      <h1>
        <NavLink to="/">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </NavLink>
      </h1>
      <div className={`menu-icon ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/noticia">Noticias</NavLink></li>
          <li><NavLink to="/favoritos">Favoritos</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}