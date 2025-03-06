import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export default function CallPage() {
  const router = useRouter();
  const { receiverId } = router.query;
  const [callerId, setCallerId] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    fetch("/api/socket"); // Initialize Socket.io API
    socket = io();

    const token = localStorage.getItem("connectify_token");

    if (!token || !receiverId) return;
    const fetchUserDetails = () => {
      fetch("/api/loginwithsavedtoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push("/user");
          setCallerId(data.data._id);
          alert(callerId);
        });
    };

    socket.emit("join-room", { callerId: token, receiverId });

    navigator.mediaDevices
      .getUserMedia({ video: isVideo, audio: true })
      .then((stream) => {
        localVideoRef.current!.srcObject = stream;
        streamRef.current = stream;

        peerRef.current = new RTCPeerConnection();
        stream
          .getTracks()
          .forEach((track) => peerRef.current!.addTrack(track, stream));

        peerRef.current.ontrack = (event) => {
          remoteVideoRef.current!.srcObject = event.streams[0];
        };

        peerRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("signal", {
              to: receiverId,
              data: { candidate: event.candidate },
            });
          }
        };

        peerRef.current.createOffer().then((offer) => {
          peerRef.current!.setLocalDescription(offer);
          socket.emit("signal", { to: receiverId, data: { offer } });
        });
      });

    socket.on("signal", async ({ offer, answer, candidate }) => {
      if (offer) {
        await peerRef.current!.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerRef.current!.createAnswer();
        await peerRef.current!.setLocalDescription(answer);
        socket.emit("signal", { to: receiverId, data: { answer } });
      }
      if (answer) {
        await peerRef.current!.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
      if (candidate) {
        await peerRef.current!.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });
  }, [receiverId, isVideo]);

  const toggleVideo = () => {
    setIsVideo((prev) => !prev);
  };

  const startScreenShare = async () => {
    if (isScreenSharing) {
      streamRef.current!.getTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideo,
        audio: true,
      });
      localVideoRef.current!.srcObject = stream;
      streamRef.current = stream;
      setIsScreenSharing(false);
    } else {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      localVideoRef.current!.srcObject = stream;
      streamRef.current = stream;
      setIsScreenSharing(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Call with {receiverId}</h1>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        className="w-1/3 border border-gray-500"
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-1/3 border border-gray-500 mt-4"
      />
      <div className="mt-4">
        <button onClick={toggleVideo} className="px-4 py-2 bg-blue-500 rounded">
          Toggle Video
        </button>
        <button
          onClick={startScreenShare}
          className="px-4 py-2 bg-green-500 rounded ml-2"
        >
          {isScreenSharing ? "Stop Sharing" : "Start Sharing"}
        </button>
      </div>
    </div>
  );
}
