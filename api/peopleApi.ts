/* eslint-disable @typescript-eslint/no-explicit-any */

export const getPopularPeople = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PERSON_API_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
  }
};
