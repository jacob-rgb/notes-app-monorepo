const User = require("../models/User.schema")

const deleteNoteinUser = async (userId, noteId) => {
    const user = await User.findById(userId);
    user.notes = user.notes.filter(note => note !== noteId);
    await user.save();
}

module.exports = {
    deleteNoteinUser
}