export interface Movie {
  name: string;
  releasedDate: string;
  posterUrl: string;
  // in minutes
  // duration: string;
  shouldWatchLater?: boolean;
};