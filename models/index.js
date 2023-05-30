import Sequelize from 'sequelize'

// Import models
const models = {
  User: Sequelize.import('./userModel.js'),
  Post: Sequelize.import('./postModel.js'),
  Comment: Sequelize.import('./commentModel.js')
}

Object.keys(models).forEach(modelKey => {
  // Create model associations
  if ('associate' in models[modelKey]) {
    models[modelKey].associate(models)
  }
})