import { useState, useRef, useEffect, useMemo } from "react";
import getData from "../lib/getData";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

import "bootstrap/dist/css/bootstrap.min.css";
import parseConfig from "../lib/parseConfig";

function Page() {
  let hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const [text, setText] = useState(
    hash ||
      `Backlog:
backlog

development:

dev:

qa:

uat:

prod:
`
  );
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    window.location.hash = encodeURIComponent(text);
  }, [text]);

  const data = useMemo(() => {
    const parsedConfig = parseConfig(text);
    return getData(parsedConfig);
  }, [text]);

  useEffect(() => {
    excalidrawRef.current?.updateScene(data);
  }, [data]);

  const [Excalidraw, setComp] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setComp(comp.default));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-none d-xl-block col-xl-2 pr-0">
          <textarea
            className="form-control h-100 rounded-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="col-xl-10" style={{ height: "500px" }}>
          {Excalidraw && (
            <Excalidraw
              ref={excalidrawRef}
              initialData={data}
              viewModeEnabled={true}
              zenModeEnabled={true}
              theme={theme}
              name="Custom name of drawing"
              UIOptions={{ canvasActions: { loadScene: false } }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (ready) {
    return <Page />;
  }

  return null;
}
