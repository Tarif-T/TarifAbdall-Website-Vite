const crypto = require("node:crypto");
const { promisify } = require("node:util");

const scrypt = promisify(crypto.scrypt);

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

// Hashes a plaintext password using scrypt and a random salt.
async function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);

  return `${salt}:${Buffer.from(derivedKey).toString("hex")}`;
}

// Verifies a plaintext password against a stored salt:hash value.
async function verifyPassword(password, storedPassword) {
  if (!storedPassword?.includes(":")) {
    return false;
  }

  const [salt, hash] = storedPassword.split(":");

  if (!salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const derivedKey = await scrypt(password, salt, expected.length);

  return crypto.timingSafeEqual(expected, Buffer.from(derivedKey));
}

module.exports = {
  hashPassword,
  verifyPassword,
};
