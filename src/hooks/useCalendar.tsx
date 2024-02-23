import{Calendar} from "@ionic-native/calendar"
import { isPlatform } from "@ionic/react";
export const useCalendar = () => {
    const CreateElementCalendar = async (Name:string,location:string,Date:Date) =>{
        if(isPlatform('ios')){
                return "";
        }else{
            const rlst = await Calendar.createEvent(Name,location,'',Date,Date);
            console.log('AAA' , rlst);
            return rlst;
        }
    }
    const DeleteElementCalendar =  async (IdCalendarEvent:string) =>{
        if(isPlatform('ios')){
            return "";
    }else{
        const rlst = await Calendar.deleteEventById(IdCalendarEvent);
        return rlst;
    }
    }
    return {
        CreateElementCalendar,
        DeleteElementCalendar
    }
}