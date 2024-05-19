import { Nullable, StreamStatus } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  stream: Nullable<MediaStream>;
  status: StreamStatus;
};

type Actions = {
  setStream: (stream: Nullable<MediaStream>) => void;
  setStatus: (status: StreamStatus) => void;
  reset: () => void;
  getStream: () => void;
};

export const useStream = create<State & Actions>()(
  immer((set) => ({
    stream: null,
    status: "loading",
    setStream: (stream) =>
      set((state) => {
        state.stream = stream;
      }),
    setStatus: (status) =>
      set((state) => {
        state.status = status;
      }),

    reset: () =>
      set((state) => {
        state.stream = null;
        state.status = "loading";
      }),
    getStream: () =>
      set(async ({ stream, setStream, setStatus }) => {
        if (stream) return;
        console.log("Getting stream");
        try {
          const newstream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setStream(newstream);
          setStatus("success");
          console.log("Stream is ready");
        } catch (error) {
          setStatus("rejected");
          console.error("Access denied for audio and video stream", error);
        }
      }),
  })),
);
