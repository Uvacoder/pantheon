import { Button, InputWrapper, Textarea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ALL_CATEGORY } from "../../../database/global";
import { ORANGE } from "../../colors";
import TextEditor from "../../util/textEditor/TextEditor";
import { submitPost } from "../SubmitPost";
import styles from "./SubmitText.module.css";
import request from "axios";
import { ErrorRes, findValidationMessage } from "../../../api/interfaces/common";

const SubmitPost = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");

    const [loading, setLoading] = useState(false);

    const submit = useCallback(
        () => {
            setLoading(true);
            submitPost({
                title: title,
                content: content,
                category: ALL_CATEGORY
            })
                .then((r) => {
                    setLoading(false);
                    document.location.href = "/post/" + r.data.id;
                })
                .catch((err) => {
                    if (request.isAxiosError(err) && err.response) {
                        const errData = err.response.data as ErrorRes;
                        setTitleError(findValidationMessage(errData, "title"));
                        setContentError(findValidationMessage(errData, "content"));
                    }
                    setLoading(false);
                });
        },
        [title, content]
    );

    return (
        <div>
           <Textarea
                className={styles.Title}
                placeholder={"Title"}
                minRows={1}
                maxRows={4}
                autosize
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
                error={titleError}
            />
            <InputWrapper
                className={styles.Editor}
                error={contentError}
            >
                <TextEditor
                    value={content} 
                    onChange={setContent}
                />
            </InputWrapper>
            <Button 
                className={styles.SubmitButton}
                style={{
                    backgroundColor: ORANGE
                }}
                loading={loading}
                onClick={submit}
            >
                Post
            </Button>
            <Button className={styles.DraftButton}>
                Draft
            </Button>
        </div>
    );
}

export default SubmitPost;