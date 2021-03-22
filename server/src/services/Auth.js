import jwt from "jsonwebtoken";

const JWT_SECRET = "helloworld";

const JWT_OPTS = {
	issuer: "InStore",
	expiresIn: '1h',
};

const createToken = (user) => {
	if (!user && !user._id) {
		return null;
	}

	const payload = {
		id: user._id,
	};

	return jwt.sign(payload, JWT_SECRET, JWT_OPTS);
};

const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET, JWT_OPTS);
};

//Get the token from the request header and verify legitimacy by returning a "decoded token token"
const getTokenFromHeaders = (req) => {
	const token = req.headers.authorization;
	//Sample of token from header: 'bearer saghighghliaeh32h4bth3ho49'

	if (token) {
		const arr = token.split(" "); 

		if (arr[0] === "Bearer" && arr[1]) {
			try {
				return verifyToken(arr[1]); 
			} catch (error) {
				return null;
			}
		}
	}

	return null;
};

export const AuthServices = {
	createToken,
	verifyToken,
	getTokenFromHeaders,
};
