interface UserAttributes {
    id?: number;
    nom: string;
    prenom: string;
    adresse: string;
    code_postal: string;
    ville: string;
    telephone: string;
    email: string;
    mot_passe: string;
    photo?: string;
   
  }
  
  export default UserAttributes;