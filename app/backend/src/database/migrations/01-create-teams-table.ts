import { DataTypes, Model, QueryInterface } from "sequelize"
import { ITeam } from "../../Interfaces/teams/ITeam"
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
      },
      teamName: {
        type: DataTypes.STRING,
        field: "team_name",
        allowNull: false
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  }
}