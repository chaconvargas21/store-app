# CLAUDE.md

Guía para Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Resumen

**StoreApp** es un e-commerce en Angular 21 con carrito de compras, catálogo de productos, autenticación
e integración de pagos con Stripe. Usa TailwindCSS y Angular Material para la UI, con una arquitectura
modular organizada por features. El backend es `../store-back` (API REST Express + MongoDB).

## Comandos

### Ejecutar la aplicación
- **Servidor de desarrollo**: `npm start` o `ng serve` — corre en `http://localhost:4200`
- **Build de producción**: `npm run build:prod` — compila con `--base-href /store-app/`
- **Build de desarrollo**: `npm run build` — compila sin base-href
- **Modo watch**: `npm run watch` — recompila ante cambios
- **Builder**: `@angular/build:application` (esbuild). `outputPath` usa `browser: ""` para que la salida
  quede en `dist/store-app/` y no en `dist/store-app/browser/` (el CI depende de esa ruta).

### Tests
- **Correr todos los tests**: `npm test` (watch, abre Chrome) o `npm run test:ci` (una corrida, headless; es lo que usa el CI)
- **Tests de un solo componente**: `npm test -- --include='**/component-name.spec.ts'`
- **Tests con coverage**: `npm test -- --no-watch --code-coverage`

### Generación de código
- **Componente**: `ng generate component path/component-name`
- **Servicio**: `ng generate service path/service-name`
- **Guard**: `ng generate guard path/guard-name`

## Arquitectura

### Organización de módulos (por feature)

La app se generó con Angular CLI 13 y se actualizó in-place a Angular 21 (ver `package.json`). Angular 21
genera componentes standalone por defecto, pero este código mantiene a propósito la arquitectura previa
basada en NgModules: cada componente declara `standalone: false` explícitamente y está en las
`declarations` de un módulo de feature. No pasar un componente a standalone sin sacarlo también de las
`declarations` de su módulo y actualizar todos los módulos que lo importan.

La app usa **módulos de feature con lazy loading** para organizar el código por dominio:

```
src/app/
├── app.module.ts              // Módulo raíz: HTTP client, animaciones
├── app-routing.module.ts      // Routing raíz con lazy loading
│
├── store/                     // Feature: tienda y catálogo (lazy-loaded)
│   ├── services/store.service.ts  // Llamadas al API: productos, carrito, órdenes, pagos
│   ├── store.module.ts
│   ├── store-routing.module.ts
│   │
│   ├── home/                  // Landing
│   ├── collections/           // Navegación por categoría
│   │   └── shop/shop.component.ts
│   └── pages/                 // Páginas de detalle
│       ├── collection/        // Productos de una categoría
│       ├── item/              // Detalle de un producto
│       └── checkout/          // Pago y confirmación de la orden
│
├── auth/                      // Feature: autenticación (lazy-loaded)
│   ├── services/auth.service.ts
│   ├── guards/auth.guard.ts  // Protección de rutas (solo se usa en store/checkout)
│   ├── auth.module.ts
│   ├── auth-routing.module.ts
│   └── pages/
│       ├── login/
│       └── sign-in/
│
└── shared/                    // Componentes y servicios reutilizables
    ├── components/
    │   ├── navbar/           // Navegación principal
    │   ├── sidebar/          // Menú mobile
    │   ├── shopping-cart/    // Preview del carrito
    │   ├── sidebar-checkout/ // Resumen del checkout
    │   ├── card-item/        // Tarjeta de producto (reutilizable)
    │   ├── card-list/        // Grilla de productos
    │   └── footer/
    ├── pages/
    │   └── error-page/       // Página 404
    ├── validators/           // Validadores de formularios
    └── shared.module.ts
```

### Servicios principales

**StoreService** (`src/app/store/services/store.service.ts`):
- `getItems()` — lista todos los productos (`GET /api/product` → `products`)
- `getItemById(id)` — trae un producto (`GET /api/product/:id` → `product`). `Item` replica el modelo
  `Product` del backend; las categorías de calzado se filtran en el cliente (`shared/constants/categories.ts`)
  con palabras clave ajustadas a los 20 productos reales; `categories.spec.ts` verifica que ninguna categoría
  quede vacía. La API tampoco tiene fotos: `shoeImage(item)` (`shared/constants/shoe-images.ts`) elige la
  foto por nombre de producto (fotos CC0 en `assets/images/productos/`, créditos en su `CREDITOS.md`; un
  producto sin foto muestra `assets/generic.jpg`) y `shoe-images.spec.ts` verifica que los 20 tengan la suya.
  Los dos specs usan la lista de `products.testing.ts`: si cambian los productos en `store-back`,
  actualizar esa lista, las palabras clave y las fotos.
