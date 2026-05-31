import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Política de privacidad · ${site.name}`,
  description:
    "Conocé cómo Lulu recopila, usa y protege tus datos personales de acuerdo con la Ley 18.331 de Uruguay.",
  alternates: { canonical: "/privacidad" },
  robots: { index: false },
};

export default function PrivacyPage() {
  const lastUpdated = "31 de mayo de 2025";

  return (
    <main className="privacy-page">
      <div className="privacy-container">
        <header className="privacy-header">
          <p className="eyebrow">Política de privacidad</p>
          <h1>Tus datos, tu privacidad</h1>
          <p className="privacy-lead">
            En {site.name} nos tomamos en serio la protección de tus datos
            personales. Esta política explica qué información recopilamos, cómo
            la usamos y cuáles son tus derechos.
          </p>
          <p className="privacy-updated">Última actualización: {lastUpdated}</p>
        </header>

        <section aria-labelledby="s-responsable">
          <h2 id="s-responsable">Responsable del tratamiento</h2>
          <p>
            <strong>{site.legalName}</strong>, con domicilio en {site.city},
            Uruguay.
            <br />
            Podés contactarnos a través de WhatsApp:{" "}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{site.whatsappNumber}
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="s-datos">
          <h2 id="s-datos">Datos que recopilamos</h2>
          <p>
            Solo recopilamos la información estrictamente necesaria para
            brindarte nuestros servicios:
          </p>
          <ul>
            <li>
              <strong>Datos de contacto</strong> — nombre y número de teléfono
              cuando nos escribís por WhatsApp para consultar o comprar un
              producto.
            </li>
            <li>
              <strong>Datos de entrega</strong> — dirección postal cuando
              coordinamos el envío de tu pedido.
            </li>
            <li>
              <strong>Datos de navegación</strong> — información técnica anónima
              del dispositivo y navegador (cookies funcionales, sin seguimiento
              publicitario).
            </li>
          </ul>
          <p>
            No recopilamos datos de tarjetas de crédito ni información de pago;
            las transacciones se realizan a través de canales seguros de
            terceros.
          </p>
        </section>

        <section aria-labelledby="s-uso">
          <h2 id="s-uso">¿Para qué usamos tus datos?</h2>
          <ul>
            <li>Procesar y coordinar tus pedidos.</li>
            <li>Responder consultas y brindarte atención al cliente.</li>
            <li>
              Enviarte información sobre productos o promociones que hayas
              solicitado (nunca spam sin tu consentimiento).
            </li>
            <li>
              Mejorar la experiencia de navegación en nuestro sitio (análisis
              anónimos de uso).
            </li>
          </ul>
        </section>

        <section aria-labelledby="s-cookies">
          <h2 id="s-cookies">Cookies</h2>
          <p>
            Usamos únicamente cookies funcionales necesarias para el
            funcionamiento del sitio (por ejemplo, para recordar los productos
            que agregaste al carrito). No utilizamos cookies de seguimiento
            publicitario ni compartimos tu actividad de navegación con terceros.
          </p>
          <p>
            Podés deshabilitar las cookies desde la configuración de tu
            navegador, aunque algunas funciones del sitio podrían verse
            afectadas.
          </p>
        </section>

        <section aria-labelledby="s-compartir">
          <h2 id="s-compartir">¿Compartimos tus datos?</h2>
          <p>
            No vendemos ni cedemos tus datos personales a terceros. Solo
            podríamos compartir información en los siguientes casos:
          </p>
          <ul>
            <li>
              Con servicios de logística para coordinar la entrega de tu pedido.
            </li>
            <li>
              Cuando sea requerido por ley o por orden de autoridad competente.
            </li>
          </ul>
        </section>

        <section aria-labelledby="s-derechos">
          <h2 id="s-derechos">Tus derechos (Ley 18.331)</h2>
          <p>
            De acuerdo con la Ley N.° 18.331 de Protección de Datos Personales
            de Uruguay, tenés derecho a:
          </p>
          <ul>
            <li>
              <strong>Acceso</strong> — solicitarnos qué datos personales tuyos
              tenemos almacenados.
            </li>
            <li>
              <strong>Rectificación</strong> — corregirnos si algún dato es
              inexacto o incompleto.
            </li>
            <li>
              <strong>Supresión</strong> — pedirnos que eliminemos tus datos
              cuando ya no sean necesarios.
            </li>
            <li>
              <strong>Oposición</strong> — oponerte al tratamiento de tus datos
              para fines de comunicación comercial.
            </li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escribinos por WhatsApp
            al{" "}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{site.whatsappNumber}
            </a>
            . Responderemos en un plazo máximo de 5 días hábiles.
          </p>
        </section>

        <section aria-labelledby="s-seguridad">
          <h2 id="s-seguridad">Seguridad</h2>
          <p>
            Adoptamos medidas técnicas y organizativas razonables para proteger
            tus datos contra acceso no autorizado, pérdida o divulgación. Sin
            embargo, ningún sistema es 100&nbsp;% infalible; si detectás algún
            problema, por favor contactanos de inmediato.
          </p>
        </section>

        <section aria-labelledby="s-cambios">
          <h2 id="s-cambios">Cambios a esta política</h2>
          <p>
            Podemos actualizar esta política en cualquier momento. Cuando lo
            hagamos, actualizaremos la fecha al comienzo de la página. Si los
            cambios son significativos, lo comunicaremos a través de nuestros
            canales habituales.
          </p>
        </section>
      </div>
    </main>
  );
}
