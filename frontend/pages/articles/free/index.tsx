import ArticleList from "@components/Articles/ArticleList";
import React from "react";

interface FreeProps {}

function Free({}: FreeProps) {
  return (
    <div>
      <ArticleList title="자유 게시판" category="free" />
    </div>
  );
}

export default Free;