- `addItem(id)` — agrega al carrito (`POST /api/cart/:id`)
- `removeItemCartShopping(id)` — quita del carrito
- `getItemsCartShopping()` — contenido del carrito
- `getOrder()` — orden actual (la que quedó en la sesión)
- `postOrder(data)` — inicia el checkout con los datos del cliente (requiere JWT)
- `sendPayment(token)` — paga con un token de tarjeta de Stripe (requiere JWT)
- `confirmOrder()` — estado en Stripe de la orden actual

Todas las llamadas usan `withCredentials: true` por las cookies de sesión. `postOrder` y `sendPayment`
además mandan el JWT en el header `x-token` (helper privado `authHeaders()`, que lee `localStorage.token`)
— el backend usa `x-token`, no `Authorization: Bearer`.

**AuthService** (`src/app/auth/services/auth.service.ts`):
- `login`/`signup` guardan el JWT en `localStorage.token`.
- `validateToken()` renueva el token contra `GET /auth/renew` (con `x-token`); lo usa `AuthGuard`.
- `logout()` limpia el `localStorage`.

## Checkout y pago

Contrato con el backend (`../store-back`, `PATCH /api/order` → `updateOrder`). El backend crea **y
confirma** el PaymentIntent en la misma llamada (`confirm: true`), así que Stripe.js solo se usa para
tokenizar la tarjeta (`STRIPE.createToken`). **No** llamar `handleCardPayment`/`confirmCardPayment` con
un `client_secret`: ese era el modelo viejo de confirmación en el navegador y ya no aplica.

- Pantalla: tres pasos en acordeón (Mis datos → Dirección de entrega → Pago). "Continuar al pago"
  llama a `postOrder`; los campos de Stripe se montan una vez en `ngAfterViewInit` (el paso de pago
  usa `[hidden]`, no `*ngIf`). Con el carrito vacío (`cartEmpty`, que lee `SidebarCheckoutComponent.items`
  una vez cargado) se muestra "Tu carrito está vacío" y los pasos se ocultan con una clase, por lo mismo.
  `shipping.name` es el destinatario (va al `shipping` del PaymentIntent),
  `address.country` es `PE` y `city` = "Distrito, Provincia" (Address no tiene distrito).
- Solo `store/checkout` está protegida (`canActivate: [AuthGuard]` en `pages-routing.module.ts`); el
  catálogo y el carrito siguen siendo anónimos, igual que en el backend ("login solo para pagar"). Sin
  token válido, `AuthGuard` redirige a `/auth`.
- `postOrder` (`POST /api/order`): 200 guarda el staging de la orden; 401 → "Iniciá sesión para pagar".
- `sendPayment` (`PATCH /api/order`):
  - **200** con `data.status === "succeeded"` → pagado ("Pago realizado").
  - **402** `{ error, status }` → tarjeta rechazada ("Tarjeta rechazada"). El backend conserva el carrito
    y reusa la misma orden en el reintento, así que el componente re-habilita `paymentForm` para probar
    con otra tarjeta.
  - **409** `{ error }` → la orden ya fue pagada o hay otro intento en curso: muestra el mensaje del
    backend y **no** re-habilita el formulario.
  - **500** → mensaje genérico y re-habilita `paymentForm`. Reintentar es seguro: el backend escribe la
    orden antes de cobrar, reembolsa si no pudo registrar el pago y responde 409 si ya estaba pagada.
  - **401** → sesión expirada; cualquier otro → mensaje de error genérico.
- 3D Secure **no está soportado**: el backend registra esos pagos como `failed` (402). Aceptable en modo
  test de Stripe; para cobros reales haría falta confirmación en el navegador + webhook
  `payment_intent.succeeded` en el backend.
- Tarjetas de prueba: `4242 4242 4242 4242` (aprobada), `4000 0000 0000 0002` (rechazada),
  `4000 0025 0000 3155` (3DS → falla por diseño).
