const mongoose = require("mongoose");

const toPublicId = (item) => {
  if (!item) {
    return null;
  }

  const plain = item.toObject ? item.toObject() : { ...item };
  plain.id = String(plain._id);
  delete plain._id;
  delete plain.__v;
  return plain;
};

const mapToPublicIds = (items) => items.map((item) => toPublicId(item));

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  toPublicId,
  mapToPublicIds,
  isValidObjectId,
};
