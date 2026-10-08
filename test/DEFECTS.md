# Defectos detectados en el paso 4

## TOKEN-01: rechazo de createToken deja el checkout procesando

- Requerimientos: RF10, RF12, RNF04. Estado: deuda aceptada; corrección en paso 6.
- Prueba: `src/app/store/pages/checkout/checkout.component.spec.ts`,
  `rechazo de la promesa de tokenización se informa y libera el estado de procesamiento`.
- Preparación: tarjeta completa con handlers simulados; createToken rechaza su promesa.
- Esperado: manejar el error, informar al cliente y liberar paying sin enviar pago.
- Observado: initPay rechaza y paying queda true. sendPayment no se llama.
- Causa: await createToken está antes del try/finally que libera el procesamiento.
- Un error devuelto como { error } y una respuesta sin token sí se manejan; sus pruebas pasan.
- Resultado 2026-10-07: Chrome Headless, 64 aprobadas y 1 fallida de 65.
  Línea base previa: 48/48. No se modificó el componente ni la configuración.
- Corregir requiere incluir la tokenización en el manejo de errores y garantizar la liberación
  del estado. No se realizaron llamadas reales a Stripe.
- Por instrucción del usuario, el caso se conserva como `xit` con sus aserciones originales.
  Es pendiente, no cobertura aprobada. Reactivarlo al realizar la corrección del paso 6.
