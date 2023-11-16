import { getNews } from "@/apiHelpers";
import News from "@/components/News/News";
import React from "react";

const NewsPage = async () => {
  const news = await getNews();

  return <main>{news && <News news={news} />}</main>;
};

export default NewsPage;
