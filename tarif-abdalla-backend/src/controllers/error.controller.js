// Extracts a readable message from common backend error shapes.
const getErrorMessage = (errMsg) => {
  if (!errMsg) {
    return "Unknown server error";
  }

  if (errMsg.code === 11000) {
    return "Email already exists";
  }

  if (errMsg.errors) {
    const firstKey = Object.keys(errMsg.errors)[0];
    if (firstKey && errMsg.errors[firstKey].message) {
      return errMsg.errors[firstKey].message;
    }
  }

  return errMsg.message || "Unknown server error";
};

// Sends a generic internal server error response.
const handleError = (req, res) => {
  res.status(500).json({ error: "Server error" });
};

module.exports = {
  handleError,
  getErrorMessage,
};

