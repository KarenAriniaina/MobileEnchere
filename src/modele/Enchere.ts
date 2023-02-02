import { Photo } from "@capacitor/camera";

export class Enchere {
    idCategorie: string;
    Description: string;
    jour: number;
    heure: number;
    minute: number;
    nom: string;
    prixDepart: number;

    public constructor(idCategorie: string, Description: string, jour: number, heure: number, minute: number, nom: string, prixDepart: number) {
        this.Description = Description;
        this.heure = heure;
        this.idCategorie = idCategorie;
        this.jour = jour;
        this.minute = minute;
        this.nom = nom;
        this.prixDepart = prixDepart;
    }
}

export const InsertEnchere = async (e: Enchere, lp: Photo[]) => {
    if (localStorage.getItem("idClient") == null || localStorage.getItem("token") == null) {
        window.location.assign("/Login");
    }
    const params = new URLSearchParams();
    params.append('Description', e.Description);
    params.append('idCategorie', e.idCategorie);
    params.append('Nom', e.nom);
    params.append('Jour', e.jour.toString());
    params.append('Minute', e.minute.toString());
    params.append('heure', e.heure.toString());
    params.append('PrixDepart', e.prixDepart.toString());
    return await fetch(`http://localhost:8080/Enchere/?${params}`, {
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
            'token': `${localStorage.getItem("token")}`,
            'idClient': `${localStorage.getItem("idClient")}`,
        },
        body: JSON.stringify(lp)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            let mes: string = res.message as string;
            if (mes.localeCompare("Vous n'etes pas connecté") == 0) {
                localStorage.removeItem("idClient");
                localStorage.removeItem("token");
                window.location.assign("/Login");
            }
            return res
        })
}