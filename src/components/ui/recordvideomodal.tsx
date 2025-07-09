"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Card } from "./card";
import { toast } from "sonner";
import { Button } from "./button";
import { useFileStore } from "@/utils/zustand/testimonialsformstore";

export const RecordVideo = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [isRecorded, setIsRecorded] = useState<boolean>(false);
	const mediaStream = useRef<MediaStream | null>(null);
	const recorederRef = useRef<MediaRecorder | null>(null);
	const videoChunck = useRef<Blob[]>([]);

    const { setVideoFile } = useFileStore()


	const startCamera = async () => {
		if (!videoRef.current) {
			toast.error(
				"No video Ref available Try to upload video or Refresh the page",
			);
			return;
		}

        if(mediaStream.current){
            mediaStream.current.getTracks().forEach(track => track.stop())
            mediaStream.current = null
        }

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			videoRef.current.srcObject = stream;
            videoRef.current.src = ""
            videoRef.current.controls = false
            videoRef.current.muted = true
			mediaStream.current = stream;
            setIsRecorded(false)
		} catch (error) {
			console.error(error);
			toast.error(
				"something Went Wrong Please try Uploading video Instead of Recording it",
			);
		}
	};

	useEffect(() => {
		startCamera();

		return () => {
			mediaStream.current?.getTracks().forEach((track) => track.stop());
		};
	}, []);

	const startRecording = () => {
		if (!mediaStream.current) {
			toast.error("No media Stream Provided Kindly Refresh the page");
            startCamera()
			return;
		}

        if(videoRef.current){
            videoRef.current.muted =  true
            
        }
		const recorder = new MediaRecorder(mediaStream.current, {
			mimeType: "video/webm",
		});

		recorederRef.current = recorder;

		videoChunck.current = [];

		recorder.ondataavailable = (e) => {
			if (e.data && e.data.size > 0) {
				videoChunck.current.push(e.data);
			}
		};

		recorder.onstop = () => {
			const videoBlob = new Blob(videoChunck.current, {
				type: "video/webm",
			});
			const url = URL.createObjectURL(videoBlob);
			// alert(url)

			if (videoRef.current) {

				videoRef.current.srcObject = null;
				videoRef.current.src = url;
				videoRef.current.controls = true;
				videoRef.current.muted = false
			}

			setIsRecorded(true);
            setVideoFile(new File([videoBlob], "recordedvideo.webm", {type : "video/webm"}))
            
		};

		recorder.start();
		setIsRecording(true);

        setTimeout(() => {
            if(recorederRef.current?.state === "recording"){
                recorder.stop()
                setIsRecording(false)
            }
        }, 120000);
	};


	const stopRecording = () => {
		if (recorederRef.current && recorederRef.current.state !== "inactive") {
			recorederRef.current.stop();
		}
        mediaStream.current?.getTracks().forEach(track => track.stop())
		// if (mediaStream.current) {
		// 	mediaStream.current.getTracks().forEach(track => track.stop())

		// 	if (videoRef.current) {
		// 		videoRef.current.srcObject = null;
		// 	}
		// 	mediaStream.current = null;
		// }

		setIsRecording(false);
	};

	const recordAgain = async () => {
		if(videoRef.current){
            videoRef.current.src = ""
            videoRef.current.controls = false
            videoRef.current.muted = true
        }
        await startCamera()
	};

	return (
		<Card className="w-full relative disabled:cursor-not-allowed h-96 p-5 cursor-pointer border-dotted border-2 space-y-2 rounded-2xl border-[hsl(var(--primary))] flex justify-center items-center flex-col">
			<Suspense fallback={<h1>loading ....</h1>}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="h-full w-96 rounded-2xl"
                />
            </Suspense>
			{isRecording ? (
				<Button
					type="button"
					variant={"randomColor"}
					onClick={stopRecording}
				>
					stop Recording
				</Button>
			) : !isRecorded ? (
				<Button
					type="button"
					variant={"secondary"}
					onClick={startRecording}
				>
					start recording
				</Button>
			) : (
				<Button type="button" onClick={recordAgain}>Record again</Button>
			)}
            <h1 className="text-xs text-[hsl(var(--primary))]">You can record upto 2 minutes</h1>
		</Card>
	);
};
