import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
const paypalbutton = ({ amount, onSuccess, onError }) => {
	return (
		<PayPalScriptProvider
			options={{
				"client-id":
					"AQ6KilouWTQz6jMgYxZYaP9a6v65yUMhpF_cj05fo4d_epDg5KuklVpa_HG3zpnyu2lPJREXobjfm7G7"
			}}
		>
			<PayPalButtons
				style={{ layout: "vertical" }}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [{ amount: { value: amount } }],
					});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then(onSuccess);
				}}
				onError={onError}
			/>
		</PayPalScriptProvider>
	);
};

export default paypalbutton;
