import DOMPurify from "isomorphic-dompurify";

export const options = {
    FORBID_TAGS: ["style", "script"]
};

export const sanitizeHTML = (dirty: string) => ({
    __html: sanitizeString(dirty)
})

export function sanitizeString(dirty: string) {
    return DOMPurify.sanitize(
        dirty, 
        { ...options }
    );
}