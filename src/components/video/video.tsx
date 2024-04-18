"use client";
import { useStream } from "@/hooks/use-stream";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import * as faceapi from "face-api.js";
import { useHappy } from "@/hooks/use-happy";

export default function Video() {
  const ref = useRef<HTMLVideoElement>(null);

  const { stream, status } = useStream(
    useShallow((state) => ({
      stream: state.stream,
      status: state.status,
    })),
  );
  const setHappy = useHappy((state) => state.setHappy);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.srcObject = stream;

    ref.current.addEventListener("play", () => {
      const intervalId = setInterval(async () => {
        if (!ref.current) return;
        const detections = await faceapi
          .detectAllFaces(ref.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        console.log(detections);
        if (detections[0]?.expressions.happy === 1) {
          clearInterval(intervalId);
          stream?.getVideoTracks()[0].stop();
          setHappy(true);
        }
      }, 100);
    });
  }, [stream, setHappy]);
  return (
    <>
      {status === "success" && (
        <video
          ref={ref}
          autoPlay
          muted
          className="aspect-video h-[90%] -scale-x-100 self-end rounded-xl object-cover sm:self-center"
        />
      )}
      {status === "loading" && <div>I want to look at you 🤗</div>}
      {status === "rejected" && (
        <div>
          <div>
            Okey dokey, I believe you are happy. You can see my website 🔑
          </div>

          <button
            className="mt-5 rounded-lg bg-secondary p-3"
            onClick={() => {
              setHappy(true);
            }}
          >
            {`Let's go`}
          </button>
        </div>
      )}
    </>
  );
}
