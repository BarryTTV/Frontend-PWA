const stripe = Stripe("pk_test_51T48AMEPCgeedYzr8GT08Tt9PZ4cMha7ZQY71ArnkH9OLExPWaujlaSR2vOYi8JuLNLgSh8oZbNBF7SEkJmjmVhc00spbwA9R8"); // 👈 pega tu pk_test real

let elements;
let clientSecret;

async function initPayment() {
    const res = await fetch("https://backend-pwa-k9hq.onrender.com/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }),
    });

    const data = await res.json();
    clientSecret = data.clientSecret;

    elements = stripe.elements({ clientSecret });

    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
}

initPayment();

const form = document.getElementById("payment-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("error-message").textContent = "";
    document.getElementById("success-message").textContent = "";

    const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
    });

    if (error) {
        document.getElementById("error-message").textContent = error.message;
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
        document.getElementById("success-message").textContent =
            "✅ Pago realizado con éxito!";
    }
});