// Types for the WarpText.jsx component used by the hero
import type { CSSProperties, FC } from "react";

export interface WarpTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  color?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  letterSpacing?: number | string;
  lineHeight?: number | string;
  [option: string]: unknown;
}

declare const WarpText: FC<WarpTextProps>;
export default WarpText;
