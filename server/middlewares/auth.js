import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, login again to continue.",
    });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
      next();
    } 
    else {
      return res.json({
        success: false,
        message: "Not Authorized, login again to continue.",
      });

    }
  } catch (error) {
		return res.json({
		success: false,
		message: error.message,
		});
  }
};

export default userAuth;
