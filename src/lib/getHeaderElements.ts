import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

let i = 0;
function getId() {
  return `${++i}`;
}

export function getHeaderElements(
  label: string[],
  options: { x: number; y: number; width: number }
): ExcalidrawElement[] {
  const id = getId();

  return [
    {
      type: "line",
      frameId: "1",
      version: 212,
      versionNonce: 1507092222,
      isDeleted: false,
      id: "czrA9lQhSm_4-2mmLpAFi" + id,
      fillStyle: "solid",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      angle: 0,
      x: options.x - 14,
      y: options.y + 5,
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
    {
      type: "text",
      frameId: "1",
      lineHeight: 1 as any,
      version: 497,
      versionNonce: 503791202,
      isDeleted: false,
      id: "K9z3BEDqjl0QRo2WTzupq" + id,
      fillStyle: "solid",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "#15aabf",
      height: 14 + ((label.length - 1) * 16),
      x: options.x,
      y: options.y - ((label.length - 1) * 16),
      width: options.width,
      seed: 2077381538,
      groupIds: [],
      roundness: null,
      boundElements: [],
      updated: 1647541200813,
      link: null,
      fontSize: 16,
      fontFamily: 2,
      text: label.join("\n"),
      baseline: 18 + ((label.length - 1) * 16),
      textAlign: "center",
      verticalAlign: "top",
      containerId: null,
      originalText: Array.isArray(label) ? label.join("\n") : label,
      locked: true,
    },
  ];
}
