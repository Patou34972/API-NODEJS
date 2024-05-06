import { Request, Response } from 'express';
import UserModel from '../models/user.model';

/**
 * Récupère tous les utilisateurs.
 * @param {Request} req - L'objet de requête HTTP.
 * @param {Response} res - L'objet de réponse HTTP.
 * @returns {Promise<void>} Une promesse résolue une fois que les utilisateurs sont récupérés et renvoyés dans la réponse.
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
  };

/**
 * @param {Request} req
 * @param {Response} res
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId: string = req.params.id; // Supposons que l'identifiant de l'utilisateur est passé en tant que paramètre dans l'URL
  try {
    const user = await UserModel.findByPk(userId); // Utilisez la méthode findByPk pour récupérer un utilisateur par son identifiant
    if (!user) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }
  };

/**
 * @param {Request} req
 * @param {Response} res
 */
export const postUsers = async (req: Request, res: Response): Promise<void> => {
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un user" });
  }

  const user = await UserModel.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    code_postal: req.body.code_postal,
    ville: req.body.ville,
    telephone: req.body.telephone,
    email: req.body.email,
    mot_passe: req.body.mot_passe,
    photo: req.body.photo,
  });
  res.status(200).json(user);
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const editUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id;
    try {
      const [updatedRowsCount, updatedRows] = await UserModel.update(req.body, {
        where: { id: userId },
        returning: true
      });
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        res.status(200).json(updatedRows[0]);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  };

/**
 * @param {Request} req
 * @param {Response} res
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id;
    try {
      const deletedRowCount = await UserModel.destroy({
        where: { id: userId }
      });
      if (deletedRowCount === 0) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
  };