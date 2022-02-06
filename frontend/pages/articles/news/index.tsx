import axios from "axios";
import React from "react";

interface NewsProps {
  user: any;
}

function News({ user }: NewsProps) {
  console.log("user", user);
  const Title = user && user.title;
  return (
    <div>
      News
      <h1>{Title}</h1>
    </div>
  );
}
export async function getServerSideProps() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    if (res.status === 200) {
      const user = res.data;
      return { props: { user } };
    }
    return { props: {} };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}

export default News;
