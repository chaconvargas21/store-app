// Contrato de /api/order con store-back (controllers/order.js).

// Datos del formulario de checkout (POST /api/order). `shipping` va tal cual
// al `shipping` del PaymentIntent de Stripe.
export interface PostOrderPayload {
  firstName: string;
  lastName: string;
  receipt_email: string;
  shipping: Shipping;
}

export interface Shipping {
  // Destinatario del envío.
  name: string;
  phone: string;
  address: {
    // Código ISO de dos letras ('PE').
    country: string;
    state: string;
    // "Distrito, Provincia": Address de Stripe no tiene campo de distrito.
    city: string;
    postal_code: string;
    line1: string;
    line2: string;
  };
}

// La orden de la sesión (GET /api/order): el staging de postOrder (sin
// stripeId) o, tras un pago exitoso, la Order ya pagada (con stripeId). El
// cliente solo lee `stripeId`.
export interface SessionOrder {
  stripeId?: string | null;
}

export interface GetOrderResponse {
  order: SessionOrder | null;
}

// POST /api/order responde con el staging guardado en la sesión.
export interface PostOrderResponse {
  data: PostOrderPayload;
}

// PATCH /api/order responde 200 con el PaymentIntent confirmado; el cliente
// solo mira `status` ('succeeded' = cobrado).
export interface PaymentResponse {
  data: { status: string };
}

// GET /api/order/confirm: estado del PaymentIntent en Stripe (null si falló la llamada).
export interface ConfirmOrderResponse {
  status: string | null;
}
