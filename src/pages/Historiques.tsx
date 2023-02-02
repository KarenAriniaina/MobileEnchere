import { EnchereDetail, ListeHistorique } from '../modele/EnchereDetail';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRefresher, IonRefresherContent, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Toolbar from '../components/Toolbar';

const HistoriqueClient: React.FC = () => {
    const [Listes, setListes] = useState<any[]>([]);
    const [wait, setWait] = useState<string>("");
    const navige = useHistory();
    if (localStorage.getItem("token") == null || localStorage.getItem("idClient") == null) {
        navige.push("/Login");
    }
    useEffect(() => {
        if (localStorage.getItem("token") == null || localStorage.getItem("idClient") == null) {
            window.location.assign("/Login");
        }
        else {
            setWait("Loading...");
            ListeHistorique().then(res => {
                setListes(res.data);
                setWait("");
            });
        }
    }, []);

    const refreshData = async (event: CustomEvent) => {
        setListes([]);
        if (localStorage.getItem("token") == null || localStorage.getItem("idClient") == null) {
            window.location.assign("/Login");
        }
        else {
            setWait("Loading...");
            ListeHistorique().then(res => {
                setListes(res.data);
                setWait("");
            });
        }
        event.detail.complete();
    };
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refreshData}>
                    <IonRefresherContent pullingText="Pull to refresh" refreshingText="Refreshing..." />
                </IonRefresher>
                <Toolbar />
                <IonText color="muted">
                    <h2 >Historique de vos encheres</h2>
                </IonText>
                {Listes.map(element => <Data nom={element.nom} categorie={element.categorie} prixDepart={element.prixDepart} date={element.date} Status={element.Status} photo={element.photos[0]} />)}
                {wait && <p style={{ color: 'red' }}>{wait}</p>}
            </IonContent>
        </IonPage>
    );
}

const Data: React.FC<EnchereDetail> = ({ nom, categorie, prixDepart, date, Status, photo }) => {
    let d1 = new Date(date);
    let d2 = new Date();
    let val = "en cours";
    if (d2.getTime() > d1.getTime()) {
        val = "terminé";
    }
    Status = val;
    console.log(val);
    if (val == "en cours") {
        return (
            <IonCard>
                <img alt="Silhouette of mountains" src={photo} />
                <IonCardHeader>
                    <IonCardTitle>{nom}</IonCardTitle>
                    <IonCardSubtitle>{categorie}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonButton shape="round" color="success">{Status}</IonButton>
                </IonCardContent>
            </IonCard>
        )
    }
    return (
        <IonCard>
            <img alt="Silhouette of mountains" src={photo} />
            <IonCardHeader>
                <IonCardTitle>{nom}</IonCardTitle>
                <IonCardSubtitle>{categorie}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonButton shape="round" color="warning">{Status}</IonButton>
            </IonCardContent>
        </IonCard>
    )

}

export default HistoriqueClient;