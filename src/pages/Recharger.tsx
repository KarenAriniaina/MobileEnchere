import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { recharger, RechargerCompte } from '../modele/RechargeCompte';

const RechargeCompte: React.FC = () => {
    const [montant, setMontant] = useState<number>(0);
    const [wait, setWait] = useState<boolean>(false);
    const [response, setResponse] = useState<string>("");
    const navige = useHistory();
    const valider = (event:any) => {
        event.preventDefault();
        if (localStorage.getItem("token") == null || localStorage.getItem("idClient") == null) {
            navige.push("/tab1");
        }
        const r: RechargerCompte = new RechargerCompte(montant);
        setWait(true);
        recharger(r).then(res => setResponse(res));
        setWait(false);
    }
    if (wait == true) {
        setResponse("Loading...");
    }
    return (
        <IonPage>
            <IonContent className="ion-padding">
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