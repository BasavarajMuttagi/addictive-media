export type Profile = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  photoUrl: string;
  bio: string;
};

export type VideoType = {
  _id: string;
  folder: string;
  userid: string;
  description: string;
  title: string;
};

export type VideoGroup = {
  videos: VideoType[];
  user: Omit<Profile, "email" | "phone" | "bio">;
};
