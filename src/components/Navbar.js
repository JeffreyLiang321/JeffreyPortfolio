import React, { useState, useEffect } from "react";

const NavigationBar = () => {
    const [active, setActive] = useState("");

    // Highlight active section based on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let currentActive = "";

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentActive = section.id;
                }
            });

            setActive(currentActive);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Smooth scroll to section
    const handleClick = (sectionId) => {
        setActive(sectionId);
        const section = document.getElementById(sectionId);
        const offset = 80; // Adjust to match your sticky navbar height
        if (section) {
            window.scrollTo({
                top: section.offsetTop - offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="modern-navbar-2024">
            <div className="navbar-wrapper">
                {/* Brand Name */}
                <div className="navbar-brand-section">
                    <span className="brand-name">Jeffrey Liang</span>
                </div>
                
                {/* Navigation Links */}
                <div className="navbar-navigation">
                    <button
                        onClick={() => handleClick("about")}
                        className={`nav-item ${active === "about" ? "active" : ""}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleClick("portfolio")}
                        className={`nav-item ${active === "portfolio" ? "active" : ""}`}
                    >
                        Works
                    </button>
                    <button
                        onClick={() => handleClick("skills")}
                        className={`nav-item ${active === "skills" ? "active" : ""}`}
                    >
                        Skills
                    </button>
                    <button
                        onClick={() => handleClick("resume")}
                        className={`nav-item ${active === "resume" ? "active" : ""}`}
                    >
                        Experience
                    </button>
                    <button
                        onClick={() => handleClick("footer")}
                        className={`nav-item ${active === "footer" ? "active" : ""}`}
                    >
                        Contact
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;