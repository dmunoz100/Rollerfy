import { IonContent, IonPage } from "@ionic/react"
import { HeaderPage } from "../components/HeaderPage"
import { useEffect, useState } from "react"
import { useEvents } from "../hooks/useEvents"
import { IEvent } from "../interfaces/IEvent"
import Swal from "sweetalert2"
import { MI_AGENDA } from "../constants"
import { useHistory} from "react-router"
import { useCalendar } from "../hooks/useCalendar"
import { useLoading } from "../stores/useLoading"



export const Events: React.FC = () => {

  const EventsHook = useEvents();
  const [EventList, setEventList] = useState<IEvent[]>([]);
  const historyHook = useHistory();
  const CalendarHook = useCalendar();
  const {ShowLoad,HidenLoad} = useLoading((state) => state);


  useEffect(() => {
    (
      async () => {
        ShowLoad();
        setEventList(...[await EventsHook.GetEvents()]);    
        HidenLoad(); 
      }
    )();
  }, []);

  useEffect(() => {
    (
      async () => {
   
        await historyHook.listen(async(location)=>{
          if(location.pathname.includes("Events")){
            ShowLoad();
            setEventList(...[await EventsHook.GetEvents()]);
            HidenLoad();   
          }
        });  
       
      }
    )();
  }, [historyHook]);


  const AgregarEvento = (Evento:IEvent) => {
    Swal.fire({
      text: "Deseas agregar este evento a tu agenda ?",
      icon: "info",
      heightAuto:false,
      showCancelButton: true,
      confirmButtonColor: "#D291BC",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,Agregar",
      cancelButtonText:"No"
    }).then( async (result) => {
      if (result.isConfirmed) {
           const miagenda:IEvent[] = JSON.parse(localStorage.getItem(MI_AGENDA) as string);
           if(miagenda){
            if(!miagenda.some(x => x.Name === Evento.Name && x.Date === x.Date)){
             let rlstCalendar =  "" ;
             rlstCalendar = await CalendarHook.CreateElementCalendar(Evento.Name,Evento.StartingPoint,new Date(Evento.Date));
              console.log(rlstCalendar);
              miagenda.push(Evento);
              localStorage.setItem(MI_AGENDA,JSON.stringify(miagenda.map(
                  (i) => {
                    return {
                      ...i ,IdCalendarEvent : rlstCalendar
                    }
                  }
              )));
              Swal.fire({
                text: "Se agrego el evento a tu agenda",
                      heightAuto:false,
                confirmButtonColor: "#D291BC",
                icon: "success"
              });
              
            }else {
              Swal.fire({
                text: "El evento ya esta en tu agenda",
                      heightAuto:false,
                confirmButtonColor: "#D291BC",
                icon: "info"
              });
            }
            historyHook.push("/Agenda");
           }else {
              const Eventos:IEvent[] = [];
              Eventos.push(Evento);
              localStorage.setItem(MI_AGENDA,JSON.stringify(Eventos));
           }
      }
    });
  }

  return (
    <IonPage>
      <HeaderPage Title="Eventos"></HeaderPage>
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
                      <span className="text-gray-600 text-sm"><b>Fecha: </b> {`${x.Date}`}</span> <br></br>
                      <span className="text-gray-600 text-sm"><b>Ruta: </b> {x.Route}</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-teal-600 text-md font-semibold">Nivel: {x.Level}</span>
                    </div>
                    <button onClick={()=>{AgregarEvento(x)}} className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Agregar a Agenda</button>
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