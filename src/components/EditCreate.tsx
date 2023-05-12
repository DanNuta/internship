import { useState, useEffect } from "react";

import { Input, Form, Textarea, Button } from "@/components";
import { errorBlog } from "@/utils";
import { PostProps, EditCreatePropsTypes } from "@/types";

interface EditCreateProps {
  posts?: PostProps;
  onClick: (data: EditCreatePropsTypes) => void;
}

export const EditPost: React.FC<EditCreateProps> = ({ onClick, posts }) => {
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [linkImage, setLinkImage] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();

  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const [errorLinkImage, setErrorLinkImage] = useState<string | null>(null);
  const [errorData, setErrorData] = useState<string | null>(null);

  function getDataWithDay(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const date = new Date(value);
    const dayOfTheWeek = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const selectedDayOfWeek = days[dayOfTheWeek];
    const data = `${value} ${selectedDayOfWeek}`;
    setDate(data);
  }

  useEffect(() => {
    if (posts === undefined) return;
    setTitle(posts.title);
    setDescription(posts.description);
    setLinkImage(posts.linkImage);
    setDate(posts.date);
  }, [posts]);

  function sendPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorTitle(!title ? `${errorBlog.title}` : null);
    setErrorDescription(!description ? `${errorBlog.description}` : null);
    setErrorLinkImage(!linkImage ? `${errorBlog.link}` : null);
    setErrorData(!date ? `${errorBlog.data}` : null);

    const errorInput = !title || !description || !linkImage || !date;

    if (errorInput) return;

    const postObj: EditCreatePropsTypes = {
      title,
      description,
      linkImage,
      date,
    };

    onClick(postObj);

    setTitle("");
    setDescription("");
    setLinkImage("");
    setDate("");
  }

  return (
    <Form onSendFn={sendPost}>
      <Input
        type="text"
        value={title || ""}
        errorMsj={errorTitle}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        id="title"
        placeholder="Titlul pentru blog"
      />

      <Textarea
        value={description || ""}
        errorMsj={errorDescription}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        id="descriere"
      />

      <Input
        type="date"
        errorMsj={errorData}
        onChange={getDataWithDay}
        label="Date"
        id="data"
      />

      <Input
        type="text"
        placeholder="Link la imagine"
        value={linkImage || ""}
        errorMsj={errorLinkImage}
        onChange={(e) => setLinkImage(e.target.value)}
        label="Link la imagine"
        id="image"
      />

      <Button type="primary">Save</Button>
    </Form>
  );
};
