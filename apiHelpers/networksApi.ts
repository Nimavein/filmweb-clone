import { NetworkImagesDTO } from "@/types/types";
import { networkApi } from "./urlHelper";

export const getNetworkImages = async (networkId: number) => {
  try {
    const response = await fetch(networkApi.getNetworkImages(networkId));
    const imagesData: NetworkImagesDTO = await response.json();
    return imagesData;
  } catch (error: any) {
    console.error(error);
  }
};
