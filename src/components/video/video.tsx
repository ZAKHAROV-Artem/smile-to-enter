"use client";
import * as faceapi from "face-api.js";
import { useHappy, useStream } from "@/store";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import Button from "@/components/ui/button";

export default function Video() {
  const ref = useRef<HTMLVideoElement>(null);

  const setHappy = useHappy((state) => state.setHappy);
  const { stream, status } = useStream(
    useShallow((state) => ({
      stream: state.stream,
      status: state.status,
    })),
  );

  useEffect(() => {
    if (!ref.current || !stream) return;
    ref.current.srcObject = stream;

    const detectFace = () => {
      const intervalId = setInterval(async () => {
        if (!ref.current) return;
        const detections = await faceapi
          .detectAllFaces(ref.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        if (detections[0]?.expressions.happy > 0.65) {
          clearInterval(intervalId);
          stream?.getVideoTracks()[0].stop();
          setHappy(true);
        }
      }, 200);
    };

    ref.current.addEventListener("play", detectFace);
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
          <Button onClick={() => setHappy(true)}>{`Let's go`}</Button>
        </div>
      )}
    </>
  );
}
