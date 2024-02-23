import { IonContent, IonPage } from "@ionic/react"
import { HeaderPage } from "../components/HeaderPage"
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IEvent, IEventAgenda } from "../interfaces/IEvent";
import { MI_AGENDA } from "../constants";
import Swal from "sweetalert2";
import { useCalendar } from "../hooks/useCalendar";
import { useLoading } from "../stores/useLoading";

export const Agenda: React.FC = () => 
{
    
    const [EventList, setEventList] = useState<IEventAgenda[]>([]);
    const historyHook = useHistory();
    const CalendarHook = useCalendar();
    const {ShowLoad,HidenLoad} = useLoading((state) => state);

    const FillAgenda = () =>{
      ShowLoad();
        const miagenda:IEventAgenda[] = JSON.parse(localStorage.getItem(MI_AGENDA) as string);
        if(miagenda){
            setEventList(...[miagenda]); 
        }else {
            setEventList([]);    
        }
        HidenLoad();
    }

    const QuitarEvento = (index:number,IdCalendarEvent:string) => {
        Swal.fire({
            text: "Deseas quitar este evento a tu agenda ?",
            icon: "info",
            heightAuto:false,
            showCancelButton: true,
            confirmButtonColor: "#D291BC",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText:"No"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const Array: IEventAgenda[] = EventList;
                Array.splice(index);
                localStorage.setItem(MI_AGENDA,JSON.stringify(Array));
                FillAgenda();
                const calendarrslt =  await CalendarHook.DeleteElementCalendar(IdCalendarEvent);
            }
          });
    }

    useEffect(() => {
        (
          async () => {
            FillAgenda(); 
          }
        )();
      }, []);
    
    useEffect(() => {
        (
          async () => {
            await historyHook.listen(async(location)=>{
              if(location.pathname.includes("Agenda")){
                 FillAgenda(); 
              }
            });     
          }
        )();
      }, [historyHook]);

    return (
        <IonPage>
           <HeaderPage Title="Agenda"></HeaderPage>   
           <IonContent>
        {
          EventList.filter((x)=> new Date(x.Date) >= new Date()).sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()).map((x, indx) =>
            <div key={indx} className="wrapper  antialiased text-gray-900">
              <div>
                <img src={x.FlayerBase} alt=" random imgee" className="w-[55vh] h-[55vh] object-center rounded-lg shadow-md" />
                <div className="relative px-4 -mt-16  ">
                  <div className={`bg-[#FFDFD3] p-6 rounded-lg shadow-lg`} >
                    <div className="flex items-baseline">
                      <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                        {x.TotalKM} KM
                      </span>
                      <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                        {x.StartingPoint}
                      </div>
                    </div>
                    <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{x.Name}</h4>
                    <div className="mt-1">
                      <span className="text-gray-600 text-sm"><b>Fecha: </b> {x.Date}</span> <br></br>
                      <span className="text-gray-600 text-sm"><b>Ruta: </b> {x.Route}</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-teal-600 text-md font-semibold">Nivel: {x.Level}</span>
                    </div>
                    <button onClick={()=>{QuitarEvento(indx,x.IdCalendarEvent)}} className="w-full text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Eliminar de Agenda</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </IonContent>
    </IonPage>
    )
}