import type { SyntheticEvent } from "react";

export interface IClickOptions {
  excludedElementsSelector?: string[];
}

export interface IClickOutside {
  onClickOutside: (e?: SyntheticEvent) => void;
  ref: { current: HTMLElement | null };
  options?: IClickOptions;
}
