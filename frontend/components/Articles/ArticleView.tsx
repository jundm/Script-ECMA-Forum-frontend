import useFetch from "@utils/Hook/useFetch";
import React from "react";

interface ArticleViewProps {
  id: number;
}

function ArticleView({ id }: ArticleViewProps) {
  const { data, error } = useFetch(`posts/api/${id}`);
  if (error) {
    return error.message;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <hr />
      <p>{data?.content}</p>
    </div>
  );
}

export default ArticleView;
