import {useEffect} from "react";
import { getToken, onMessage } from "firebase/messaging";
import {messaging} from "./firebase/firebaseConfig.js";

function FireBase() {
    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();


        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: 'BGzwrT1FHLUSxVE8y0SqN6cR3OENko0K4Nm10Et0CarmcNn-5tZO-HYRxwbF3KEahh0wbsiL6sRxkF8NCvSp4e8',
            });

            //We can send token to server
            console.log("Token generated : ", token);

        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }

    }


    useEffect(() => {
        requestPermission();
    }, []);


    onMessage(messaging, (payload) => {
        console.log(payload);
        alert("On Messaging");
    });



    return (
        <>
        </>
    )
}

export default FireBase;