import wretch from "wretch";

export const customersApi = wretch(
	"http://192.168.0.132:3000/api/v1/customers"
);
