import { Children } from "react";

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <div key={index}>
          {child}&nbsp;
          <span> /</span>
        </div>
      );
    }
    return child;
  });

  return (
    <nav
      className="flex text-[1.3vh] md:mx-10 shadow-sm my-3 md:text-base md:justify-center px-2 mx-2 py-1 text-gray-700 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {childrenWtihSeperator}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
