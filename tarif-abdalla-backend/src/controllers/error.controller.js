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

const handleError = (req, res) => {
  res.status(500).json({ error: "Server error" });
};

module.exports = {
  handleError,
  getErrorMessage,
};

