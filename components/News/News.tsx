import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchNews } from "@/store/newsSlice";
import styles from "./News.module.scss";
import Image from "next/image";
import ReadMoreText from "../ReadMoreText/ReadMoreText";

const News = () => {
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (news?.length === 0) dispatch(fetchNews());
  }, []);

  return (
    <section className={styles["news"]}>
      <div className={styles["news__main"]}>
        <a href={news[0]?.link} target="blank" className={styles["news__main-article"]}>
          <div className={styles["news__main-article-image-wrapper"]}>
            <Image alt="" src={news[0]?.image} fill />
            <p className={styles["news__main-article-title"]}>{news[0]?.title}</p>
          </div>
          <p className={styles["news__main-article-description"]}>{news[0]?.description}</p>
        </a>
        <ul className={styles["news__main-list"]}>
          {news?.slice(1, 3).map((article, index) => (
            <li key={index}>
              <a href={article.link} target="blank" className={styles["news__main-list-article"]}>
                <div className={styles["news__main-list-article-image-wrapper"]}>
                  <Image alt="" src={article.image} fill />
                </div>
                <p className={styles["news__main-list-article-title"]}>{article.title}</p>
                <ReadMoreText
                  text={article.description}
                  showTextLength={200}
                  textClassName={styles["news__main-list-article-description"]}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles["news__list"]}>
        {news?.slice(4).map((article, index) => (
          <li key={index}>
            <a href={article?.link} target="blank" className={styles["news__list-article"]}>
              <Image alt="" src={article.image} width={120} height={80} />
              <div>
                <p className={styles["news__list-article-title"]}>{article.title}</p>
                <ReadMoreText
                  text={article.description}
                  showTextLength={200}
                  textClassName={styles["news__list-article-description"]}
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
