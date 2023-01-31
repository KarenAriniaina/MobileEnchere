import { useHistory } from "react-router";


export class Historiques {
    montant: number;
    nomproduit: String;

    public constructor(montant: number, nomproduit: String) {
        this.montant = montant;
        this.nomproduit = nomproduit;
    }
}

export const Historique = async (r: Historiques) => {
    if (r.montant <= 0) return "Montant inferieur ou egale à 0";
    return await fetch(`http://localhost:8080/DemandeRechargement?montant=${r.montant}`, {
        method: 'POST',
        headers: {
            'token': `${localStorage.getItem("token")}`,
            'idClient': `${localStorage.getItem("idClient")}`
        },
        body: JSON.stringify({ 'montant': r.montant, 'nomproduit': r.nomproduit })
    }).then(res => res.json())
        .then(res => {
            if (res.erreur != null) {
                return res.erreur;
            }
            if (res.data != null && res.message != null) {
                return res.message;
            }
        })
}


