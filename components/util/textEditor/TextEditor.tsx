import React from "react";
import type { RichTextEditorProps } from "@mantine/rte";
import { Loader } from "react-feather";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import('@mantine/rte'), {
    ssr: false,
    loading: () => null
});

export default TextEditor;