const mongoose = require("mongoose");

// Converts a Mongoose document into a public-safe plain object with id.
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

// Converts an array of documents into public-safe objects.
const mapToPublicIds = (items) => items.map((item) => toPublicId(item));

// Validates MongoDB ObjectId values before querying.
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  toPublicId,
  mapToPublicIds,
  isValidObjectId,
};
