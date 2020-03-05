const {Model,DataTypes} = require('sequelize')

class User extends Model {
    /*isso eh padrao do sequelize, onde o nome sequelize se refere a conexao */
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize /**nome da conexao */
        })
    }
   /* static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
      }*/
}

module.exports = User