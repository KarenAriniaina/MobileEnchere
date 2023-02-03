import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { IonButton, IonCol, IonContent, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSelect, IonSelectOption, IonTextarea, useIonViewWillEnter } from "@ionic/react"
import { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import { Categorie, ListeCategorie } from "../modele/Categorie";
import { Enchere, InsertEnchere } from "../modele/Enchere";

const InsertionEnchere: React.FC = () => {
    const [wait, setWait] = useState<string>("");
    const [Error, setError] = useState<string>("");
    const [Nom, setNom] = useState<string>("");
    const [enchere, setEnchere] = useState<Enchere>(new Enchere("", "", 0, 0, 0, "", 0));
    const [Listes, setListes] = useState<Categorie[]>([]);
    useEffect(() => {
        if (localStorage.getItem("token") == null || localStorage.getItem("idClient") == null) {
            window.location.assign("/Login");
        } else {
            if (Listes.length == 0) {
                setWait("Loading....");
                ListeCategorie().then(res => {
                    var Categories: Categorie[] = res.data as Categorie[];
                    if (Listes.length == 0) {
                        Categories.map(Element => Listes.push(Element));
                    }
                    setWait("");
                })
            }
        }
    });
    const [image, setImage] = useState<Photo[]>([]);
    const uploadPhoto = async () => {
        const result = await Camera.getPhoto({
            quality: 20,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            width: 100,
            height: 100
        })
        setImage([...image, result]);
    };
    const confirm = async (event: any) => {
        event.preventDefault();
        setError("Waiting...");
        InsertEnchere(enchere, image).then(res => {
            setError(res.message);
        })
    }
    const refreshData = async (event: CustomEvent) => {
        event.detail.complete();
    };
    if (wait != "") return (<p>{wait}</p>);
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Toolbar />
                <IonRefresher slot="fixed" onIonRefresh={refreshData}>
                    <IonRefresherContent pullingText="Pull to refresh" refreshingText="Refreshing..." />
                </IonRefresher>
                <form onSubmit={confirm} id="forme">
                    <IonItem>
                        <IonLabel>Nom</IonLabel>
                        <IonInput name="email" type="text" onIonChange={(e: any) => { enchere.nom = e.target.value }} ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Categorie</IonLabel>
                        <IonSelect placeholder="Select Categorie" onIonChange={(e: any) => { enchere.idCategorie = e.target.value }} >
                            {
                                Listes.map(Element => <IonSelectOption value={Element.idCategorie}>{Element.designation}</IonSelectOption>)
                            }
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel>jour</IonLabel>
                        <IonInput type="text" onIonChange={(e: any) => { enchere.jour = e.target.value }} >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>heure</IonLabel>
                        <IonInput type="text" onIonChange={(e: any) => { enchere.heure = e.target.value }} >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>minute</IonLabel>
                        <IonInput type="text" onIonChange={(e: any) => { enchere.minute = e.target.value }} >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Prix depart</IonLabel>
                        <IonInput type="text" onIonChange={(e: any) => { enchere.prixDepart = e.target.value }} >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Description</IonLabel>
                        <IonTextarea
                            placeholder="Enter description"
                            clearOnEdit={true}
                            onIonChange={(e: any) => { enchere.Description = e.target.value }}
                        ></IonTextarea>
                    </IonItem>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel> Image</IonLabel>
                                <IonButton onClick={() => uploadPhoto()}>Upload</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonRow>
                            {image.map((photo, index) => (
                                <IonCol size="4" key={index}>
                                    <IonImg src={'data:image/' + photo.format + ';base64,' + photo.base64String} />
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonRow>
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        Ajouter
                    </IonButton>
                    <p>{Error}</p>
                </form>
            </IonContent>
        </IonPage>
    );
}

export default InsertionEnchere;