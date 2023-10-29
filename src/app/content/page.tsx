"use client";

import { Excalidraw as RawExcalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import isValid from "date-fns/isValid";
import parse from "date-fns/parse";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import getData from "../../lib/getData";
import getRelativeSprintLabels from "../../lib/getRelativetSprintLabels";
import parseConfig from "../../lib/parseConfig";

export default function Content() {
  const searchParams = useSearchParams();
  const rawPrimaryColor = searchParams.get("primaryColor");
  const rawStartDate = searchParams.get("startDate");
  const rawStartSprint = searchParams.get("startSprint");
  const rawWeekdaysPerSprint = searchParams.get("weekdaysPerSprint");
  const text = searchParams.get("text");

  const primaryColor = rawPrimaryColor || "#ffc107";
  const parsedDate = parse(`${rawStartDate}`, "yyyy-MM-dd", new Date());
  const startDate =
    rawStartDate && isValid(parsedDate) ? parsedDate : undefined;
  const startSprint =
    typeof rawStartSprint === "string" && rawStartSprint !== ""
      ? rawStartSprint
      : undefined;
  const weekdaysPerSprint =
    Number(rawWeekdaysPerSprint) > 0 ? Number(rawWeekdaysPerSprint) : undefined;

  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);

  const data = useMemo(() => {
    if (text) {
      const parsedConfig = parseConfig(`${text}`, `${primaryColor}`);

      const { allSprints } = parsedConfig;

      const { currentSprintLabel, prevSprintLabel } =
        getRelativeSprintLabels(
          allSprints,
          startDate,
          startSprint,
          weekdaysPerSprint
        ) ?? {};

      return getData({ ...parsedConfig, currentSprintLabel, prevSprintLabel });
    }

    return undefined;
  }, [primaryColor, startDate, startSprint, text, weekdaysPerSprint]);

  useEffect(() => {
    if (data) {
      excalidrawRef.current?.updateScene(data);
    }
  }, [data]);

  const [Excalidraw, setComp] = useState<typeof RawExcalidraw | null>(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then(({ Excalidraw }) =>
      setComp(Excalidraw)
    );
  }, []);

  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      onWheelCapture={(e) => {
        // Stop Excalidraw from hijacking scroll
        e.stopPropagation();
      }}
    >
      {Excalidraw && data && (
        <Excalidraw
          ref={excalidrawRef}
          initialData={data}
          viewModeEnabled={true}
          zenModeEnabled={true}
          theme="light"
          name="Sprint Snapshot"
        />
      )}
    </div>
  );
}
