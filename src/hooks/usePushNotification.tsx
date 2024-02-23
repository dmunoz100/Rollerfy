import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { useFirebaseStore } from '../stores/useFirebaseStore';
import { addDoc, collection, doc, Firestore, setDoc } from "firebase/firestore";

export const usePushNotification = () => {

    const {bd} = useFirebaseStore();

    const  SetUpPushNotification = async () => {
        PushNotifications.checkPermissions().then(async (res) => {
            if (res.receive !== 'granted') {
              PushNotifications.requestPermissions().then(async  (res) => {
                if (res.receive === 'denied') {
                  console.log(res.receive);
                }
                else {
                 await register();
                }
              });
            }
            else {
             await register();
            }
          });
    }

    const register = async () => {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      
        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            async (token: Token) => {             
              console.log("Registro Celular",token);
                //  // Add a new document with a generated id.
                // const docRef = await addDoc(collection((bd as Firestore), "TokenNotification"), {
                //             Token:token.value
                // });
                // console.log("Document written with ID: ", docRef.id);
                // Add a new document in collection "cities"
                await setDoc(doc((bd as Firestore), "TokenNotification", token.value), {
                    Token:token.value
                },{merge:true});
            }
        );
      
        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );
      
        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotificationSchema) => {
              console.log("pushNotificationReceived",notification);
            }
        );
      
        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: ActionPerformed) => {
          
            }
        );
      }

    return {
        SetUpPushNotification
    }
}