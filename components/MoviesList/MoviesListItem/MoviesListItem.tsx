import Image from "next/image";
import styles from "./MoviesListItem.module.scss";
import { Card } from "antd";

const { Meta } = Card;

interface MoviesListItemProps {
  title: string;
  id: number;
  overview: string;
  posterPath: string;
}

const MoviesListItem = ({ title, overview, posterPath }: MoviesListItemProps) => {
  return (
    <Card
      className={styles["movies-list__item-card"]}
      hoverable
      bordered
      cover={
        <Image
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          alt=""
          width={200}
          height={200}
        />
      }
    >
      <Meta title={title} description={overview} />
    </Card>
  );
};

export default MoviesListItem;
