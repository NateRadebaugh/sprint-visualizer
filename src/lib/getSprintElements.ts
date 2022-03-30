import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import getSprintColors from "./getSprintColors";
import { ThemeColors } from "./parseConfig";

let i = 0;
function getId() {
  return `${++i}`;
}

export function getSprintElements(
  label: string,
  isInProgress: boolean,
  options: {
    x: number;
    y: number;
    width: number;
    themeColors: ThemeColors;
    currentSprintLabel: string | undefined;
    prevSprintLabel: string | undefined;
  }
) {
  const id = getId();
  const sprintElements: ExcalidrawElement[] = [];

  const sprintColors = getSprintColors(
    label,
    isInProgress,
    options.themeColors,
    options.currentSprintLabel,
    options.prevSprintLabel
  );

  const isBacklog = label.toLowerCase() === "backlog";
  sprintElements.push(
    {
      type: "rectangle",
      version: 1618,
      versionNonce: 958638654,
      isDeleted: false,
      id: "p39uSuqQQRhRPXydV52Ua" + id,
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      angle: 0,
      x: options.x - 4,
      y: options.y - 11,
      width: options.width,
      strokeColor: sprintColors.borderColor,
      height: isBacklog ? 100 : 44,
      seed: 1776908542,
      groupIds: ["1X9ScPxWPEYwGHYm3H63c" + id, "0ACwpDE8wKq4ML2TutE9r" + id],
      strokeSharpness: "sharp",
      boundElements: [
        {
          type: "arrow",
          id: "ZshxNfY4p4MCG4ccuY-KL",
        },
        {
          type: "arrow",
          id: "vxgNpxSyD3KAaOz9LPbJC",
        },
      ],
      updated: 1647541200814,
      link: null,
      backgroundColor: sprintColors.backgroundColor,
    },
    {
      type: "text",
      version: 1294,
      versionNonce: 468820130,
      isDeleted: false,
      id: "zGIedwLapTm5taZOm-mx7" + id,
      fillStyle: "solid",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      angle: 0,
      strokeColor: sprintColors.textColor,
      backgroundColor: "transparent",
      height: 18,
      seed: 507846114,
      groupIds: ["1X9ScPxWPEYwGHYm3H63c" + id, "0ACwpDE8wKq4ML2TutE9r" + id],
      strokeSharpness: "sharp",
      boundElements: [],
      updated: 1647541200814,
      link: null,
      fontSize: 16,
      fontFamily: 2,
      text: label,
      baseline: 14,
      textAlign: "center",
      verticalAlign: "top",
      containerId: null,
      originalText: label,
      width: options.width,
      x: options.x - 6,
      y: options.y + 2,
    }
  );

  if (isInProgress) {
    sprintElements.push(
      {
        type: "ellipse",
        version: 308,
        versionNonce: 233812606,
        isDeleted: false,
        id: "qx7PjLS4LVxUatkGlXOUu" + id,
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        angle: 0,
        x: options.x + 3,
        y: options.y + 33,
        strokeColor: sprintColors.borderColor,
        backgroundColor: "transparent",
        width: 4.814814814814895,
        height: 4.814814814814895,
        seed: 713926974,
        groupIds: ["-dR45V4qHFiwIjfTolqwj" + id, "0ACwpDE8wKq4ML2TutE9r" + id],
        strokeSharpness: "sharp",
        boundElements: [],
        updated: 1647541200814,
        link: null,
      },
      {
        type: "ellipse",
        version: 339,
        versionNonce: 1341733986,
        isDeleted: false,
        id: "LSAU1JPkrF_EYYpz17tfi" + id,
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        angle: 0,
        x: options.x + 8,
        y: options.y + 33,
        strokeColor: sprintColors.borderColor,
        backgroundColor: "transparent",
        width: 4.814814814814895,
        height: 4.814814814814895,
        seed: 1298862498,
        groupIds: ["-dR45V4qHFiwIjfTolqwj" + id, "0ACwpDE8wKq4ML2TutE9r" + id],
        strokeSharpness: "sharp",
        boundElements: [],
        updated: 1647541200814,
        link: null,
      },
      {
        type: "line",
        version: 309,
        versionNonce: 881898174,
        isDeleted: false,
        id: "eCtvBH3bjW1zxjFlkYnhJ" + id,
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        angle: 0,
        x: options.x - 7,
        y: options.y + 33,
        strokeColor: sprintColors.borderColor,
        backgroundColor: "transparent",
        width: options.width + 7,
        height: 0,
        seed: 1606537598,
        groupIds: ["-dR45V4qHFiwIjfTolqwj" + id, "0ACwpDE8wKq4ML2TutE9r" + id],
        strokeSharpness: "round",
        boundElements: [],
        updated: 1647541200814,
        link: null,
        startBinding: null,
        endBinding: null,
        lastCommittedPoint: null,
        startArrowhead: null,
        endArrowhead: null,
        points: [
          [0, 0],
          [options.width + 7, 0],
        ],
      },
      {
        type: "ellipse",
        version: 359,
        versionNonce: 538402850,
        isDeleted: false,
        id: "QZDaag8LC5YnNLEpwqr9G" + id,
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        angle: 0,
        x: options.x + options.width - 20,
        y: options.y + 33,
        strokeColor: sprintColors.borderColor,
        backgroundColor: "transparent",
        width: 4.814814814814895,
        height: 4.814814814814895,
        seed: 1394380130,
        groupIds: ["-dR45V4qHFiwIjfTolqwj" + id, "0ACwpDE8wKq4ML2TutE9r" + id],
        strokeSharpness: "sharp",
        boundElements: [],
        updated: 1647541200814,
        link: null,
      },
      {
        type: "ellipse",
        version: 390,
        versionNonce: 396864254,
        isDeleted: false,
        id: "n_jleSY13AwZnTIy1bGtL" + id,
        fillStyle: "solid",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        angle: 0,
        x: options.x + options.width - 15,
        y: options.y + 33,
        strokeColor: sprintColors.borderColor,
        backgroundColor: "transparent",
        width: 4.814814814814895,
        height: 4.814814814814895,
        seed: 1690759614,
        groupIds: ["-dR45V4qHFiwIjfTolqwj" + id, "0ACwpDE8wKq4ML2TutE9r" + id],
        strokeSharpness: "sharp",
        boundElements: [],
        updated: 1647541200814,
        link: null,
      }
    );
  }

  return sprintElements;
}
