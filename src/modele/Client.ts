export class Client {
    email: string;
    mdp: string;
    token: string;
    idClient: string;
    nom:string;


    public constructor(email: string, mdp: string, token: string, idClient:string,nom:string) {
        this.email=email;
        this.mdp=mdp;
        this.token=token;
        this.idClient=idClient;
        this.nom=nom;
    }
}


export const login = async (c: Client) => {
    var f=new FormData();
    f.append("email",c.email);
    f.append("mdp",c.mdp);
    return await fetch(`http://localhost:8080/LoginClient/`, {
        method: 'POST',
        body: f,
    }).then(res => res.json())
        .then(res => {
            if(res.data!=null && res.data.length!=0){
                var lc:Client=res.data[0] as Client;  
                localStorage.setItem("idClient",lc.idClient);  
                localStorage.setItem("token",lc.token);  
                if (localStorage.getItem("token") != null || localStorage.getItem("idClient") != null) {
                    window.location.assign("/Historique");
                }
            }
            if (res.erreur != null) {
                return res.erreur;
            }
            else return res.message;
        })
}

export const inscription =async (c:Client)=>{
    var f=new FormData();
    f.append("email",c.email);
    f.append("mdp",c.mdp);
    f.append("nom",c.nom);
    return await fetch(`http://localhost:8080/InscriptionClient/`, {
        method: 'POST',
        body: f,
    }).then(res => res.json())
        .then(res => {
            if(res.data!=null && res.data.length!=0){
                var lc:Client=res.data[0] as Client;  
                localStorage.setItem("idClient",lc.idClient);  
                localStorage.setItem("token",lc.token);  
                if (localStorage.getItem("token") != null || localStorage.getItem("idClient") != null) {
                    window.location.assign("/Historique");
                }
            }
            if (res.erreur != null) {
                return res.erreur;
            }
            else return res.message;
        })
}