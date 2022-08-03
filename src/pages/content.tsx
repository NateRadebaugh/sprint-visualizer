import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import isValid from "date-fns/isValid";
import parse from "date-fns/parse";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import getData from "../lib/getData";
import getRelativeSprintLabels from "../lib/getRelativetSprintLabels";
import parseConfig from "../lib/parseConfig";

export function Content() {
  const { query } = useRouter();
  const {
    primaryColor: rawPrimaryColor,
    startDate: rawStartDate,
    startSprint: rawStartSprint,
    weekdaysPerSprint: rawWeekdaysPerSprint,
    text,
  } = query;
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

      const { currentSprintLabel, prevSprintLabel } = getRelativeSprintLabels(
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
    excalidrawRef.current?.updateScene(data);
  }, [data]);

  const [Excalidraw, setComp] = useState(null);
  useEffect(() => {
    console.log("render thingy")
    import("@excalidraw/excalidraw").then(({Excalidraw}) => setComp(Excalidraw));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {Boolean(Excalidraw && data) && (
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
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (ready) {
    return <Content />;
  }

  return null;
}
