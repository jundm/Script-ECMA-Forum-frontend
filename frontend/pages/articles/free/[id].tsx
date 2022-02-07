import ArticleView from "@components/Articles/ArticleView";
import React from "react";

interface ViewPageProps {
  id: number;
}

function ViewPage({ id }: ViewPageProps) {
  console.log(id, "id");

  return (
    <div>
      <ArticleView id={id} />
    </div>
  );
}

export const getServerSideProps = ({ params }: any) => {
  return {
    props: { id: params.id },
  };
};
export default ViewPage;
