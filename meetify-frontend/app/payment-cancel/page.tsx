export default function PaymentCancel() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Payment Cancelled ❌</h1>
      <p>You cancelled the payment. No booking was made.</p>

      <a href="/meetify/slots">Try again</a>
    </div>
  );
}
