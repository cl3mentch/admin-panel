import { toast } from "sonner";
import { IGetErrorType } from "./types/commonType";
import { InsufficientFundsError } from "viem";

export const truncateString = (
  str: string,
  startNum: number,
  endNum: number
) => {
  if (!str) {
    return;
  }
  if (str.length <= startNum + endNum) {
    return str;
  }
  const startStr = str.slice(0, startNum);
  const endStr = str.slice(-endNum);
  return `${startStr}...${endStr}`;
};

export function filterInput(e: InputEvent): string | undefined {
  const target = e.target as HTMLInputElement;
  const inputAmount = target.value;
  const regex = /^[0-9]*\.?[0-9]*$/;

  if (regex.test(inputAmount)) {
    return inputAmount;
  }
}

export function formatLockedDate(timestamp: number) {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

export const onTranslateErrMsg = async (e: unknown | any) => {
  const error = e as IGetErrorType;
  const isInsufficientFundsError = error.walk(
    (e: unknown) => e instanceof InsufficientFundsError
  );

  if (isInsufficientFundsError) {
    toast.error(`Not Enough ETH Balance`);
  } else {
    toast.error(error.shortMessage);
  }
};
