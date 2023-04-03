import Image from "next/image";
import styles from "./MoviesListItem.module.scss";
import { Card } from "antd";
import Link from "next/link";

const { Meta } = Card;

interface MoviesListItemProps {
  title: string;
  id: number;
  overview: string;
  poster_path: string;
}

const MoviesListItem = ({
  title,
  overview,
  poster_path,
  id,
}: MoviesListItemProps) => {
  return (
    <Link href={`/movie/${id}`}>
      <Card
        className={styles["movies-list__item-card"]}
        hoverable
        bordered
        cover={
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${poster_path}`}
            alt=""
            width={200}
            height={200}
          />
        }
      >
        <Meta title={title} description={overview} />
      </Card>
    </Link>
  );
};

export default MoviesListItem;
