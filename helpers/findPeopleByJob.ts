import { Crew, CrewMember } from "@/types/types";

export const findPeopleByJob = (job: string, crew: Crew = []) => {
  const filteredPeople = crew?.filter(
    (crewMember: CrewMember) => crewMember.job === job
  );
  const names = filteredPeople?.map((person) => person.name).join(", ");
  return names;
};
