import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import { DataConfig } from "./parseConfig";

export default function getRelativeSprintLabels(
  allSprints: DataConfig["allSprints"],
  startDate: Date | undefined,
  startSprint: string | undefined,
  weekdaysPerSprint: number | undefined
):
  | {
      currentSprintLabel: string | undefined;
      prevSprintLabel: string | undefined;
    }
  | undefined {
  if (!startDate || !weekdaysPerSprint || startSprint === undefined) {
    return undefined;
  }

  const startSprintIndex = allSprints.findIndex((x) => x === startSprint);

  const daysSinceStart = differenceInBusinessDays(new Date(), startDate);
  const sprintsSinceStart = Math.floor(daysSinceStart / weekdaysPerSprint);

  const currentSprintIndex = startSprintIndex - sprintsSinceStart;

  const currentSprintLabel = allSprints[currentSprintIndex];
  const prevSprintLabel = allSprints[currentSprintIndex + 1];

  return { currentSprintLabel, prevSprintLabel };
}
