import { DataColumn } from "./getData";
import pSBC from "./pSBC";

export interface ThemeColors {
  primaryColor: string;
  lighterPrimaryColor: string;
  currentBackgroundColor: string;
  currentTextColor: string;
  prevBackgroundColor: string;
  prevTextColor: string;
}

export interface DataConfig {
  columns: DataColumn[];
  themeColors: ThemeColors;
  allSprints: DataColumn['sprints'];
}

export default function parseConfig(
  text: string,
  primaryColor: string,
): DataConfig {
  const parts = text.trim().split(/(.+\s?.*):/gm);
  const columns: DataColumn[] = [];

  let column: DataColumn | undefined;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) {
      continue;
    }

    if (part.startsWith("\n")) {
      if (column) {
        column.sprints?.push(
          ...part
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean)
        );
      }
    } else {
      column = {
        label: part.split("\n"),
        sprints: [],
      };
      columns.push(column);
    }
  }

  const allSprints = columns.reduce((prev, curr) => {
    if (curr?.sprints) {
      prev.push(...curr.sprints);
    }
    return prev;
  }, [] as string[]);

  return {
    columns,
    themeColors: {
      primaryColor,
      lighterPrimaryColor: pSBC(0.7, primaryColor) ?? 'blue',
      currentBackgroundColor: "#ecfdf5",
      currentTextColor: "#064e3b",
      prevBackgroundColor: "#fff7ed",
      prevTextColor: "#7c2d12",
    },
    allSprints,
  };
}
