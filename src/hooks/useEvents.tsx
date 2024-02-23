import { Firestore, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useFirebaseStore } from "../stores/useFirebaseStore"
import { FireFunction } from "@testing-library/dom";
import { IEvent } from "../interfaces/IEvent";

export const useEvents = () => {

    const {bd} = useFirebaseStore((state) => state);

    const GetEvents =  async () => {
        const Events:IEvent[] = [];
        const querySnapshot = await getDocs(collection(bd as Firestore, "Events"));
        querySnapshot.forEach((doc) => {
          Events.push(doc.data() as IEvent);
        });
        return Events;
    }

    return {
        GetEvents
    }
}