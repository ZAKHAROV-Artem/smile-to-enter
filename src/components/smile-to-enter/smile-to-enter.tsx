"use client";
import { useStream } from "@/hooks/use-stream";
import { useEffect } from "react";
import * as faceapi from "face-api.js";
import { HomeScreen } from "../home";
import { Video } from "../video";
import { useHappy } from "@/hooks/use-happy";
import toast from "react-hot-toast";

export default function SmileToEnter() {
  const getStream = useStream((state) => state.getStream);
  const happy = useHappy((state) => state.happy);

  const loadFaceApi = async () => {};
  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      toast.success("Models have been loaded successfully");
      getStream();
    });
  }, [getStream]);

  return <>{happy ? <HomeScreen /> : <Video />}</>;
}
