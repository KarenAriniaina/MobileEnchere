import { IonToolbar, IonButtons, IonButton, IonTitle } from "@ionic/react";

const Toolbar: React.FC = () => {
    const deconnexion=()=>{
        localStorage.removeItem("idClient");
        localStorage.removeItem("token");
        window.location.assign("/Login");
    }
    const inscription=()=>{
        window.location.assign("/Inscription");
    }
    if (localStorage.getItem("idClient") != null && localStorage.getItem("token") != null) {
        return (
            <IonToolbar>
                <IonButton color="primary" slot="end" onClick={deconnexion} >
                    Deconnexion
                </IonButton>
            </IonToolbar>
        );
    }
    return (
        <IonToolbar>
            <IonButton color="primary" slot="end" onClick={inscription}>
                Inscription
            </IonButton>
        </IonToolbar>
    );
};

export default Toolbar;