- Estado: verificado en producción el 2026-09-25 (GitHub Pages + Cloud Run, Chrome headless con
  Puppeteer): `AuthGuard`, 402 → snackbar rojo y reintento, 401 → sesión expirada, 200 → snackbar verde y
  pantalla de pagado, recarga → "ya fue pagada". El 2026-09-26 se verificó también que el email se
  precarga (lo devuelve `/auth/renew`) y que agregar al carrito usa `POST`.
  Usuarios de prueba: `qa+checkout202609252305@example.com` (una orden pagada del Mocasín, modo test) y
  `qa+email202609252334@example.com` (contraseña `qa-password-1`; una orden de la Ojota pagada al
  segundo intento, tras un rechazo: verificó el cobro en dos pasos de `store-back` el 2026-09-26).

### Configuración por entorno

- `src/environments/environment.ts` — desarrollo (lo usa `ng serve`; `baseUrl` → `http://localhost:4000/api`)
- `src/environments/environment.prod.ts` — producción (lo usa `ng build --configuration production`;
  `baseUrl` → Cloud Run)

Ambos exportan `environment.baseUrl` (endpoint del API) y `environment.stripe_pk` (clave pública de
Stripe; tiene que ser de la misma cuenta que la `STRIPE_SK` del backend).

### Estilos

- **Framework**: TailwindCSS (v3.0.23) + Angular Material (tema m2 indigo-pink)
- **Plugins**: `@tailwindcss/forms`, `@tailwindcss/typography`
- **Estilos globales**: `src/sass/styles.scss`. El tema de Material se define ahí y solo incluye lo que la app
  usa (`typography-hierarchy`, `dialog-theme`, `snack-bar-theme`); no se carga el prebuilt `indigo-pink.css`
  (110 kB). Si se agrega otro componente de Material, sumar su `mat.<componente>-theme` en ese bloque.
- **Estilos de componentes**: SCSS (configurado en los schematics de `angular.json`)

### Dependencias importantes

- **RxJS 7.8**: `Observable`, `map`, `catchError`, `of`
- **Stripe.js**: tokenización de tarjetas en el checkout
- **MatSnackBar** (Angular Material): mensajes de feedback al usuario (también los errores de `login`/`sign-in`); el checkout usa el helper `notify(message, type)` con las clases globales `snackbar-success`/`snackbar-danger` (`src/sass/styles.scss`). Reemplazó a `ngx-toast-notifications`.
- **Angular Material y CDK**: componentes de UI y accesibilidad

## Tipado

- **TypeScript 5.9** con strict mode (ver schematics de `angular.json`)
- Las **interfaces** viven junto a cada feature:
  - `src/app/store/interfaces/item.interface.ts` — tipos de producto/carrito
  - `src/app/shared/interfaces/item.interface.ts`
  - `src/app/auth/interfaces/auth.interface.ts`

## Patrones comunes

### Manejo de errores HTTP
La mayoría de los métodos de servicio usan este patrón:
```typescript
.pipe(
  map((resp) => resp.property),
  catchError((err) => of(err.error.msg))
)
```
`catchError` devuelve el mensaje de error envuelto en `of()`, no lanza un error: los componentes que los
consumen reciben un `string` en vez de una excepción.

**Excepción:** `postOrder` y `sendPayment` **no** tienen `catchError`: dejan propagar el
`HttpErrorResponse` para que `CheckoutComponent` decida según el status HTTP (401 / 402). No volver a
agregarles el patrón que traga el error.

### Lazy loading
Las rutas usan `loadChildren` con imports dinámicos (sin preloading):
```typescript
{
  path: 'store',
  loadChildren: () => import('./store/store.module').then((m) => m.StoreModule),
}
```

### Credenciales
Las operaciones de carrito y orden necesitan `withCredentials: true` porque el backend guarda el carrito
en la sesión (cookie de `express-session`).

## Tips de debugging

- **Source maps**: `ng serve` permite depurar TypeScript en DevTools.
- **Pestaña Network**: si fallan las llamadas al API, verificar que `baseUrl` sea el correcto.
- **Diferencias entre entornos**: si `ng serve` funciona pero `npm run build:prod` no, revisar
  `environment.prod.ts`.
- **Guards**: `AuthGuard` está comentado a propósito para todo el módulo `store` (`app-routing.module.ts`)
  y aplicado solo a `store/checkout` (`pages-routing.module.ts`).
