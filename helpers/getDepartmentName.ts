export const getDepartmentName = (known_for_department: string): string => {
  switch (known_for_department?.toLowerCase()) {
    case "acting":
      return "Actor";
    case "directing":
      return "Director";
    default:
      return known_for_department || "";
  }
}
