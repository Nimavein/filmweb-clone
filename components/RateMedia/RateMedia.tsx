"use client";

import { useAuthentication } from "@/context/Authentication.context";
import { useProfileData } from "@/context/ProfileData.context";
import { MediaType } from "@/types/types";
import { EyeFilled, HeartFilled } from "@ant-design/icons";
import { Rate } from "antd";

import styles from "./RateMedia.module.scss";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

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
    getMediaRating,
    deleteRating,
    updateFavorite,
    checkIfMediaIsFavorite,
    updateWatchlist,
    checkIfMediaIsOnWatchlist,
  } = useProfileData();

  const mediaRating = getMediaRating(mediaType, mediaId);
  const isMediaFavorite = checkIfMediaIsFavorite(mediaType, mediaId);
  const isMediaOnWatchlist = checkIfMediaIsOnWatchlist(mediaType, mediaId);

  const onRateChange = async (value: number) => {
    if (value !== 0) {
      await updateRating(mediaType, mediaId, value);
    } else {
      await deleteRating(mediaType, mediaId);
    }
  };

  const onFavoriteChange = async (favorite: boolean) => {
    await updateFavorite(mediaType, mediaId, favorite);
  };

  const onWatchlistChange = async (watchlist: boolean) => {
    await updateWatchlist(mediaType, mediaId, watchlist);
  };

  return (
    isLoggedIn && (
      <div className={styles[baseCSSClassName]}>
        <div className={styles[`${baseCSSClassName}__top-bar`]}>
          <ProfileAvatar avatarPath={avatarPath} />
          <p className={styles[`${baseCSSClassName}__text`]}>I have seen it, my rating:</p>
          <HeartFilled
            className={styles[`${baseCSSClassName}__favorite-button`]}
            style={{ color: isMediaFavorite ? "red" : "gray" }}
            onClick={() => onFavoriteChange(!isMediaFavorite)}
          />
        </div>
        <Rate count={10} allowHalf value={mediaRating} onChange={onRateChange} />
        <button
          className={styles[`${baseCSSClassName}__watchlist-button`]}
          onClick={() => onWatchlistChange(!isMediaOnWatchlist)}
        >
          <EyeFilled style={{ color: isMediaOnWatchlist ? "#fadb14" : "gray" }} />
          <span>I want to watch it</span>
        </button>
      </div>
    )
  );
};

export default RateMedia;
