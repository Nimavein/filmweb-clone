import { News as NewsType } from "@/types/types";
import styles from "./News.module.scss";
import Image from "next/image";

interface NewsProps {
  news: NewsType;
}

const News = ({ news }: NewsProps) => {
  const listArticleImageWidth = 160;
  const listArticleImageHeight = listArticleImageWidth / 1.73;
  return (
    <section className={styles["news"]}>
      <div className={styles["news__main"]}>
        <a
          href={news[0]?.link}
          target="blank"
          className={styles["news__main-article"]}
        >
          <div className={styles["news__main-article-image-wrapper"]}>
            <Image
              alt=""
              src={news[0]?.mainImage?.url}
              fill
              style={{ objectFit: "cover" }}
            />
            <p
              className={styles["news__main-article-title"]}
              dangerouslySetInnerHTML={{ __html: news[0]?.title }}
            />
          </div>
          {/*           <p className={styles["news__main-article-description"]}>
            {news[0]?.description}
          </p>
  */}
        </a>
        <ul className={styles["news__main-list"]}>
          {news?.slice(1, 3).map((article, index) => (
            <li key={index}>
              <a
                href={article.link}
                target="blank"
                className={styles["news__main-list-article"]}
              >
                <div
                  className={styles["news__main-list-article-image-wrapper"]}
                >
                  <Image
                    alt=""
                    src={article.mainImage?.url}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p
                  className={styles["news__main-list-article-title"]}
                  dangerouslySetInnerHTML={{ __html: article?.title }}
                />
                {/*

                <ReadMoreText
                  text={article.description}
                  showTextLength={200}
                  textClassName={styles["news__main-list-article-description"]}
                />
                */}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles["news__list"]}>
        {news?.slice(4, 10).map((article, index) => (
          <li key={index}>
            <a
              href={article?.link}
              target="blank"
              className={styles["news__list-article"]}
            >
              <Image
                alt=""
                src={article.mainImage?.url}
                width={listArticleImageWidth}
                height={listArticleImageHeight}
              />
              <div>
                <p
                  className={styles["news__list-article-title"]}
                  dangerouslySetInnerHTML={{ __html: article?.title }}
                />
                {/*

                <ReadMoreText
                  text={article.description}
                  showTextLength={200}
                  textClassName={styles["news__list-article-description"]}
                />
*/}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
