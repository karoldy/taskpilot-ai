import { createLucideIcon } from "lucide-react";
import Checkbox, { type CheckboxProps } from "@mui/material/Checkbox";
// import VIcon from "@/components/atoms/VIcon";

export const Icn24X24CheckboxDefault = createLucideIcon("Icn_24x24_Checkbox_Default", [
  ["path",{"d":"M6 2.5h12A3.5 3.5 0 0121.5 6v12a3.5 3.5 0 01-3.5 3.5H6A3.5 3.5 0 012.5 18V6A3.5 3.5 0 016 2.5","key":"twca0k"}]
]);

export const Icn24X24CheckboxSelected = createLucideIcon("Icn_24x24_Checkbox_Selected", [
  ["path",{"d":"M20 7 9.838 17 4.5 11.5","key":"jo7xx0"}],
  ["path",{"d":"M6 2.5h12A3.5 3.5 0 0121.5 6v12a3.5 3.5 0 01-3.5 3.5H6A3.5 3.5 0 012.5 18V6A3.5 3.5 0 016 2.5","key":"twca0k"}]
]);

export default function (props: CheckboxProps) {
  return (
    <Checkbox
      {...props}
      icon={(
        <Icn24X24CheckboxDefault
          size={22}
        />
      )}
      checkedIcon={(
        <Icn24X24CheckboxSelected
          size={22}
        />
      )}
    />
  );
}
