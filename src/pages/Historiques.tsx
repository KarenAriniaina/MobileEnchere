import { EnchereDetail, EnchereDetails } from '../modele/EnchereDetail';
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';

const pers = [
    {
        nom: 'Voiture',
        Categorie: 'Auto',
        Prix: '20000',
        Etat: '0'
    }, {
        nom: 'Voiture',
        Categorie: 'Auto',
        Prix: '500000',
        Etat: '1'
    }

];

//const r: EnchereDetail[] = new EnchereDetail('temp', 'temp', '120', 0);

const HistoriqueClient: React.FC = () => {
    const [Listes, setListes] = useState<EnchereDetail[]>([]);
    useEffect(() => {
        console.log("Miditra ato");
        EnchereDetails().then(res => setListes(res));

    }, []);
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonText color="muted">
                    <h2 >Historique de vos encheres</h2>
                </IonText>
                <IonGrid fixed={true}>
                    <IonRow>
                        <IonCol>Nom produit</IonCol>
                        <IonCol>Categorie</IonCol>
                        <IonCol>Prix depart</IonCol>
                        <IonCol>Status</IonCol>
                    </IonRow>

                    {Listes.map(element =><Data nom={element.nom} Categorie={element.Categorie} Prix={element.Prix} Status={element.Status} /> ) }
                    



                </IonGrid>

            </IonContent>
        </IonPage>
    );
}

const Data: React.FC<EnchereDetail> = ({ nom, Categorie, Prix, Status }) => {

    return (
        // Listes.map(encheres =>
        //     < IonRow >
        //         <IonCol> {encheres.nom}</IonCol>
        //         <IonCol>{encheres.Categorie}</IonCol>
        //         <IonCol>{encheres.Prix}</IonCol>
        //         <IonCol>{encheres.Status}</IonCol>
        //     </IonRow >
        // )

        < IonRow >
            <IonCol>{nom}</IonCol>
            <IonCol>{Categorie}</IonCol>
            <IonCol>{Prix}</IonCol>
            <IonCol>{Status}</IonCol>
        </IonRow >
    )

}

export default HistoriqueClient;