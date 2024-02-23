import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { star,calendar} from 'ionicons/icons';
import {FIREBASE_CONFIG} from './constants'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css'

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect } from 'react';
import {useFirebaseStore} from './stores/useFirebaseStore'
import { Events } from './pages/Events';
import { Agenda } from './pages/Agenda';
import { LoadingSpin } from './components/LoadingSpin';
import { usePushNotification } from './hooks/usePushNotification';


setupIonicReact();

export const App: React.FC = () => 
{

  const {bd,setbd} = useFirebaseStore();
  const PushNotificationHook = usePushNotification();

  useEffect(()=>{
    // Initialize Firebase
    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);
    setbd(db);   
  },[]);

  useEffect(()=>{
    if(bd){
     (async ()=>{
      await PushNotificationHook.SetUpPushNotification();
     })();
    }
  },[bd]);


  return(
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Events">
              <Events></Events>
          </Route>
          <Route exact path="/Agenda">
            <Agenda></Agenda>
          </Route>
          <Route exact path="/">
            <Redirect to="/Events" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar color={"primary"} slot="bottom">
          <IonTabButton tab="Events" href="/Events">
            <IonIcon aria-hidden="true" icon={star} />
            <IonLabel>Eventos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Agenda" href="/Agenda">
            <IonIcon aria-hidden="true" icon={calendar} />
            <IonLabel>Agenda</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    <LoadingSpin></LoadingSpin>
  </IonApp>
)};

