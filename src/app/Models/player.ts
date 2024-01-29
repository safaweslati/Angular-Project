export const track = {
  name: "",
  album: {
    images: [
      { url: "" }
    ]
  },
  artists: [
    { name: "" }
  ]
}

export type PlayerState = {
  active: boolean;
  track: typeof track;
  paused: boolean;
};
