import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { stat } from "fs";
import { request } from "http";
import { Method } from "ionicons/dist/types/stencil-public-runtime";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import Toolbar from "../components/Toolbar";
import { Client, login } from "../modele/Client";

export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [client, setClient] = useState<Client>(new Client("", "", "", "", ""));
    const [error, setError] = useState<string>("");
    const [statue, setStatue] = useState<boolean>(false);
    const navige = useHistory();
    useEffect(() => {
        if (localStorage.getItem("idClient") != null && localStorage.getItem("token") != null) {
            navige.push("/Historique");
        }
    }, []);
    const initialize = async (): Promise<void> => {
        client.email = email;
        client.mdp = password;
        login.call(null, client).then(res => setError(res));
    };
    const registerUser = (event: any) => {
        event.preventDefault();
        setError("Loading...");
        initialize();
    }
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Toolbar />
                <IonText color="muted">
                    <h2>Login</h2>
                </IonText>
                <form onSubmit={registerUser} id="forme">
                    <IonItem>
                        <IonLabel>Email</IonLabel>
                        <IonInput name="email" value={email} type="email" onIonChange={(e: any) => { setEmail(e.target.value) }} ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Password</IonLabel>
                        <IonInput name="password" value={password} type="password" onIonChange={(e: any) => { setpassword(e.target.value) }} ></IonInput>
                    </IonItem>
                    <IonButton expand="block" type="submit" className="ion-margin-top">
                        se connecter
                    </IonButton>
                </form>
                {
                    <p>{error}</p>
                }
            </IonContent>
        </IonPage>
    );
}
export default Login;