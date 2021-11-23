import dynamic from "next/dynamic";
import React from "react";
import Markup from "../../markup/Markup";

const Rte = dynamic(() => import('@mantine/rte'), {
    ssr: false,
    loading: () => null
});

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: Props) => {
    return (
        <Markup>
            <Rte
                value={value}
                onChange={onChange}
                controls={[
                    ["bold", "italic", "underline", "link", "image", "strike", "blockquote"],
                    ["unorderedList", "h1", "h2", "h3"],
                    ["sup", "sub"],
                ]}
            />
        </Markup>
    );
}

export default TextEditor;