import * as React from "react";
import { Link as LinkIcon } from "lucide-react";

import { DottedDivider } from "@/components/ui/dotted-divider";
import { cn } from "@/lib/utils";

/** Plain-text of a node's children, used only to sniff editorial-note asides. */
function textOf(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return textOf(props.children);
  }
  return "";
}

type TagProps<T = HTMLElement> = React.HTMLAttributes<T> & { id?: string };

function H2({ id, className, children, ...props }: TagProps) {
  return (
    <h2
      id={id}
      className={cn(
        "group mb-4 mt-16 scroll-mt-28 font-display text-[32px] leading-tight text-ink md:text-[38px]",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ id, className, children, ...props }: TagProps) {
  return (
    <h3
      id={id}
      className={cn("mb-3 mt-10 scroll-mt-28 text-[21px] font-semibold text-ink", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function P({ className, children, ...props }: TagProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mb-6 text-[17px] leading-[1.75] text-inkBody md:text-[18px]", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function Ul({ className, children, ...props }: TagProps<HTMLUListElement>) {
  return (
    <ul className={cn("mb-6 list-disc space-y-3 pl-5 marker:text-inkMuted", className)} {...props}>
      {children}
    </ul>
  );
}

function Ol({ className, children, ...props }: TagProps<HTMLOListElement>) {
  return (
    <ol
      className={cn("mb-6 list-decimal space-y-3 pl-5 marker:text-inkMuted", className)}
      {...props}
    >
      {children}
    </ol>
  );
}

function Li({ className, children, ...props }: TagProps<HTMLLIElement>) {
  return (
    <li className={cn("text-[17px] leading-[1.75] text-inkBody", className)} {...props}>
      {children}
    </li>
  );
}

function Strong({ className, children, ...props }: TagProps) {
  return (
    <strong className={cn("font-semibold text-ink", className)} {...props}>
      {children}
    </strong>
  );
}

function Em({ className, children, ...props }: TagProps) {
  const text = textOf(children);
  const isEditorialNote = text.trim().startsWith("[");
  if (isEditorialNote) {
    return (
      <em className={cn("not-italic text-[15px] text-inkMuted", className)} {...props}>
        {children}
      </em>
    );
  }
  return (
    <em className={cn("italic", className)} {...props}>
      {children}
    </em>
  );
}

function A({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isHeadingAnchor =
    typeof className === "string" && className.includes("heading-anchor-link");

  if (isHeadingAnchor) {
    return (
      <a
        href={href}
        aria-label="Link to this section"
        className="ml-2 inline-flex align-middle text-inkMuted opacity-0 transition-opacity hover:text-ink group-hover:opacity-100"
      >
        <LinkIcon size={16} aria-hidden />
      </a>
    );
  }

  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-ink",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function Blockquote({ className, children, ...props }: TagProps<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "my-8 space-y-2 border-l-2 border-hairline pl-6 italic text-inkBody [&_p]:mb-2 [&_p]:leading-[1.75] last:[&_p]:mb-0",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

function Table({ className, children, ...props }: TagProps<HTMLTableElement>) {
  return (
    <div className="my-10 overflow-x-auto">
      <table className={cn("w-full min-w-[480px] border-collapse text-[15px]", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

function Th({ className, children, ...props }: TagProps<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "border-b border-hairline bg-canvasAlt px-4 py-3 text-left font-semibold text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

function Td({ className, children, ...props }: TagProps<HTMLTableCellElement>) {
  return (
    <td
      className={cn("border-b border-hairline px-4 py-3 align-top text-inkBody", className)}
      {...props}
    >
      {children}
    </td>
  );
}

function Hr() {
  return <DottedDivider className="my-14" />;
}

function Figure({ className, children, ...props }: TagProps) {
  return (
    <figure className={cn("m-0 mb-6", className)} {...props}>
      {children}
    </figure>
  );
}

function Pre({ className, children, ...props }: TagProps<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-hairline bg-canvasAlt px-4 py-3 font-mono text-[14px] leading-[1.6] text-inkBody [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

function Code({ className, children, ...props }: TagProps<HTMLElement>) {
  return (
    <code
      className={cn(
        "rounded-md border border-hairline bg-canvasAlt px-1.5 py-0.5 font-mono text-[0.9em] text-inkBody",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  strong: Strong,
  em: Em,
  a: A,
  blockquote: Blockquote,
  table: Table,
  th: Th,
  td: Td,
  hr: Hr,
  figure: Figure,
  pre: Pre,
  code: Code,
};
