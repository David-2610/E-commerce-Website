import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
const paypalbutton = ({ amount, onSuccess, onError }) => {
	return (
		<PayPalScriptProvider
			options={{
				"client-id":
					"Ac_dktsMwU7nrMs2J1JQy_bw573V0ydAhuzyXsgSW5E9mx7V7pAxFOWnPvW94XbcmNuViwSvvF4HZ1Wz"
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