- **401 en el checkout**: verificar que exista `localStorage.token` y que la request lleve `x-token`.
- **CORS**: el backend solo acepta los orígenes `http://localhost:4200` y
  `https://chaconvargas21.github.io`.
- **Componente que no renderiza**: verificar que el módulo padre esté importado o que el path del lazy
  loading sea correcto.

## Tests

Todos los componentes tienen su `.spec.ts`. Los tests usan Karma + Jasmine (`@angular/build:karma`,
sin `src/test.ts`: el builder encuentra los `*.spec.ts` e inicializa el `TestBed`; `zone.js/testing` va en `polyfills`).

- `npm test` corre en modo watch con Chrome; `npm run test:ci` hace una sola corrida con `ChromeHeadlessCI`
  (`--no-sandbox`, porque los runners de Ubuntu 24+ bloquean el sandbox de Chrome).
- Karma sirve los tests en `http://localhost:9876` (configurable en `karma.conf.js`).
- Specs livianos: cada componente se declara solo, con los módulos de sus directivas (`RouterModule` +
  `provideRouter([])`, `ReactiveFormsModule`) y `CUSTOM_ELEMENTS_SCHEMA` para los `app-*` hijos. Los que llaman
  al API usan un mock de `StoreService`/`AuthService` o `provideHttpClient()` + `provideHttpClientTesting()`.
- `checkout.component.spec.ts` stubbea `window.Stripe` (y lo restaura en `afterEach`) y cubre las ramas de
  `initPay` (200 / 402 / 409 / 401), la orden ya pagada de `loadDetail` y el carrito vacío.
- El `TestBed` de Angular 21 es zoneless (la app no: `provideZoneChangeDetection()` en `AppModule`):
  `fixture.detectChanges()` solo revisa las vistas marcadas, así que después de cambiar estado a mano hay que
  llamar `fixture.componentRef.changeDetectorRef.markForCheck()` o salta `NG0100`.

## Git y commits

- Este `CLAUDE.md` se versiona: los cambios se commitean como cualquier otro doc.
- Al modificar environments o paths de assets, probar tanto el build de desarrollo como el de producción.

## CI / deploy

- `.github/workflows/main.yml` corre en cada push a `main`: `npm i` → `npm run test:ci` → `npm run build:prod` → renombra
  `index.html` a `404.html` (routing de la SPA) → deploy a GitHub Pages
  (`https://chaconvargas21.github.io/store-app/`, responde HTTP 404 a propósito por ese renombre).
- En los `pull_request` a `main` corre solo hasta el build: el renombre y el deploy tienen
  `if: github.event_name != 'pull_request'` (antes un PR publicaba su versión en Pages sin mergearse).
- Usa **Node 22** (Angular 21 exige `^20.19 || ^22.12 || >=24`; con Node 18 la CLI sale con exit code 3).
- Si el build pasa local pero falla en CI, reproducir con instalación limpia (`rm -rf node_modules && npm ci`):
  un `node_modules` viejo puede esconder librerías View Engine que solo compilaban gracias a `ngcc`
  (así pasó con `ngx-toast-notifications`, commit `5d32f39`).

## Pendientes

Estado al 2026-09-25. Cada pendiente con su solución; lo que se resuelve en `store-back` o
`worker-service` vive en el `CLAUDE.md` de ese repo. Prioridad:

- **Alta**: afecta a producción hoy o está en producción sin verificar.
- **Media**: riesgo acotado o con fecha; conviene resolverlo en las próximas semanas.
- **Baja**: mejoras sin impacto visible para el usuario.

### Alta

Nada pendiente. El catálogo, el navbar y el tema de Material se verificaron en producción el 2026-09-25
(Chrome headless): las 8 categorías/colecciones con la cantidad esperada, las 20 imágenes, mega menú,
búsqueda, anclas Contacto/Newsletter, drawer del carrito, snackbars verde/rojo, tipografía y menú mobile.
Lo único roto era el navbar en mobile (desbordaba 21 px, y 190 px con el buscador abierto): corregido.

### Media

- [ ] **Runner de CI**: `ubuntu-latest` pasa a Ubuntu 26 desde el **2026-10-19**. Solución: revisar el
  primer build después de esa fecha; si falla, fijar `runs-on: ubuntu-24.04` mientras se corrige.

### Baja

Nada pendiente.
