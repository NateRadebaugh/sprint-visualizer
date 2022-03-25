import { DataColumn } from "./getData";
import pSBC from "./pSBC";

export interface ThemeColors {
  primaryColor: string;
  lighterPrimaryColor: string;
}

export default function parseConfig(
  text: string,
  primaryColor: string
): { columns: DataColumn[]; themeColors: ThemeColors } {
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

  return {
    columns,
    themeColors: { primaryColor, lighterPrimaryColor: pSBC(0.7, primaryColor) },
  };
}
