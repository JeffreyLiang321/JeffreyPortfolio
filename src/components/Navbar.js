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
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="relative flex items-center justify-end py-4 px-8 w-full max-w-screen-xl mx-auto">
            <div className="flex justify-end space-x-6 w-full">
                    <button
                        onClick={() => handleClick("about")}
                        style={{ marginLeft: "2.5rem" }}
                        className={`text-sm font-medium ${
                            active === "about" ? "text-purple-500" : "text-gray-800"
                        } transition-colors duration-200`}
                    >
                        About Me
                    </button>
                    <button
                        onClick={() => handleClick("portfolio")}
                        className={`text-sm font-medium ${
                            active === "portfolio" ? "text-purple-500" : "text-gray-800"
                        } transition-colors duration-200`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => handleClick("skills")}
                        className={`text-sm font-medium ${
                            active === "skills" ? "text-purple-500" : "text-gray-800"
                        } transition-colors duration-200`}
                    >
                        Skills
                    </button>
                    <button
                        onClick={() => handleClick("resume")}
                        className={`text-sm font-medium ${
                            active === "resume" ? "text-purple-500" : "text-gray-800"
                        } transition-colors duration-200`}
                    >
                        Experiences
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;

