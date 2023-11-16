"use client";

import { useProfileData } from "@/context/ProfileData.context";
import { MediaType } from "@/types/types";
import { EyeFilled, HeartFilled } from "@ant-design/icons";
import { Rate } from "antd";

interface RateMediaProps {
  mediaType: MediaType;
  mediaId: number;
}

const RateMedia = ({ mediaType, mediaId }: RateMediaProps) => {
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
    <div>
      <Rate count={10} allowHalf value={mediaRating} onChange={onRateChange} />
      <HeartFilled
        style={{ color: isMediaFavorite ? "red" : "gray" }}
        onClick={() => onFavoriteChange(!isMediaFavorite)}
      />
      <EyeFilled
        style={{ color: isMediaOnWatchlist ? "yellow" : "gray" }}
        onClick={() => onWatchlistChange(!isMediaOnWatchlist)}
      />
    </div>
  );
};

export default RateMedia;
