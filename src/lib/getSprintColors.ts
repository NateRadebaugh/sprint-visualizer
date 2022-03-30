import { ThemeColors } from "./parseConfig";

export default function getSprintColors(
  label: string,
  isInProgress: boolean,
  themeColors: ThemeColors,
  currentSprintLabel: string | undefined,
  prevSprintLabel: string | undefined
): { borderColor: string; backgroundColor: string; textColor: string } {
  const isBacklog = label.toLowerCase() === "backlog";
  if (isBacklog) {
    return {
      borderColor: "#000",
      backgroundColor: themeColors.lighterPrimaryColor,
      textColor: "#000",
    };
  }

  if (label.toLowerCase() === currentSprintLabel?.toLowerCase()) {
    return {
      borderColor: "#000",
      backgroundColor: themeColors.currentBackgroundColor,
      textColor: themeColors.currentTextColor,
    };
  }

  if (label.toLowerCase() === prevSprintLabel?.toLowerCase()) {
    return {
      borderColor: "#000",
      backgroundColor: themeColors.prevBackgroundColor,
      textColor: themeColors.prevTextColor,
    };
  }

  return {
    borderColor: "#000",
    backgroundColor: themeColors.primaryColor,
    textColor: "#fff",
  };
}
