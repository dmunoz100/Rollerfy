import { Timestamp } from "firebase/firestore";

export interface IEvent {
    Date:string ,
    FlayerBase:string,
    Level:string,
    Name:string,
    Route:string,
    StartingPoint:string,
    TotalKM:number
}

export interface IEventAgenda {
    Date:string ,
    IdCalendarEvent:string,
    DateString:string,
    FlayerBase:string,
    Level:string,
    Name:string,
    Route:string,
    StartingPoint:string,
    TotalKM:number
}