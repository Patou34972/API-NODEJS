import { Request, Response } from 'express';
import RoleModel from '../models/role.model';

/**
 * Récupère tous les roles.
 * @param {Request} req - L'objet de requête HTTP.
 * @param {Response} res - L'objet de réponse HTTP.
 * @returns {Promise<void>} Une promesse résolue une fois que les roles sont récupérés et renvoyés dans la réponse.
 */
export const getRoles = async (req: Request, res: Response): Promise<void> => {
    try {
      const roles = await RoleModel.findAll();
      res.status(200).json(roles);
    } catch (error) {
      console.error("Erreur lors de la récupération des roles :", error);
      res.status(500).json({ message: "Erreur lors de la récupération des roles" });
    }
  };

/**
 * @param {Request} req
 * @param {Response} res
 */
export const getRoleById = async (req: Request, res: Response): Promise<void> => {
  const roleId: string = req.params.id; // Supposons que l'identifiant de role est passé en tant que paramètre dans l'URL
  try {
    const role = await RoleModel.findByPk(roleId); // Utilisez la méthode findByPk pour récupérer un role par son identifiant
    if (!role) {
        res.status(404).json({ message: "Role non trouvé" });
      } else {
        res.status(200).json(role);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du role :", error);
      res.status(500).json({ message: "Erreur lors de la récupération du role" });
    }
  };

/**
 * @param {Request} req
 * @param {Response} res
 */
export const postRoles = async (req: Request, res: Response): Promise<void> => {
  if (!req.body.nom) {
    res.status(400).json({ message: "Merci d'ajouter un role" });
    return;
  }

  try {
    const role = await RoleModel.create({
      nom: req.body.nom,
      // Autres propriétés requises si nécessaire
    });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du rôle", error });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
export const editRole = async (req: Request, res: Response): Promise<void> => {
    const roleId: string = req.params.id;
    try {
      const [updatedRowsCount, updatedRows] = await RoleModel.update(req.body, {
        where: { id: roleId },
        returning: true
      });
      if (updatedRowsCount === 0) {
        res.status(404).json({ message: "Role non trouvé" });
      } else {
        res.status(200).json(updatedRows[0]);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du role:", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du role" });
    }
  };

/**
 * @param {Request} req
 * @param {Response} res
 */
export const deleteRole = async (req: Request, res: Response): Promise<void> => {
    const roleId: string = req.params.id;
    try {
      const deletedRowCount = await RoleModel.destroy({
        where: { id: roleId }
      });
      if (deletedRowCount === 0) {
        res.status(404).json({ message: "Role non trouvé" });
      } else {
        res.status(200).json({ message: "Role supprimé avec succès" });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du role :", error);
      res.status(500).json({ message: "Erreur lors de la suppression du role" });
    }
  };