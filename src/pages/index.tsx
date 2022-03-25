import { useState, useRef, useEffect, useMemo } from "react";
import getData from "../lib/getData";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import parseConfig from "../lib/parseConfig";

import "bootstrap/dist/css/bootstrap.min.css";

function Page() {
  let gotHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));

  const gotHashParts: {
    primaryColor: string;
    text: string;
  } = gotHash ? JSON.parse(gotHash) : {};
  
  const [primaryColor, setPrimaryColor] = useState(
    gotHashParts.primaryColor || "#15aabf"
  );

  const [text, setText] = useState(
    gotHashParts.text ||
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

  const fullHash = useMemo(() => {
    return encodeURIComponent(
      JSON.stringify({ primaryColor: primaryColor, text: text })
    );
  }, [primaryColor, text]);

  useEffect(() => {
    window.location.hash = fullHash;
  }, [fullHash]);

  const data = useMemo(() => {
    const parsedConfig = parseConfig(text, primaryColor);
    return getData(parsedConfig);
  }, [primaryColor, text]);

  useEffect(() => {
    excalidrawRef.current?.updateScene(data);
  }, [data]);

  const [Excalidraw, setComp] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => setComp(comp.default));
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-none d-xl-flex align-items-center">
        <label htmlFor="primaryColor" className="mb-0 mr-2 font-weight-bold">
          URL:
        </label>
        <input
          type="text"
          className="w-100 form-control mb-1"
          disabled
          value={`${window.location.origin}/#${fullHash}`}
        />
      </div>

      <div className="row">
        <div className="d-none d-xl-block col-xl-2 pr-0">
          <div className="d-flex align-items-center">
            <label
              htmlFor="primaryColor"
              className="mb-0 mr-2 font-weight-bold"
            >
              Theme:
            </label>
            <input
              type="color"
              id="primaryColor"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>
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
