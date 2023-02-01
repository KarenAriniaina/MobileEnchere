export class EnchereDetail {
    nom: string;
    Categorie: string;
    Prix: string;
    Status: string;


    public constructor(nom: string, Categorie: string, Prix: string, Status: number) {
        this.nom = nom;
        this.Categorie = Categorie;
        this.Prix = Prix;
        if (Status > 0) {
            this.Status = "Terminé";
        }
        else {
            this.Status = "En cours";
        }

    }




}
const pers = [
    {
        nom: 'Voiture',
        Categorie: 'Auto',
        Prix: '20000',
        Etat: 0
    }, {
        nom: 'Voiture',
        Categorie: 'Auto',
        Prix: '500000',
        Etat: 1
    }

];
export const EnchereDetails = async () => {
    const r: EnchereDetail[] = [];
    console.log(pers);
    for (let index = 0; index < pers.length; index++) {
        r[index] = new EnchereDetail(pers[index].nom, pers[index].Categorie, pers[index].Prix, pers[index].Etat);
    }
    return r;
}

