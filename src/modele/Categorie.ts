export class Categorie {
    idCategorie: string;
    designation: string;

    public constructor(idCategorie: string, designation: string) {
        this.designation = designation;
        this.idCategorie = idCategorie;
    }
}

export const ListeCategorie = async () => {
    return await fetch("http://localhost:8080/Categories/").then(res => res.json())
        .then(res => {
            console.log(res);
            return res
        });
}