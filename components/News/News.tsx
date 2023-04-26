import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchNews } from "@/store/newsSlice";
import styles from "./News.module.scss";
import Image from "next/image";

const News = () => {
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <section className={styles["news"]}>
      <div className={styles["news__main"]}>
        <a href={news[0]?.link} target="blank" className={styles["news__main-article"]}>
          <div className={styles["news__main-article-image-wrapper"]}>
            <Image alt="" src={news[0]?.image} fill />
          </div>
          <p className={styles["news__main-article-title"]}>{news[0]?.title}</p>
          <p className={styles["news__main-article-description"]}>{news[0]?.description}</p>
        </a>
        <ul className={styles["news__main-list"]}>
          {news?.slice(1, 3).map((article, index) => (
            <a href={article.link} target="blank" className={styles["news__main-list-article"]} key={index}>
              <div className={styles["news__main-list-article-image-wrapper"]}>
                <Image alt="" src={article.image} fill />
              </div>
              <p className={styles["news__main-list-article-title"]}>{article.title}</p>
              <p className={styles["news__main-list-article-description"]}>{article.description}</p>
            </a>
          ))}
        </ul>
      </div>
      <ul className={styles["news__list"]}>
        {news?.slice(4).map((article, index) => (
          <a href={article?.link} target="blank" className={styles["news__list-article"]} key={index}>
            <Image alt="" src={article.image} width={120} height={80} />
            <div>
              <p className={styles["news__list-article-title"]}>{article.title}</p>
              <p className={styles["news__list-article-description"]}>{article.description}</p>
            </div>
          </a>
        ))}
      </ul>
    </section>
  );
};

export default News;
