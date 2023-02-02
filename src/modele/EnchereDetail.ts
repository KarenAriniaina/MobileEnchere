export class EnchereDetail {
    nom: string;
    categorie: string;
    prixDepart: string;
    date:string
    Status: string;
    photo:string;


    public constructor(nom: string, Categorie: string, Prix: string, date:string,photo:string) {
        this.nom = nom;
        this.categorie = Categorie;
        this.prixDepart = Prix;
        this.date=date;
        console.log("date="+date)
        let d1 = new Date(date);
        let d2 = new Date();
        let val = "en cours";
        if (d2.getTime() > d1.getTime()) {
            val = "terminé";
        }
        this.Status=val;
        this.photo=photo;
    }
}

export const ListeHistorique = async () => {
    return await fetch("http://localhost:8080/HistoriqueEncheres/", {
        method: "GET",
        headers: {
            'token': `${localStorage.getItem("token")}`,
            'idClient': `${localStorage.getItem("idClient")}`
        },
        referrerPolicy: "origin-when-cross-origin"
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            let mes: string = res.message as string;
            if (mes.localeCompare("Vous n'etes pas connecté") == 0) {
                localStorage.removeItem("idClient");
                localStorage.removeItem("token");
            }
            return res
        })
}

