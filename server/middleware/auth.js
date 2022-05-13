import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) res.json({ success: "false", error: "NO TOKEN PROVIDED" });
  try {
    const decoded = jwt.decode(token);

    if (decoded.iss === "accounts.google.com") {
      const CLIENT_ID_GOOGLE = process.env.CLIENT_ID;
      const client = new OAuth2Client(CLIENT_ID_GOOGLE);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID_GOOGLE,
      });
      const payload = ticket.getPayload();//TODO: get USER ID from Sub
      req.userID = payload["sub"];
    } else if (decoded.iss === "Server") {
      const verified = jwt.verify(token, process.env.PRIVATEKEY);
      req.userID = verified.id;
    }
    console.log("MiddleWare:", req.userID);
    next();
  } catch (error) {
    res.json({ success: "false", error: "Invalid token" });
  }
};

export default auth;
