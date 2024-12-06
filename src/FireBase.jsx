import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig.js";
import { savetoken } from "./api/fcmapi/fcmAPI.js";
import { useSelector } from "react-redux";

function FireBase() {
    // Redux store에서 admin 번호 가져오기
    const auth = useSelector(state => state.auth);
    const admno = auth.admno;

    // 초기 state 설정
    const [formData, setFormData] = useState({
        token: '',
        admno: admno || '', // admno가 있을 때만 설정
    });

    // Firebase 알림 권한 요청 및 토큰 가져오기
    async function requestPermission() {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            });

            console.log("--------111");
            console.log(token);

            // 토큰이 생성되면 상태 업데이트
            if (token) {
                console.log("Token generated: ", token);
                setFormData(prevState => ({
                    ...prevState,
                    token: token, // token 상태 업데이트
                }));
            }
        } else if (permission === "denied") {
            alert("You denied for the notification");
        }
    }

    // 컴포넌트가 마운트될 때 권한 요청 및 토큰 가져오기
    useEffect(() => {
        requestPermission();
    }, [admno]); // admno가 변경될 때마다 실행

    // formData가 업데이트된 후 savetoken 호출
    useEffect(() => {
        if (formData.token && formData.admno) {
            console.log("Saving token with formData: ", formData);
            savetoken(formData).then((result) => {
                console.log(result);
            });
        }
    }, [formData]); // formData가 변경될 때마다 실행

    // 메시지 수신 시 알림 표시
    onMessage(messaging, (payload) => {
        console.log("Message received: ", payload);

        if (Notification.permission === "granted") {
            const { title, body } = payload.notification;
            new Notification(title, {
                body,
                icon: payload.notification.image,
            });
        } else {
            console.warn("Notification permission not granted.");
        }
    });

    return <></>;
}

export default FireBase;