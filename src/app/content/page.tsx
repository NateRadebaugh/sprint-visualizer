"use client";

import {
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "@excalidraw/excalidraw/types/types";
import isValid from "date-fns/isValid";
import parse from "date-fns/parse";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  ComponentType,
  RefObject,
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";
import getData from "../../lib/getData";
import getRelativeSprintLabels from "../../lib/getRelativetSprintLabels";
import parseConfig from "../../lib/parseConfig";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
) as ComponentType<
  ExcalidrawProps & { ref: RefObject<ExcalidrawImperativeAPI> }
>;

function Content() {
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
          UIOptions={{ canvasActions: { loadScene: false } }}
        />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
