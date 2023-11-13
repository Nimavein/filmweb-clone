/* eslint-disable @typescript-eslint/no-explicit-any */

import { PersonDetails } from "@/types/types";

export const getPersonData = async (personId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}${personId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images,movie_credits,tv_credits,tagged_images`
    );
    const personData: PersonDetails = await response.json();
    return personData;
  } catch (error: any) {
    console.error(error);
  }
};
