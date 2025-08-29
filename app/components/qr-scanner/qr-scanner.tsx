"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./qr-scanner.scss";
import toast from "react-hot-toast";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "@/public/svg/qr-frame.svg";
import Image from "next/image";
import showToast from "../toast/toast";
import { useOrganization } from "@/src/app/(main)/profile/me/organizations/utils/actions";
import { status } from "@/config/constants";

const QR_TOAST_ID = "validating-qr-code";

const QrReader = () => {
  const scanner = useRef<QrScanner | null>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const { validateQRCode, error, dismissError } = useOrganization();

  const onScanSuccess = useCallback(
    (result: QrScanner.ScanResult) => {
      if (result.data) {
        showToast({
          message: "Validating QR Code...",
          type: "loading",
          options: { id: QR_TOAST_ID },
        });

        validateQRCode(result.data).then((validationStatus: status) => {
          toast.dismiss(QR_TOAST_ID);
          if (validationStatus === status.SUCCESS) {
            setTimeout(() => {
              showToast({
                message: "QR Code successfully validated",
                type: "success",
                options: { id: "qr-validation-success" },
              });
            }, 5000);
          }
        });
      }
    },
    [validateQRCode]
  );

  const onScanFail = useCallback((err: string | Error) => {}, []);

  const requestCameraPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      setQrOn(true);
    } catch (err) {
      console.error("Camera permission error:", err);
      showToast({
        message:
          "Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.",
        type: "error",
        options: { id: "camera-permission-error" },
      });
      setQrOn(false);
    }
  }, []);

  const startQrScanner = useCallback(() => {
    if (videoEl.current && !scanner.current) {
      requestCameraPermissions().then(() => {
        if (qrOn && videoEl.current) {
          scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
            onDecodeError: onScanFail,
            preferredCamera: "environment",
            highlightScanRegion: true,
            highlightCodeOutline: true,
            overlay: qrBoxEl.current || undefined,
          });

          scanner.current
            .start()
            .then(() => setQrOn(true))
            .catch((err) => {
              console.error("Failed to start QR Scanner:", err);
              showToast({
                message: "Failed to start QR Scanner",
                type: "error",
                options: { id: "qr-scanner-start-error" },
              });
              setQrOn(false);
            });
        }
      });
    }
  }, [onScanSuccess, onScanFail, qrOn, requestCameraPermissions]);

  useEffect(() => {
    startQrScanner();

    // Clean up on unmount
    return () => {
      scanner.current?.stop();
    };
  }, [startQrScanner]);

  useEffect(() => {
    if (error) {
      showToast({
        message: error,
        type: "error",
        options: { id: "qr-reader-error" },
      });
      dismissError();
    }
  }, [error, dismissError]);

  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <Image
          src={QrFrame.src}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default QrReader;
