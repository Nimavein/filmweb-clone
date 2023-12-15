"use client";

import { useAuthentication } from "@/context/Authentication.context";
import { MediaType } from "@/types/types";
import { EyeFilled, HeartFilled } from "@ant-design/icons";
import { Rate } from "antd";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import useMediaAccountStates from "@/hooks/useMediaAccountStates";

import styles from "./RateMedia.module.scss";

interface RateMediaProps {
  mediaType: MediaType;
  mediaId: number;
}

const baseCSSClassName = "rate-media";

const RateMedia = ({ mediaType, mediaId }: RateMediaProps) => {
  const { isLoggedIn, accountData } = useAuthentication();
  const avatarPath = accountData?.avatar?.tmdb?.avatar_path;
  const {
    updateRating,
    deleteRating,
    updateFavorite,
    updateWatchlist,
    favorite,
    watchlist,
    rating,
  } = useMediaAccountStates(mediaType, mediaId);

  const onRateChange = async (rating: number) => {
    if (rating !== 0) {
      await updateRating(rating);
    } else {
      await deleteRating();
    }
  };

  const onFavoriteChange = async (favorite: boolean) => {
    await updateFavorite(favorite);
  };

  const onWatchlistChange = async (watchlist: boolean) => {
    await updateWatchlist(watchlist);
  };

  return (
    isLoggedIn && (
      <div className={styles[baseCSSClassName]}>
        <div className={styles[`${baseCSSClassName}__top-bar`]}>
          <ProfileAvatar avatarPath={avatarPath} />
          <p className={styles[`${baseCSSClassName}__text`]}>
            I have seen it, my rating:
          </p>
          <HeartFilled
            className={styles[`${baseCSSClassName}__favorite-button`]}
            style={{ color: favorite ? "red" : "gray" }}
            onClick={() => onFavoriteChange(!favorite)}
          />
        </div>
        <Rate count={10} allowHalf value={rating} onChange={onRateChange} />
        <button
          className={styles[`${baseCSSClassName}__watchlist-button`]}
          onClick={() => onWatchlistChange(!watchlist)}
        >
          <EyeFilled style={{ color: watchlist ? "#fadb14" : "gray" }} />
          <span>I want to watch it</span>
        </button>
      </div>
    )
  );
};

export default RateMedia;
