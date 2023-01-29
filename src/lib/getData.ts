import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { getHeaderElements } from "./getHeaderElements";
import { getSprintElements } from "./getSprintElements";
import { ThemeColors } from "./parseConfig";

export interface DataColumn {
  label: string[];
  sprints?: string[];
}

const offsets = {
  x: 1,
  y: 12,
};

export interface GetDataOptions {
  columns: DataColumn[],
  themeColors: ThemeColors,
  currentSprintLabel: string | undefined,
  prevSprintLabel: string | undefined
}

export default function getData({
  columns,
  themeColors,
  currentSprintLabel,
  prevSprintLabel,
}: GetDataOptions): {
  elements?: readonly ExcalidrawElement[] | null | undefined;
} {
  const numColumns = columns?.length ?? 0;
  const maxColumnLength = Math.max(
    ...columns.map((x) =>
      Math.max(
        ...x.label.map((y) => y.length),
        ...x.sprints.map((z) => z.length + 3.5)
      )
    )
  );
  const columnWidth = maxColumnLength * 10;
  const elements: ExcalidrawElement[] = [
    // Header
    {
      id: "it5t6bjL2Y_Zhmnu5I3Nw",
      type: "text",
      x: 0,
      y: 0,
      width: 143,
      height: 23,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "transparent",
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      roundness: null,
      seed: 1988191759,
      version: 17,
      versionNonce: 809445135,
      isDeleted: false,
      boundElements: null,
      updated: 1647623907399,
      link: null,
      text: "Sprint Snapshot",
      fontSize: 20,
      fontFamily: 2,
      textAlign: "left",
      verticalAlign: "top",
      baseline: 18,
      containerId: null,
      originalText: "Sprint Snapshot",
      locked: true,
    },

    // Long line for header row
    {
      type: "line",
      version: 379,
      versionNonce: 796189730,
      isDeleted: false,
      id: "r3RBUhrUo3vA2IYpHfumZ",
      fillStyle: "solid",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      angle: 0,
      x: offsets.x + 3,
      y: offsets.y + 31,
      strokeColor: "#000000",
      backgroundColor: "#15aabf",
      width: numColumns * columnWidth,
      height: 0,
      seed: 1578930530,
      groupIds: [],
      roundness: null,
      boundElements: [],
      updated: 1647541200813,
      link: null,
      startBinding: null,
      endBinding: null,
      lastCommittedPoint: null,
      startArrowhead: null,
      endArrowhead: null,
      points: [
        [0, 0],
        [numColumns * columnWidth, 0],
      ],
      locked: true,
    },

    // Rightmost header line
    {
      type: "line",
      version: 212,
      versionNonce: 1507092222,
      isDeleted: false,
      id: "czrA9lQhSm_4-2mmLpAFi",
      fillStyle: "solid",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      angle: 0,
      x: offsets.x + 4 + numColumns * columnWidth,
      y: offsets.y + 15,
      strokeColor: "#000000",
      backgroundColor: "#15aabf",
      width: 0,
      height: 30,
      seed: 213462462,
      groupIds: [],
      roundness: null,
      boundElements: [],
      updated: 1647541200813,
      link: null,
      startBinding: null,
      endBinding: null,
      lastCommittedPoint: null,
      startArrowhead: null,
      endArrowhead: null,
      points: [
        [0, 0],
        [0, 30],
      ],
      locked: true,
    },
  ];

  if (columns) {
    for (let i = 0; i < numColumns; i++) {
      const column = columns[i];
      const isFirstColumn = i === 0;
      const isLastColumn = i === numColumns - 1;
      const headerElements = getHeaderElements(column.label, {
        x: offsets.x + 15 + i * (columnWidth + 1),
        y: offsets.y + 10,
        width: columnWidth - 30,
      });
      elements.push(...headerElements);

      const sprints = column.sprints;
      if (sprints) {
        for (let j = 0; j < sprints.length; j++) {
          const sprint = sprints[j];
          elements.push(
            ...getSprintElements(sprint, !isFirstColumn && !isLastColumn, {
              x: offsets.x + 25 + i * (columnWidth + 1),
              y: offsets.y + 52 + j * 56,
              width: columnWidth - 40,
              themeColors: themeColors,
              currentSprintLabel,
              prevSprintLabel,
            })
          );
        }
      }
    }
  }

  return { elements };
}
