import Customer from "./customer.model";
import { buildCustomerInfo } from "./buildCustomerInfo";
import { AuthServices } from "../../services/Auth";

export const customerAuth = async (req, res, next) => {
	const token = AuthServices.getTokenFromHeaders(req);

	if (!token) {
		req.user = null;

		return res.sendStatus(401);
	}

	const customer = await Customer.findById(token.id);

	if (!customer) {
		req.user = null;

		return res.sendStatus(401);
	}

	req.user = customer;

	return next();
};

export const getOrCreateCustomer = async (info, providerName) => {
	const customerInfo = buildCustomerInfo(info, providerName);
	const { provider, ...userInfo } = customerInfo;

	try {
		const _customer = await Customer.findOne({ email: customerInfo.email });

		if (!_customer) {
			const customer = await Customer.create({
				...userInfo,
				provider: [provider],
			});

			return customer;
		}

		//Determine provider data
		const providerExist = _customer.provider.find(
			(el) =>
				el.uid === customerInfo.provider.uid &&
				el.type === customerInfo.provider.type
		);

		if (providerExist) {
			return _customer;
		}
		// If this is a returning customer on a new provider, push new provider info
		_customer.provider.push(customerInfo.provider);

		//Update customer info
		await _customer.save();

		return _customer;
	} catch (error) {
		throw error;
	}
};

export const me = async (userId) => {
	try {
		const user = await Customer.findById(userId);

		if (!user) {
			throw new Error("User does not exist");
		}
		return user;
	} catch (error) {
		throw error;
	}
};
