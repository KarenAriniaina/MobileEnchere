import { useHistory } from "react-router";

export class RechargerCompte {
    montant: number;

    public constructor(montant: number) {
        this.montant = montant;
    }
}

export const recharger = async (r: RechargerCompte) => {
    if (r.montant <= 0) return "Montant inferieur ou egale à 0";
    return await fetch(`https://serveurenchere2-production.up.railway.app/DemandeRechargement?montant=${r.montant}`, {
        method: 'POST',
        headers: {
            'token': `${localStorage.getItem("token")}`,
            'idClient': `${localStorage.getItem("idClient")}`
        },
        body: JSON.stringify({ 'montant': r.montant })
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