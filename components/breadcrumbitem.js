import Link from "next/link";

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <li className="inline-flex" {...props}>
      <Link href={href} legacyBehavior passHref>
        <a
          href="#"
          className="inline-flex text-[1.3vh] md:text-base items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
