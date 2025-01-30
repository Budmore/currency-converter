export interface UnixTimestampProps {
  timestampInSeconds: number;
}

const SECONDS_TO_MILISECONDS_FACTOR = 1000;

export const UnixTimestamp = ({ timestampInSeconds }: UnixTimestampProps) => {
  return new Date(
    timestampInSeconds * SECONDS_TO_MILISECONDS_FACTOR
  ).toLocaleString();
};
