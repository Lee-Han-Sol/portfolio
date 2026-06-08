const CSharpIcon = ({ className = "", size = "1em", ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M12 2.5L20 7v10l-8 4.5L4 17V7l8-4.5Z" />
            <path d="M11 9.5C10.4 9.2 9.8 9 9 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.4-.2 2-.5" />
            <path d="M14 10v4" />
            <path d="M16.5 10v4" />
            <path d="M13 11.3h4.5" />
            <path d="M13 12.7h4.5" />
        </svg>
    );
};

export default CSharpIcon;