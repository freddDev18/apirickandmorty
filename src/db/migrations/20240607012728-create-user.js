const userModelPath = '../models/user.model.js';

async function loadModel(modelPath) {
    const modelModule = await import(modelPath);
    return modelModule;
}

module.exports = {
    up: async (queryInterface) => {
        const userModel = await loadModel(userModelPath);
        await queryInterface.createTable(userModel.USER_TABLE, userModel.UserSchema);
    },
    down: async (queryInterface) => {
        const userModel = await loadModel(userModelPath);
        await queryInterface.dropTable(userModel.USER_TABLE);
    },
};
