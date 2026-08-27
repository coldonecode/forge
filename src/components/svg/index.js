// SVG exercise animation registry.
// Maps exercise name (lowercase, matching catalog) → React component.
// Each component is an animated SVG stick figure showing the movement.
// Falls back to GIF when no SVG is registered.

import ChestPressSvg from "./ChestPressSvg";
import LatPulldownSvg from "./LatPulldownSvg";
import LegExtensionSvg from "./LegExtensionSvg";
import SquatSvg from "./SquatSvg";
import ShoulderPressSvg from "./ShoulderPressSvg";
import BicepCurlSvg from "./BicepCurlSvg";
import TricepsPushdownSvg from "./TricepsPushdownSvg";
import LateralRaiseSvg from "./LateralRaiseSvg";
import LegCurlSvg from "./LegCurlSvg";
import SeatedRowSvg from "./SeatedRowSvg";

export const SVG_ANIMATIONS = {
  "lever chest press":             ChestPressSvg,
  "lever incline chest press":     ChestPressSvg,
  "reverse grip machine lat pulldown": LatPulldownSvg,
  "lever front pulldown":          LatPulldownSvg,
  "lever leg extension":           LegExtensionSvg,
  "smith squat":                   SquatSvg,
  "lever shoulder press":          ShoulderPressSvg,
  "lever bicep curl":              BicepCurlSvg,
  "cable hammer curl (with rope)": BicepCurlSvg,
  "cable curl":                    BicepCurlSvg,
  "cable pushdown":                TricepsPushdownSvg,
  "lever triceps extension":       TricepsPushdownSvg,
  "lever lateral raise":           LateralRaiseSvg,
  "lever lying leg curl":          LegCurlSvg,
  "lever kneeling leg curl":       LegCurlSvg,
  "lever seated row":              SeatedRowSvg,
  "cable seated row":              SeatedRowSvg,
};

export function getSvgAnimation(exerciseName) {
  if (!exerciseName) return null;
  return SVG_ANIMATIONS[exerciseName.toLowerCase()] ?? null;
}
