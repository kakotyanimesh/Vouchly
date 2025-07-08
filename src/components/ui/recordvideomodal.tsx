"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { useFileStore } from "@/utils/zustand/testimonialsformstore";
import { toast } from "sonner";

export const RecordVideo = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isRecoring, setisRecoring] = useState(false);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const [, setVideoURL] = useState<string  | null>(null)
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null)

    const { setVideoFile } = useFileStore()
	useEffect(() => {
		const videoStream = async () => {
			try {
				const streaminng = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});
                setMediaStream(streaminng)
				if (videoRef.current) {
					videoRef.current.srcObject = streaminng;
				}
			} catch (error) {
				console.log(error);
			}
		};

		videoStream();
	}, []);

    useEffect(() => {
      if(videoBlob){
        const recordedFile = new File([videoBlob], 'recorded-video.webm', {type : "video/webm"})
        setVideoFile(recordedFile)
      }
    }, [videoBlob, setVideoFile])
    
    const max_time = 100 * 1000
    const startRecording = () => {
        if(!mediaStream) return

        const recording = new MediaRecorder(mediaStream, { mimeType : "video/webm"})

        const chucks : Blob[] = []

        recording.ondataavailable = (e) => {
            if(e.data.size > 0) chucks.push(e.data)
        }

        recording.onstop = () => {
            const finalBlob = new Blob(chucks, {type : "video/webm"})

            if(finalBlob.size > 10 * 1024 * 1024){
                toast.error("Your recorded Video exceed limit")
                return
            }

            const videosrc = URL.createObjectURL(finalBlob);
            setVideoURL(videosrc);
            setVideoBlob(finalBlob)
            if (videoRef.current) {
                videoRef.current.srcObject = null;
                videoRef.current.src = videosrc;
                videoRef.current.controls = true;
            }
        };
        recording.start()
        setMediaRecorder(recording)
        setisRecoring(true)
        
        setTimeout(() => {
            recording.stop()
            setisRecoring(false)
        }, max_time);
        
    }

    const stopRecording = () => {
        if(mediaRecorder){
            mediaRecorder.stop()
        }
        if(mediaStream){
            mediaStream.getTracks().forEach((track) => track.stop())
        }

        setisRecoring(false)
    }
	return (
		<Card className="w-full disabled:cursor-not-allowed h-fit py-2 cursor-pointer border-dotted border-2 rounded-2xl border-[hsl(var(--primary))] flex flex-col justify-center items-center space-y-2">
			<video
				className="h-fit w-86 rounded-2xl"
				autoPlay
				muted
				ref={videoRef}
			/>
			{!isRecoring ? (
				<Button type="button" onClick={startRecording}>Start Recoding</Button>
			) : (
				<Button type="button" onClick={stopRecording}>stop recoding</Button>
			)}
		</Card>
	);
};
