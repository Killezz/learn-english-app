import { useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Header = () => {
  // Creates Header with settings popup. It also provides theme setting for body.
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const handleThemeChange = (e) => {
    const currentTheme = e.target.checked ? "light" : "dark";
    setTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <header className="center">
        <nav>
          {/* If location.pathname is one of the below adds active className so active page gets highlighted. */}
          <a href="/" className={location.pathname === "/" ? "active" : ""}>
            Learn English
          </a>
          <a
            href="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </a>
          <a
            tabIndex={0}
            role="button"
            aria-label="settings button"
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsPopupOpen(!isPopupOpen);
              }
            }}
            className={` ${isPopupOpen ? "active" : ""}`}
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
            }}
          >
            <FontAwesomeIcon className="open-settings-icon" icon={faGear} />
          </a>
        </nav>
        <div className={`settings-popup ${isPopupOpen ? "active" : ""}`}>
          <div className="popup-content center">
            <h2>Settings</h2>

            <div className="settings-container">
              Light mode <br />
              <label className="switch">
                <input
                  checked={theme === "light"}
                  onChange={handleThemeChange}
                  type="checkbox"
                ></input>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
