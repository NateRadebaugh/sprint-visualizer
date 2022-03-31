import { DateTime } from "@nateradebaugh/react-datetime";
import "@nateradebaugh/react-datetime/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import format from "date-fns/format";
import isDate from "date-fns/isDate";
import isValid from "date-fns/isValid";
import isWeekend from "date-fns/isWeekend";
import parse from "date-fns/parse";
import { useEffect, useMemo, useState } from "react";

function Page() {
  let gotHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));

  const gotHashParts: {
    primaryColor?: string;
    startDate?: string;
    startSprint?: string;
    weekdaysPerSprint?: string;
    text?: string;
  } = gotHash ? JSON.parse(gotHash) : {};

  const [primaryColor, setPrimaryColor] = useState(
    gotHashParts.primaryColor || "#15aabf"
  );
  const [startDate, setStartDate] = useState<
    string | number | Date | undefined
  >(gotHashParts.startDate || undefined);
  const [startSprint, setStartSprint] = useState<string | number | undefined>(
    gotHashParts.startSprint
  );
  const [weekdaysPerSprint, setWeekdaysPerSprint] = useState<string>(
    gotHashParts.weekdaysPerSprint || "10"
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

  const formattedStartDate = useMemo(() => {
    const startDateDate =
      startDate && typeof startDate === "string"
        ? parse(startDate, "yyyy-MM-dd", new Date())
        : isDate(startDate) && isValid(startDate)
        ? (startDate as Date)
        : undefined;
    return startDateDate && isValid(startDateDate)
      ? format(startDateDate, "yyyy-MM-dd")
      : "";
  }, [startDate]);

  const fullHash = useMemo(() => {
    return encodeURIComponent(
      JSON.stringify({
        primaryColor: primaryColor,
        startDate: formattedStartDate,
        startSprint: startSprint,
        weekdaysPerSprint,
        text,
      })
    );
  }, [primaryColor, formattedStartDate, startSprint, weekdaysPerSprint, text]);

  useEffect(() => {
    window.location.hash = fullHash;
  }, [fullHash]);

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
        <div className="d-none d-xl-block col-xl-4 pr-0">
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
          <div className="d-flex align-items-center">
            <label htmlFor="startDate" className="mb-0 mr-2 font-weight-bold">
              Start Date:
            </label>
            <DateTime
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e)}
              isValidDate={(e) => !isWeekend(e)}
              dateFormat="yyyy-MM-dd"
              timeFormat={false}
            />
          </div>
          <div className="d-flex align-items-center">
            <label htmlFor="startsprint" className="mb-0 mr-2 font-weight-bold">
              Start Sprint Label:
            </label>
            <input
              id="startsprint"
              type="text"
              value={startSprint}
              onChange={(e) => setStartSprint(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <label
              htmlFor="weekdayspersprint"
              className="mb-0 mr-2 font-weight-bold"
            >
              Weekdays Per Sprint:
            </label>
            <input
              id="weekdayspersprint"
              type="number"
              min={1}
              value={weekdaysPerSprint}
              onChange={(e) => setWeekdaysPerSprint(e.target.value)}
            />
          </div>
          <textarea
            className="form-control h-100 rounded-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="col-xl-8" style={{ height: "500px" }}>
          <iframe
            src={`/content?primaryColor=${encodeURIComponent(
              primaryColor
            )}&startDate=${encodeURIComponent(
              `${formattedStartDate}`
            )}&startSprint=${encodeURIComponent(
              `${startSprint}`
            )}&weekdaysPerSprint=${encodeURIComponent(
              weekdaysPerSprint
            )}&text=${encodeURIComponent(text)}`}
            className="w-100 h-100 border-0"
          />
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
