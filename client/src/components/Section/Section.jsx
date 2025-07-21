// src/components/Section.jsx
const Section = ({
  children,
  as: Tag = "section",
  className = "",
  padding = "py-6 md:py-10 lg:py-12",
  margin = "",
  maxWidth = "max-w-7xl",
  spaceY = "", // Optional vertical spacing inside the section
  ...props
}) => {
  return (
    <Tag
      className={`${maxWidth} mx-auto ${padding} ${margin} ${spaceY} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Section;
