import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Toolbar from '../components/Toolbar';
import { recharger, RechargerCompte } from '../modele/RechargeCompte';

const RechargeCompte: React.FC = () => {
    if (localStorage.getItem("token") == null || localStorage.getItem("idClient") == null) {
        window.location.assign("/Login");
    }
    const [montant, setMontant] = useState<number>(0);
    const [wait, setWait] = useState<boolean>(false);
    const [response, setResponse] = useState<string>("");
    // const navige = useHistory();
    const valider = (event: any) => {
        event.preventDefault();

        const r: RechargerCompte = new RechargerCompte(montant);
        setWait(true);
        recharger(r).then(res => setResponse(res));
        setWait(false);
    }
    const refreshData = async (event: CustomEvent) => {
        event.detail.complete();
    };

    if (wait == true) {
        setResponse("Loading...");
    }
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refreshData}>
                    <IonRefresherContent pullingText="Pull to refresh" refreshingText="Refreshing..." />
                </IonRefresher>
                <Toolbar />
                <IonText color="muted">
                    <h2>Recharger compte</h2>
                </IonText>
                <form onSubmit={valider} id="forme">
                    <IonItem>
                        <IonLabel>Montant</IonLabel>
                        <IonInput name="montant" type="text" onIonChange={(e: any) => { setMontant(e.target.value) }} ></IonInput>
                    </IonItem>
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Recharger
                    </IonButton>
                </form>
                {
                    <p>{response}</p>
                }
            </IonContent>
        </IonPage>
    );
}

export default RechargeCompte;