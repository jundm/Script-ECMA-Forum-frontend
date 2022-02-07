import ArticleView from "@components/Articles/ArticleView";
import { fetcher } from "@utils/Hook/useFetch";
import React from "react";
import { SWRConfig } from "swr";

interface ViewPageProps {
  id: number;
  // article: {
  //   id: number;
  //   category: string;
  //   author: {
  //     username: string;
  //     name: string;
  //     avatar_url: string;
  //   };
  //   title: string;
  //   content: string;
  //   tag_set: string[];
  //   created_at: string;
  //   updated_at: string;
  // };
}

function ViewPage({ id }: ViewPageProps) {
  console.log(id, "id");

  return (
    <SWRConfig>
      <div>
        <ArticleView id={id} />
      </div>
    </SWRConfig>
  );
}

export const getServerSideProps = async ({ params }: any) => {
  const id = params.id;
  const url = `posts/api/${id}`;
  const article = await fetcher(url);

  return {
    props: {
      id,
      fallback: {
        [url]: article,
      },
    },
  };
};
export default ViewPage;
