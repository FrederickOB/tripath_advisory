/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "./sanity";
import { Link } from "react-router";
import { ExternalLink } from "lucide-react";

// Custom Image component
const SanityImage = ({ value }: { value: any }) => {
  if (!value?.asset?._ref) {
    return null;
  }

  return (
    <figure className="my-8">
      <img
        src={urlFor(value).width(800).auto("format").url()}
        alt={value.alt || ""}
        loading="lazy"
        className="rounded-lg w-full"
      />
      {value.caption && (
        <figcaption className="text-sm text-center text-slate-500 mt-2">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
};

// Custom Link component
const SanityLink = ({
  value,
  children,
}: {
  value: any;
  children: React.ReactNode;
}) => {
  const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;

  // Internal link (starts with "/")
  if (value?.href?.startsWith("/")) {
    return (
      <Link
        to={value.href}
        className="text-emerald-600 hover:text-emerald-700 hover:underline"
      >
        {children}
      </Link>
    );
  }

  // External link
  return (
    <a
      href={value?.href}
      target={target}
      rel={rel}
      className="text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
    >
      {children}
      {target === "_blank" && <ExternalLink className="w-3 h-3" />}
    </a>
  );
};

// Custom Code Block component
const CodeBlock = ({ value }: { value: any }) => {
  return (
    <pre className="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto my-6">
      <code className={value.language ? `language-${value.language}` : ""}>
        {value.code}
      </code>
    </pre>
  );
};

// Custom Callout component
const Callout = ({ value }: { value: any }) => {
  const typeStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  const type = value.type || "info";
  const style = typeStyles[type as keyof typeof typeStyles] || typeStyles.info;

  return (
    <div className={`p-4 border-l-4 ${style} my-6 rounded-r-lg`}>
      {value.title && <h4 className="font-bold mb-2">{value.title}</h4>}
      <div>{value.text}</div>
    </div>
  );
};

// Custom Table component
const Table = ({ value }: { value: any }) => {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
        {value.rows?.map((row: any, rowIndex: number) => (
          <tr
            key={rowIndex}
            className={
              rowIndex === 0 ? "bg-slate-100" : "border-t border-slate-200"
            }
          >
            {row.cells?.map((cell: any, cellIndex: number) => {
              const Tag = rowIndex === 0 ? "th" : "td";
              return (
                <Tag
                  key={cellIndex}
                  className={`px-4 py-2 text-sm ${rowIndex === 0 ? "font-semibold text-left" : ""}`}
                >
                  {cell}
                </Tag>
              );
            })}
          </tr>
        ))}
      </table>
    </div>
  );
};

// Define the components object
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: SanityImage,
    code: CodeBlock,
    callout: Callout,
    table: Table,
  },
  marks: {
    link: SanityLink,
    internalLink: ({ value, children }) => {
      const { slug = {} } = value;
      const href = `/${slug.current}`;
      return (
        <Link
          to={href}
          className="text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-4 text-slate-800">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-4 text-slate-800">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-800">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-6 mb-4 text-slate-800">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 my-6 italic text-slate-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-slate-600 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};
