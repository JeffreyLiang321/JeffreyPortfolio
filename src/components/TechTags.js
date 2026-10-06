import React from "react";

const TechTags = ({ technologies }) => {
  if (!technologies || technologies.length === 0) return null;
  return (
    <ul className="tag-list">
      {technologies.map((t) => (
        <li key={t.name} className="tag">
          {t.name}
        </li>
      ))}
    </ul>
  );
};

export default TechTags;
