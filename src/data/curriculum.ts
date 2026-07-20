import { units } from "./units-1-2";
import { units34 } from "./units-3-4";
import { units56 } from "./units-5-6";
import { units78 } from "./units-7-8";
import { Unit } from "./types";

export const allUnits: Unit[] = [...units, ...units34, ...units56, ...units78];

export const getUnit = (id: number) => allUnits.find((u) => u.id === id);
export const getUnitsByWeek = (week: number) => allUnits.filter((u) => u.week === week);

export * from "./types";
