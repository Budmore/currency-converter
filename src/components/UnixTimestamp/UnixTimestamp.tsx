export interface UnixTimestampProps {
  timestampInSeconds: number;
}

export const UnixTimestamp = ({ timestampInSeconds }: UnixTimestampProps) => {
  return new Date(timestampInSeconds * 1000).toLocaleString();
};
