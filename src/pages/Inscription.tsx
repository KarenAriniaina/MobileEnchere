import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonText } from "@ionic/react";
import { Client, inscription } from "../modele/Client";
import Toolbar from "../components/Toolbar";


export const Inscription: React.FC = () => {
    const [client, setClient] = useState<Client>(new Client("", "", "", "", ""));
    const [error, setError] = useState<string>("");
    useEffect(() => {
        if (localStorage.getItem("idClient") != null && localStorage.getItem("token") != null) {
            window.location.assign("/Historique");
        }
    }, []);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError("Loading...");
        inscription(client).then(res => {
            setError(res)
        })
    }
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Toolbar />
                <IonText color="muted">
                    <h2>Inscription</h2>
                </IonText>
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel>Nom</IonLabel>
                        <IonInput type="text" name="name" onIonChange={(e: any) => { client.nom = e.target.value }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Email</IonLabel>
                        <IonInput type="text" name="email" onIonChange={(e: any) => { client.email = e.target.value }}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Mot de passe</IonLabel>
                        <IonInput type="password" name="mdp" onIonChange={(e: any) => { client.mdp = e.target.value }}></IonInput>
                    </IonItem>
                    <IonButton type="submit" className="btn btn-primary">Valider</IonButton>
                </form>
                {
                    <p>{error}</p>
                }
            </IonContent>
        </IonPage>
    );
}


