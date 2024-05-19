"use client";

import * as faceapi from "face-api.js";
import { useEffect } from "react";
import { useStream, useHappy } from "@/store";
import { HomeScreen } from "../home";
import { Video } from "../video";
import toast from "react-hot-toast";

export default function SmileToEnter() {
  const getStream = useStream((state) => state.getStream);
  const happy = useHappy((state) => state.happy);

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      toast.success("Models have been loaded successfully");
      getStream();
    });
  }, [getStream]);

  return happy ? <HomeScreen /> : <Video />;
}
