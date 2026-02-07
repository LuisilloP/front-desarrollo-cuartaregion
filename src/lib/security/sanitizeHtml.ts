import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "a",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "code"
] as const;

export const sanitizeCmsHtml = (value: string): string =>
  sanitizeHtml(value, {
    allowedTags: [...allowedTags],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"]
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
    disallowedTagsMode: "discard",
    transformTags: {
      a: (tagName, attribs) => {
        const target = attribs.target === "_blank" ? "_blank" : "";
        const rel = target ? "noopener noreferrer" : attribs.rel;
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(target ? { target } : {}),
            ...(rel ? { rel } : {})
          }
        };
      }
    }
  });
