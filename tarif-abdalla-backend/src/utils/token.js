const crypto = require("crypto");

const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

function getTokenSecret() {
  return process.env.AUTH_TOKEN_SECRET || process.env.JWT_SECRET || "change-this-development-secret";
}

function base64UrlEncode(value) {
  const input = typeof value === "string" ? value : JSON.stringify(value);
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signSegment(value) {
  return crypto.createHmac("sha256", getTokenSecret()).update(value).digest("base64url");
}

function createAuthToken(payload, expiresInSeconds = DEFAULT_TOKEN_TTL_SECONDS) {
  const now = Math.floor(Date.now() / 1000);

  const header = base64UrlEncode({
    alg: "HS256",
    typ: "JWT",
  });

  const body = base64UrlEncode({
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  });

  const signature = signSegment(`${header}.${body}`);

  return `${header}.${body}.${signature}`;
}

function verifyAuthToken(token) {
  const segments = token.split(".");

  if (segments.length !== 3) {
    throw new Error("Invalid authentication token.");
  }

  const [header, body, signature] = segments;
  const expectedSignature = signSegment(`${header}.${body}`);

  if (signature.length !== expectedSignature.length) {
    throw new Error("Invalid authentication token.");
  }

  const isValidSignature = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!isValidSignature) {
    throw new Error("Invalid authentication token.");
  }

  const payload = JSON.parse(base64UrlDecode(body));
  const now = Math.floor(Date.now() / 1000);

  if (payload.exp && payload.exp <= now) {
    throw new Error("Authentication token has expired.");
  }

  return payload;
}

module.exports = {
  createAuthToken,
  verifyAuthToken,
};
