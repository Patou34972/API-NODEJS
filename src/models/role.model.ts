import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import RoleAttributes from '../interfaces/role.interface';


class Role extends Model<RoleAttributes> implements RoleAttributes {
    public id!: number;
    public nom!: string;

    static initModel = () => {
        
        Role.init ({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: false
              }, 
            }, {
                sequelize,
            tableName: 'roles'
          });
    }
    static associate() {
        Role.hasMany(User);
    }   
}

   export default Role;
//   Role.hasMany(User);
