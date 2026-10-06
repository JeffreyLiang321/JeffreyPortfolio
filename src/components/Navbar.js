import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
    { id: "about", label: "About" },
    { id: "portfolio", label: "Work" },
    { id: "resume", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

const NavigationBar = () => {
    const [active, setActive] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    // Highlight the section currently crossing the band just below the navbar.
    // Sections render after the JSON loads, so re-scan when the DOM changes.
    useEffect(() => {
        const observed = new Set();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-80px 0px -60% 0px" }
        );

        const observeSections = () => {
            NAV_ITEMS.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (el && !observed.has(el)) {
                    observed.add(el);
                    observer.observe(el);
                }
            });
        };

        observeSections();
        const mutationObserver = new MutationObserver(observeSections);
        mutationObserver.observe(document.getElementById("root"), { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    return (
        <nav className="site-nav" aria-label="Primary">
            <div className="site-nav-inner">
                <a href="#home" className="site-nav-brand" onClick={() => setMenuOpen(false)}>
                    Jeffrey Liang
                </a>

                <button
                    type="button"
                    className="site-nav-toggle"
                    aria-expanded={menuOpen}
                    aria-controls="site-nav-links"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} aria-hidden="true"></i>
                </button>

                <ul id="site-nav-links" className={`site-nav-links ${menuOpen ? "is-open" : ""}`}>
                    {NAV_ITEMS.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={`site-nav-link ${active === id ? "is-active" : ""}`}
                                aria-current={active === id ? "true" : undefined}
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavigationBar;
