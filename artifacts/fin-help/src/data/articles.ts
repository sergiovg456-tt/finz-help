export interface ArticleSection {
  heading: string;
  content: string;
  bullets?: string[];
}

export interface Article {
  id: number;
  title: string;
  category: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  readTime: string;
  updatedAt: string;
  description: string;
  intro: string;
  sections: ArticleSection[];
  tips: string[];
  keyPoints: string[];
  summary: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Cómo crear tu primer presupuesto",
    category: "Presupuesto",
    level: "Principiante",
    readTime: "5 min",
    updatedAt: "Junio 2025",
    description: "Guía paso a paso para organizar tus finanzas y empezar a ahorrar desde hoy.",
    intro:
      "Un presupuesto no es una restricción: es un mapa. Te dice exactamente a dónde va tu dinero y te da el control para decidir si quieres que siga yendo ahí. La mayoría de las personas que sienten que 'el dinero no les alcanza' simplemente no saben en qué lo están gastando. Crear tu primer presupuesto cambia eso de inmediato.",
    sections: [
      {
        heading: "¿Por qué necesitas un presupuesto?",
        content:
          "Sin un presupuesto, el dinero fluye sin dirección. Lo que sientes al final del mes —esa sensación de 'no sé en qué lo gasté'— es el síntoma de no tener un plan. Un presupuesto te permite tomar decisiones conscientes: gastar en lo que realmente importa y reducir lo que no. Estudios muestran que las personas con presupuesto ahorran hasta tres veces más que quienes no tienen uno.",
      },
      {
        heading: "Paso 1: Calcula tus ingresos netos",
        content:
          "El punto de partida es saber cuánto dinero entra a tu vida cada mes. Suma todos tus ingresos después de impuestos: salario, trabajo freelance, rentas, pensiones, cualquier fuente. Si tus ingresos varían, usa el promedio de los últimos tres meses como base conservadora.",
        bullets: [
          "Salario neto (después de impuestos y deducciones)",
          "Ingresos secundarios: freelance, comisiones, rentas",
          "Transferencias o apoyos regulares",
          "Intereses de cuentas de ahorro o inversiones",
        ],
      },
      {
        heading: "Paso 2: Registra todos tus gastos",
        content:
          "Durante un mes, registra cada peso que gastas. Revisa tus estados de cuenta bancarios y de tarjetas de los últimos 2-3 meses para identificar patrones. Clasifica los gastos en fijos (renta, servicios, seguros) y variables (comida, entretenimiento, ropa).",
        bullets: [
          "Gastos fijos: renta/hipoteca, luz, agua, internet, teléfono, seguros",
          "Gastos variables: supermercado, gasolina, restaurantes, ropa",
          "Gastos anuales divididos en 12: mantenimiento del coche, vacaciones, regalos",
          "Suscripciones digitales: streaming, apps, membresías",
        ],
      },
      {
        heading: "Paso 3: Aplica la regla 50/30/20",
        content:
          "Una de las metodologías más sencillas y efectivas para principiantes es la regla 50/30/20, popularizada por la senadora Elizabeth Warren. Divide tus ingresos netos en tres categorías:",
        bullets: [
          "50% — Necesidades: renta, comida básica, transporte al trabajo, servicios esenciales",
          "30% — Deseos: restaurantes, entretenimiento, viajes, ropa no esencial",
          "20% — Ahorro e inversión: fondo de emergencia, retiro, metas financieras",
        ],
      },
      {
        heading: "Paso 4: Ajusta y equilibra",
        content:
          "Si tus gastos en alguna categoría superan el porcentaje sugerido, identifica dónde puedes reducir. Esto no significa sacrificar todo lo que disfrutas, sino priorizar conscientemente. Pequeños ajustes —cancelar suscripciones sin usar, cocinar en casa dos veces más por semana— tienen un impacto enorme a largo plazo.",
      },
      {
        heading: "Herramientas para mantener tu presupuesto",
        content:
          "No necesitas software sofisticado para empezar. Una hoja de cálculo simple, una libreta, o apps gratuitas como Spendee o Wallet son suficientes. Lo importante es la consistencia: revisa tu presupuesto al menos una vez por semana y ajusta al final de cada mes.",
      },
    ],
    tips: [
      "Automatiza tus ahorros: el primer día del mes, transfiere automáticamente el 20% a una cuenta separada antes de gastar.",
      "No te rindas si el primer mes no sale perfecto. El presupuesto se afina con la práctica.",
      "Incluye una categoría de 'dinero para ti mismo' — pequenas recompensas evitan el agotamiento financiero.",
      "Revisa subscripciones cada 3 meses. La mayoría de las personas paga por servicios que no usa.",
      "Usa efectivo para categorías donde tiendes a gastar de más: cuando se acaba el efectivo, se acabó el presupuesto.",
    ],
    keyPoints: [
      "Un presupuesto es un plan, no una restricción.",
      "Conocer tus ingresos y gastos reales es el primer paso.",
      "La regla 50/30/20 es ideal para comenzar.",
      "La consistencia mensual es más importante que la perfección.",
      "Automatizar el ahorro elimina la fuerza de voluntad de la ecuación.",
    ],
    summary:
      "Crear un presupuesto es el acto más poderoso que puedes hacer por tus finanzas personales. No requiere ser experto en matemáticas ni usar herramientas complejas. Requiere honestidad sobre lo que entra y sale, y la decisión de alinear tu dinero con tus prioridades. Empieza hoy con la regla 50/30/20 y ajusta con el tiempo.",
  },
  {
    id: 2,
    title: "Inversión para principiantes",
    category: "Inversión",
    level: "Principiante",
    readTime: "8 min",
    updatedAt: "Mayo 2025",
    description: "Todo lo que necesitas saber para empezar a invertir con poco dinero.",
    intro:
      "Invertir no es exclusivo de personas ricas. Con $500 pesos puedes empezar a hacer que tu dinero trabaje para ti. El mayor error que comete la gente con sus finanzas no es invertir de forma incorrecta: es no invertir en absoluto. El tiempo es el activo más valioso en la inversión, y cada día que esperas es tiempo perdido.",
    sections: [
      {
        heading: "¿Qué significa invertir?",
        content:
          "Invertir es poner tu dinero a trabajar con la expectativa de obtener un rendimiento a futuro. A diferencia del ahorro (que preserva el dinero), la inversión hace que crezca. Sin embargo, toda inversión conlleva algún nivel de riesgo: la posibilidad de ganar menos de lo esperado, o incluso perder parte del capital. Entender esta relación riesgo-rendimiento es fundamental.",
      },
      {
        heading: "Tipos de inversión más comunes",
        content: "Existen múltiples instrumentos de inversión, cada uno con sus propias características:",
        bullets: [
          "CETES (Certificados de la Tesorería): la forma más segura y accesible en México. Rendimientos bajos pero garantizados por el gobierno. Puedes empezar desde $100 pesos en cetesdirecto.mx.",
          "Fondos de inversión: grupos de activos administrados profesionalmente. Ideal para quien no quiere gestionar individualmente sus inversiones.",
          "Acciones: participación en empresas que cotizan en bolsa. Mayor riesgo y mayor rendimiento potencial a largo plazo.",
          "ETFs (Exchange Traded Funds): fondos que replican índices bursátiles. Bajo costo y diversificación automática.",
          "Bienes raíces: inversión en propiedades, ya sea directa o mediante FIBRAs (FideIcomisos de Inversión en Bienes Raíces) en bolsa.",
        ],
      },
      {
        heading: "¿Cuánto riesgo puedes tolerar?",
        content:
          "Tu tolerancia al riesgo depende de tres factores: tu horizonte de tiempo (cuándo necesitas el dinero), tu situación financiera (si tienes fondo de emergencia), y tu perfil psicológico (¿puedes ver tu inversión caer 30% sin pánico?). Como regla general: mayor horizonte de tiempo = mayor tolerancia al riesgo posible.",
        bullets: [
          "Perfil conservador: CETES, fondos de renta fija, depósitos bancarios",
          "Perfil moderado: combinación de renta fija y ETFs de acciones",
          "Perfil agresivo: acciones individuales, ETFs de mercados emergentes",
        ],
      },
      {
        heading: "Cómo empezar en la práctica",
        content:
          "El primer paso es tener un fondo de emergencia (3-6 meses de gastos) antes de invertir. Sin este colchón, cualquier emergencia te obligará a vender tus inversiones en el momento incorrecto. Una vez que tienes ese fondo, sigue estos pasos:",
        bullets: [
          "Abre una cuenta en cetesdirecto.mx para tus primeras inversiones (sin comisiones, desde $100 pesos)",
          "Define un monto mensual fijo para invertir, aunque sea pequeño",
          "Aumenta gradualmente la complejidad: primero CETES, luego fondos, luego ETFs",
          "Reinvierte los rendimientos en vez de retirarlos — el interés compuesto hace la magia",
        ],
      },
      {
        heading: "El error más común del principiante",
        content:
          "La mayoría de los principiantes esperan el 'momento perfecto' para invertir. La realidad es que nadie puede predecir el mercado. La estrategia más efectiva es invertir cantidades fijas en intervalos regulares (llamada dollar-cost averaging en inglés). Esto elimina la presión de timing y promedia el costo de compra con el tiempo.",
      },
    ],
    tips: [
      "Empieza ya, aunque sea con poco. $500 pesos mensuales durante 30 años a 8% de rendimiento se convierten en más de $700,000 pesos.",
      "Nunca inviertas dinero que necesitas en los próximos 12 meses.",
      "Diversifica: no pongas todos los huevos en la misma canasta.",
      "Lee al menos 10 minutos diarios sobre finanzas personales e inversión.",
      "Evita las inversiones que prometen rendimientos extraordinarios — suelen ser fraudes.",
    ],
    keyPoints: [
      "Invertir hace que tu dinero crezca por encima de la inflación.",
      "Mayor riesgo = mayor rendimiento potencial, y viceversa.",
      "Tener fondo de emergencia antes de invertir es obligatorio.",
      "El tiempo en el mercado supera al timing del mercado.",
      "CETES es el mejor punto de entrada para principiantes en México.",
    ],
    summary:
      "Invertir es más sencillo de lo que parece. Comienza con instrumentos seguros como CETES, construye el hábito de invertir mensualmente, y aumenta la complejidad conforme ganas experiencia. Lo más importante es empezar. El tiempo es el mayor aliado del inversionista.",
  },
  {
    id: 3,
    title: "Entendiendo el interés compuesto",
    category: "Inversión",
    level: "Intermedio",
    readTime: "6 min",
    updatedAt: "Abril 2025",
    description: "El poder del interés compuesto y cómo aprovecharlo para hacer crecer tu dinero.",
    intro:
      "Albert Einstein supuestamente llamó al interés compuesto 'la octava maravilla del mundo'. Sea o no cierta la anécdota, el concepto es real y transformador. El interés compuesto es la razón por la que empezar a invertir a los 25 años puede generar 10 veces más riqueza que empezar a los 45, aunque inviertas la misma cantidad total.",
    sections: [
      {
        heading: "¿Qué es el interés compuesto?",
        content:
          "El interés simple se calcula siempre sobre el capital original. El interés compuesto se calcula sobre el capital original MÁS los intereses ya acumulados. Esto crea un efecto de 'bola de nieve': mientras más tiempo pasa, más rápido crece el dinero, porque los intereses generan sus propios intereses.",
      },
      {
        heading: "La fórmula del interés compuesto",
        content:
          "La fórmula es: M = C × (1 + r)^t, donde M es el monto final, C es el capital inicial, r es la tasa de rendimiento (en decimal), y t es el tiempo en años. La variable más poderosa de esta fórmula es el exponente 't': el tiempo. Duplicar el tiempo no duplica el resultado, lo eleva exponencialmente.",
        bullets: [
          "Ejemplo 1: $10,000 al 8% anual por 10 años = $21,589",
          "Ejemplo 2: $10,000 al 8% anual por 20 años = $46,610",
          "Ejemplo 3: $10,000 al 8% anual por 30 años = $100,627",
          "El tiempo triplicó pero el resultado se multiplicó casi 5 veces más",
        ],
      },
      {
        heading: "La regla del 72",
        content:
          "Una forma simple de estimar el poder del interés compuesto es la 'Regla del 72': divide 72 entre la tasa de rendimiento anual y obtendrás aproximadamente el número de años necesarios para duplicar tu dinero. Por ejemplo, al 8% anual: 72 ÷ 8 = 9 años para duplicar tu capital.",
        bullets: [
          "Al 4% anual: duplicas en ~18 años",
          "Al 6% anual: duplicas en ~12 años",
          "Al 8% anual: duplicas en ~9 años",
          "Al 12% anual: duplicas en ~6 años",
        ],
      },
      {
        heading: "El impacto devastador de esperar",
        content:
          "Imagina dos personas: Ana empieza a invertir $2,000 pesos mensuales a los 25 años y para a los 35 (10 años, $240,000 invertidos). Carlos empieza a los 35 años y invierte hasta los 65 (30 años, $720,000 invertidos). A una tasa del 8% anual, a los 65 años: Ana tiene más dinero que Carlos, a pesar de haber invertido tres veces menos. Esto es el interés compuesto.",
      },
      {
        heading: "Frecuencia de capitalización",
        content:
          "El interés compuesto puede calcularse de forma anual, semestral, mensual o incluso diaria. Cuanto más frecuente sea la capitalización, mayor el rendimiento efectivo. Un fondo que capitaliza mensualmente crece más que uno que capitaliza anualmente, aunque la tasa nominal sea la misma. Siempre revisa la frecuencia de capitalización al comparar productos financieros.",
      },
      {
        heading: "La inflación: el interés compuesto en tu contra",
        content:
          "El interés compuesto también trabaja en sentido contrario: la inflación erosiona tu poder adquisitivo de forma exponencial. Por eso el ahorro en efectivo pierde valor con el tiempo. Para combatirlo, tu tasa de rendimiento debe superar la inflación. En México, con una inflación promedio del 4-5%, necesitas rendimientos superiores a ese porcentaje para crecer en términos reales.",
      },
    ],
    tips: [
      "Reinvierte todos los rendimientos en vez de retirarlos — ahí está la magia.",
      "Empieza lo más joven posible. Cada año que esperas cuesta caro.",
      "Busca instrumentos con capitalización mensual o diaria sobre los anuales.",
      "Calcula el rendimiento real de tus inversiones restando la inflación.",
      "Usa la regla del 72 para evaluar rápidamente qué tan buena es una tasa de rendimiento.",
    ],
    keyPoints: [
      "El interés compuesto genera rendimientos sobre rendimientos anteriores.",
      "El tiempo es la variable más poderosa en el interés compuesto.",
      "La regla del 72 te ayuda a estimar cuándo duplicarás tu dinero.",
      "Esperar para invertir tiene un costo exponencial, no lineal.",
      "La inflación es el interés compuesto actuando en tu contra.",
    ],
    summary:
      "El interés compuesto es la fuerza más poderosa en las finanzas personales. Su secreto está en el tiempo: mientras más pronto empieces, más trabaja a tu favor. Entender esta mecánica cambia completamente la urgencia de comenzar a invertir. No existe un 'momento perfecto' para empezar — el mejor momento siempre es ahora.",
  },
  {
    id: 4,
    title: "Cómo salir de deudas",
    category: "Deudas",
    level: "Intermedio",
    readTime: "10 min",
    updatedAt: "Marzo 2025",
    description: "Estrategias probadas para eliminar deudas y recuperar tu libertad financiera.",
    intro:
      "Las deudas son el mayor obstáculo para construir riqueza. El interés compuesto —que funciona a tu favor en inversiones— trabaja en tu contra cuando tienes créditos. Una deuda con 36% anual de interés (típico en tarjetas en México) puede duplicarse en solo dos años si no la atacas directamente. Pero hay un camino de salida, y requiere estrategia, no solo buenos deseos.",
    sections: [
      {
        heading: "El primer paso: inventario completo de deudas",
        content:
          "Antes de planear la salida, necesitas saber exactamente a qué te enfrentas. Haz una lista de todas tus deudas con estos datos para cada una:",
        bullets: [
          "Nombre del acreedor (banco, tienda, persona)",
          "Saldo total pendiente",
          "Tasa de interés anual (CAT o tasa efectiva)",
          "Pago mínimo mensual",
          "Fecha de vencimiento o plazo restante",
        ],
      },
      {
        heading: "Método 1: Avalancha de deudas (matemáticamente óptimo)",
        content:
          "Paga el mínimo en todas las deudas, pero destina todo el dinero extra a la deuda con la MAYOR tasa de interés. Cuando la eliminas, aplicas ese dinero a la siguiente más cara. Este método minimiza el total de intereses que pagas y es el más eficiente matemáticamente.",
        bullets: [
          "Ordena tus deudas de mayor a menor tasa de interés",
          "Paga mínimos en todas excepto en la primera",
          "Aplica todo excedente a la deuda más cara",
          "Al eliminarla, suma ese pago a la siguiente deuda",
          "Ahorra más dinero en intereses a largo plazo",
        ],
      },
      {
        heading: "Método 2: Bola de nieve (psicológicamente efectivo)",
        content:
          "Popularizado por Dave Ramsey, este método paga primero la deuda de MENOR saldo, independientemente de la tasa. Las victorias rápidas generan motivación para continuar. Estudios muestran que muchas personas logran más consistencia con este método, aunque paguen más intereses en total.",
        bullets: [
          "Ordena tus deudas de menor a mayor saldo",
          "Paga mínimos en todas excepto en la más pequeña",
          "Ataca con todo el dinero disponible la deuda más pequeña",
          "Al eliminarla, suma ese pago a la siguiente",
          "La motivación de las victorias rápidas mantiene el momentum",
        ],
      },
      {
        heading: "¿Puedes negociar tus deudas?",
        content:
          "Sí. Muchos acreedores prefieren recuperar algo antes que nada. Si estás en mora o a punto de caer en ella, puedes negociar directamente:",
        bullets: [
          "Solicita una reducción de tasa de interés si tienes buen historial",
          "Pide una reestructuración del plazo para reducir el pago mensual",
          "En deudas vencidas, ofrece liquidar con descuento (en muchos casos aceptan 40-60% del saldo)",
          "Evita las 'despachadoras' que cobran comisiones altas por negociar en tu nombre",
          "Documenta todo por escrito antes de pagar",
        ],
      },
      {
        heading: "Fuentes de dinero extra para pagar deudas",
        content:
          "Acelerar el pago de deudas requiere dinero adicional. Busca activamente formas de generarlo:",
        bullets: [
          "Vende objetos que no usas: ropa, electrónicos, muebles",
          "Ofrece servicios extra los fines de semana: clases, reparaciones, delivery",
          "Redirige aguinaldos, bonos y devoluciones de impuestos directamente a las deudas",
          "Reduce gastos temporalmente: elimina suscripciones, reduce entretenimiento",
          "Usa el presupuesto para identificar gastos que puedes cortar sin afectar tu calidad de vida",
        ],
      },
      {
        heading: "Lo que debes evitar mientras pagas deudas",
        content:
          "Cometer estos errores puede hundir tu progreso o empeorar la situación:",
        bullets: [
          "No adquieras nuevas deudas mientras eliminas las existentes",
          "No uses tarjetas de crédito para pagar otras tarjetas (los intereses se acumulan)",
          "No ignores las deudas con acreedores — el silencio solo genera cargos extra",
          "No retires tu ahorro para el retiro (las penalizaciones y consecuencias fiscales son enormes)",
          "No caigas en préstamos de 'día de pago' — sus tasas pueden superar el 1,000% anual",
        ],
      },
    ],
    tips: [
      "Calcula la tasa efectiva anual (CAT) de cada deuda, no solo la tasa nominal. El CAT incluye todos los costos.",
      "Mientras pagas deudas, construye un fondo de emergencia mínimo de $5,000-$10,000 para evitar nuevas deudas.",
      "Automatiza el pago mínimo de todas las deudas para nunca caer en mora.",
      "Si una deuda te genera estrés extremo, el método bola de nieve puede ser mejor para ti, aunque no sea el óptimo matemático.",
      "Celebra cada deuda eliminada — es un logro real que merece reconocerse.",
    ],
    keyPoints: [
      "Primero haz un inventario completo de todas tus deudas con tasas y saldos.",
      "El método avalancha ahorra más dinero; el método bola de nieve más motivación.",
      "Puedes negociar directamente con acreedores para reducir tasas o saldos.",
      "Busca ingresos extra para acelerar el proceso.",
      "No adquieras nuevas deudas mientras pagas las existentes.",
    ],
    summary:
      "Salir de deudas es posible con estrategia y consistencia. El primer paso es conocer exactamente cuánto debes y a qué costo. Luego elige el método que mejor se adapte a tu personalidad, busca dinero extra donde puedas, y ataca las deudas sistemáticamente. Cada deuda eliminada es un paso hacia la libertad financiera.",
  },
  {
    id: 5,
    title: "Fondo de emergencia: por qué y cómo",
    category: "Ahorro",
    level: "Principiante",
    readTime: "4 min",
    updatedAt: "Febrero 2025",
    description: "La importancia de tener un colchón financiero y cómo construirlo.",
    intro:
      "El fondo de emergencia es la base de cualquier plan financiero sólido. Sin él, cualquier evento inesperado —un problema de salud, la pérdida del empleo, una falla del auto— te lleva directo a endeudarte. Con él, estos eventos son inconvenientes, no catástrofes. Es el cambio de mentalidad más importante que puedes hacer con tu dinero.",
    sections: [
      {
        heading: "¿Qué es un fondo de emergencia?",
        content:
          "Es una reserva de dinero líquido (disponible inmediatamente) destinada exclusivamente a cubrir gastos imprevistos o pérdidas de ingreso. No es para vacaciones, no es para aprovechar una oportunidad de inversión, y no es para 'si me sobra'. Es un escudo financiero.",
      },
      {
        heading: "¿Cuánto debes tener?",
        content:
          "La recomendación estándar es acumular entre 3 y 6 meses de tus gastos esenciales. Los gastos esenciales incluyen: renta/hipoteca, servicios, comida básica, transporte al trabajo, y pagos de deudas mínimos.",
        bullets: [
          "Empleo estable, pareja de doble ingreso: 3 meses de gastos",
          "Empleo con menor estabilidad, ingreso único: 4-5 meses",
          "Freelance, trabajo por comisión, sector inestable: 6 meses o más",
          "Si tienes dependientes económicos: considera 6-9 meses",
        ],
      },
      {
        heading: "¿Dónde guardar el fondo de emergencia?",
        content:
          "El fondo de emergencia debe cumplir tres características: seguridad (sin riesgo de pérdida), liquidez (acceso inmediato o en 24-48 horas), y rendimiento moderado (que no pierda contra la inflación idealmente). Las mejores opciones en México son:",
        bullets: [
          "CETES a 28 días (cetesdirecto.mx): seguro, líquido, mejor rendimiento que cuenta de ahorro",
          "Cuenta de ahorro con rendimiento de banco digital (Nu, Hey Banco, BBVA): muy accesible",
          "Fondo de inversión en renta fija a corto plazo: buena opción si inviertes más de $50,000",
          "Evita: depósito a plazo fijo (pierdes intereses si retiras antes), inversiones en acciones (pueden caer exactamente cuando los necesitas)",
        ],
      },
      {
        heading: "Cómo construirlo si partes de cero",
        content:
          "Si actualmente no tienes ningún ahorro, el objetivo inicial debe ser alcanzar $10,000-$15,000 pesos lo antes posible. Esta cantidad te protege de emergencias menores sin paralizarte con una meta lejana.",
        bullets: [
          "Define un monto fijo mensual para el fondo: aunque sean $500 pesos",
          "Automatiza la transferencia el mismo día que recibes tu salario",
          "Guarda el fondo en una cuenta separada a la que no puedas acceder con tu tarjeta cotidiana",
          "Agrega ingresos extraordinarios: aguinaldo, bonos, ventas",
          "Celebra hitos: $5,000 / $10,000 / 1 mes / 3 meses de gastos",
        ],
      },
      {
        heading: "Cuándo usar (y cuándo no usar) el fondo",
        content:
          "Úsalo solo para verdaderas emergencias: pérdida de empleo, emergencia médica no cubierta, reparación urgente del auto o casa que es necesaria para trabajar, o cualquier gasto imprevisto que no puede esperar. Cuando uses parte del fondo, reponlo lo antes posible como prioridad máxima.",
      },
    ],
    tips: [
      "Guarda el fondo en una cuenta diferente a tu cuenta principal para reducir la tentación de usarlo.",
      "Ponle un nombre a la cuenta: 'Emergencias — No tocar'. La nomenclatura ayuda psicológicamente.",
      "Si usas parte del fondo, reconstitúyelo antes de cualquier otro objetivo de ahorro.",
      "El fondo de emergencia no es inversión — su propósito es protección, no rendimiento.",
      "Revisa el monto anualmente: si tus gastos suben, el fondo debe subir también.",
    ],
    keyPoints: [
      "El fondo de emergencia es la base de toda salud financiera.",
      "Debe cubrir entre 3 y 6 meses de gastos esenciales.",
      "Debe estar en un instrumento seguro, líquido y con rendimiento moderado.",
      "Construirlo es el primer objetivo financiero, antes que cualquier inversión.",
      "Úsalo solo para emergencias reales, y reconstitúyelo inmediatamente después.",
    ],
    summary:
      "El fondo de emergencia no es un lujo — es el fundamento de cualquier plan financiero. Tenerlo cambia tu relación con el dinero: pasas de vivir al límite, donde cualquier imprevisto es una crisis, a tener la seguridad de poder enfrentar lo inesperado sin endeudarte. Construirlo debe ser tu primera prioridad financiera.",
  },
  {
    id: 6,
    title: "Diversificación de portafolio",
    category: "Inversión",
    level: "Avanzado",
    readTime: "12 min",
    updatedAt: "Enero 2025",
    description: "Aprende a distribuir tus inversiones para minimizar riesgos.",
    intro:
      "La diversificación es el único 'almuerzo gratis' en la inversión: reduce el riesgo sin necesariamente reducir el rendimiento esperado. El principio es simple — no pongas todos los huevos en la misma canasta — pero su aplicación correcta requiere entender correlaciones, clases de activos, y horizontes de tiempo. Este artículo explica cómo construir un portafolio verdaderamente diversificado.",
    sections: [
      {
        heading: "Por qué diversificar: el riesgo no sistemático",
        content:
          "En inversiones, el riesgo tiene dos componentes: el riesgo sistemático (afecta a todos los mercados, como una crisis económica global) y el riesgo no sistemático (afecta a una empresa o sector específico, como el escándalo de un director o la caída de una industria). La diversificación elimina casi completamente el riesgo no sistemático. El riesgo sistemático es inevitable, pero puede gestionarse con la asignación de activos correcta.",
      },
      {
        heading: "Clases de activos principales",
        content: "Un portafolio diversificado combina activos con diferentes comportamientos:",
        bullets: [
          "Renta variable (acciones): alta volatilidad, alto rendimiento potencial a largo plazo",
          "Renta fija (bonos, CETES): baja volatilidad, rendimientos más predecibles",
          "Bienes raíces (propiedades, FIBRAs): protección contra inflación, ingresos pasivos",
          "Materias primas (oro, plata, petróleo): cobertura en escenarios de crisis",
          "Efectivo y equivalentes: liquidez para aprovechar oportunidades o cubrir emergencias",
        ],
      },
      {
        heading: "Correlación: la clave de la diversificación",
        content:
          "No basta con tener muchos activos diferentes — necesitas activos que no se muevan exactamente igual. La correlación mide cómo se comportan dos activos entre sí: correlación +1 significa que van exactamente en la misma dirección (no sirve para diversificar), correlación -1 significa que van exactamente en dirección contraria (diversificación perfecta), y correlación 0 significa movimientos independientes.",
        bullets: [
          "Acciones de tecnología y acciones de consumo básico: correlación moderada",
          "Acciones y bonos del gobierno: correlación baja o negativa (ideal)",
          "Oro y acciones: correlación negativa en momentos de crisis",
          "Acciones de diferentes países: correlación variable según el mercado",
        ],
      },
      {
        heading: "Diversificación geográfica",
        content:
          "Invertir solo en tu país de origen (home bias) es uno de los errores más comunes. México representa menos del 1% de la capitalización bursátil mundial. Tener exposición a mercados desarrollados (EE.UU., Europa, Japón) y emergentes reduce tu dependencia de un solo sistema económico. ETFs como el VT (Vanguard Total World Stock) dan exposición a más de 9,000 empresas en 50 países con un solo instrumento.",
      },
      {
        heading: "Modelos de asignación de activos",
        content:
          "La asignación correcta depende de tu edad, horizonte de inversión, y tolerancia al riesgo:",
        bullets: [
          "Regla 110 menos edad: si tienes 30 años, 80% en acciones y 20% en bonos",
          "Portafolio 60/40: 60% renta variable, 40% renta fija — el modelo clásico de balance",
          "Portafolio permanente (Harry Browne): 25% acciones, 25% bonos, 25% oro, 25% efectivo",
          "Portafolio de tres fondos: mercado total EE.UU., mercado internacional, bonos",
          "All-weather (Ray Dalio): diseñado para funcionar en cualquier entorno económico",
        ],
      },
      {
        heading: "Rebalanceo: mantener la estrategia",
        content:
          "Con el tiempo, los activos que más suben ocuparán un mayor porcentaje de tu portafolio, alejándote de tu asignación objetivo. El rebalanceo corrige esto periódicamente. La frecuencia recomendada es anual o cuando algún activo se desvía más del 5% de su objetivo. Puede hacerse vendiendo el exceso del activo que subió o comprando más del que bajó.",
      },
    ],
    tips: [
      "No necesitas decenas de activos para diversificar bien — 3 a 5 ETFs bien elegidos pueden darte exposición a miles de empresas.",
      "La diversificación dentro de la misma clase de activo no es verdadera diversificación: 20 acciones de tecnología siguen siendo riesgo concentrado.",
      "Revisa las correlaciones de tus activos en momentos de crisis — algunos activos 'descorrelacionados' en tiempos normales se correlacionan en crisis.",
      "Considera los costos de cada instrumento: la diferencia entre una comisión del 0.05% y el 1.5% puede costar cientos de miles de pesos en 30 años.",
      "La diversificación en tiempo (invertir regularmente) es tan importante como la diversificación en activos.",
    ],
    keyPoints: [
      "La diversificación elimina el riesgo específico de empresas o sectores.",
      "La clave es combinar activos con baja o negativa correlación entre sí.",
      "La diversificación geográfica reduce la dependencia de un solo mercado.",
      "El rebalanceo anual mantiene tu portafolio alineado con tu estrategia.",
      "Pocos ETFs bien elegidos pueden ofrecer más diversificación que muchas acciones individuales.",
    ],
    summary:
      "La diversificación no garantiza ganancias ni elimina todo el riesgo, pero es la herramienta más poderosa para controlar el riesgo que sí está en tus manos. Combina diferentes clases de activos, mercados geográficos, y sectores. Rebalancea anualmente. Mantén los costos bajos. Y recuerda que la consistencia a largo plazo supera cualquier intento de timing perfecto del mercado.",
  },
  {
    id: 7,
    title: "Planificación para la jubilación",
    category: "Ahorro",
    level: "Intermedio",
    readTime: "9 min",
    updatedAt: "Diciembre 2024",
    description: "Empieza a planificar tu retiro desde hoy para asegurar tu futuro.",
    intro:
      "La jubilación parece lejana, pero cada año que no planificas tiene un costo exponencial. En México, la pensión del IMSS o ISSSTE raramente cubre más del 30-40% del último salario. El resto depende completamente de lo que tú hayas acumulado. La buena noticia: empezar ahora, aunque sea con poco, puede marcar la diferencia entre la tranquilidad y la precariedad en tu vejez.",
    sections: [
      {
        heading: "El estado de las pensiones en México",
        content:
          "El sistema de pensiones mexicano fue reformado en 1997 hacia un modelo de contribución definida: tienes una cuenta individual (AFORE) donde se acumulan tus aportaciones y las de tu empleador. Al jubilarte, ese fondo es lo que tienes. A diferencia del sistema anterior (beneficio definido), no hay garantía de un monto específico. Tu pensión depende de cuánto acumulaste y de los rendimientos de tu AFORE.",
        bullets: [
          "Trabajadores IMSS: aportan 6.5% del salario a AFORE (tú 1.125%, empleador 5.15%, gobierno 0.225%)",
          "Aportación voluntaria adicional: puedes depositar más a tu AFORE con deducción fiscal",
          "Al jubilarte: debes tener 1,250 semanas cotizadas (antes 1,000 para algunos casos)",
          "Cifra preocupante: menos del 30% de mexicanos tendrá una pensión suficiente para mantener su nivel de vida",
        ],
      },
      {
        heading: "¿Cuánto necesitas ahorrar para el retiro?",
        content:
          "Una guía usada internacionalmente es la Regla del 4%: la cantidad que puedes retirar anualmente de tu portafolio sin agotarlo en 30 años. Esto significa que necesitas ahorrar 25 veces tus gastos anuales estimados en el retiro.",
        bullets: [
          "Si necesitas $20,000 pesos mensuales al retirarte: $240,000 anuales × 25 = $6,000,000 pesos",
          "Si necesitas $30,000 pesos mensuales: $360,000 anuales × 25 = $9,000,000 pesos",
          "Estos montos parecen imposibles, pero el interés compuesto los hace alcanzables",
          "$3,000 pesos mensuales invertidos al 8% anual durante 30 años = $4,500,000 pesos aproximadamente",
        ],
      },
      {
        heading: "Instrumentos de ahorro para el retiro",
        content: "Además de tu AFORE, existen vehículos diseñados específicamente para el retiro:",
        bullets: [
          "Plan Personal de Retiro (PPR): deducible de impuestos hasta el 10% de tu ingreso anual o 5 UMAs anuales, lo que sea menor",
          "Aportaciones voluntarias a tu AFORE: deducibles fiscalmente, rendimientos históricos del 8-10% nominal",
          "Seguro de retiro: combina protección con ahorro, menor rendimiento pero más estructura",
          "Inversión personal en ETFs de largo plazo: mayor control y potencialmente mayores rendimientos",
          "Bienes raíces para renta: ingreso pasivo en el retiro",
        ],
      },
      {
        heading: "La ventaja fiscal del ahorro para retiro",
        content:
          "En México, las aportaciones a planes de retiro reconocidos (AFORE voluntario, PPR) son deducibles de ISR. Esto significa que si estás en una tasa del 30%, por cada $1,000 que aportas, el gobierno te devuelve efectivamente $300 vía deducción de impuestos. Es un rendimiento garantizado inmediato antes de cualquier rendimiento del fondo.",
      },
      {
        heading: "Estrategia según tu edad",
        content: "La asignación de activos para el retiro debe cambiar conforme te acercas a él:",
        bullets: [
          "20-35 años: 80-90% en renta variable (acciones/ETFs). El tiempo absorbe la volatilidad.",
          "35-50 años: 60-75% en renta variable, 25-40% en renta fija",
          "50-60 años: 40-60% en renta variable, balance en renta fija más conservadora",
          "Cerca del retiro: suficiente renta fija para cubrir 3-5 años de gastos sin tocar acciones",
        ],
      },
      {
        heading: "¿Cómo elegir y revisar tu AFORE?",
        content:
          "Tu AFORE es donde está el dinero obligatorio de tus cotizaciones. Compara entre las diferentes opciones usando el rendimiento neto de los últimos 60 meses y la comisión anual sobre saldo. Incluso una diferencia del 0.3% en comisiones puede significar cientos de miles de pesos menos al jubilarte. Revisa tu AFORE al menos una vez al año en la app de mi AFORE.",
      },
    ],
    tips: [
      "Si tu empresa ofrece un fondo de retiro con aportación equivalente (matching), aprovéchalo al máximo — es dinero gratis.",
      "Aumenta tus aportaciones al retiro un 1% cada año o cada vez que tengas un aumento de salario.",
      "Antes de jubilarte, simula tus gastos mensuales durante el retiro. Muchas personas sobreestiman cuánto gastarán.",
      "El retiro anticipado es posible con suficiente ahorro acumulado — busca el concepto de FIRE (Financial Independence, Retire Early).",
      "Considera el costo de atención médica en tu planeación: suele ser el mayor gasto en la vejez.",
    ],
    keyPoints: [
      "La pensión del IMSS generalmente no cubre más del 30-40% del último salario.",
      "Necesitas ahorrar aproximadamente 25 veces tus gastos anuales del retiro.",
      "Las aportaciones a PPR y AFORE tienen ventajas fiscales significativas.",
      "A mayor distancia del retiro, mayor proporción en renta variable.",
      "Revisar y comparar tu AFORE anualmente puede hacer una diferencia enorme.",
    ],
    summary:
      "La jubilación es el objetivo financiero más largo y más costoso de tu vida. Pero también es el que más tiempo tienes para prepararte. Empieza hoy: revisa tu AFORE, considera abrir un PPR para aprovechar deducciones fiscales, e invierte la diferencia entre lo que necesitarás y lo que el sistema público te dará. Tu 'yo' futuro te lo agradecerá.",
  },
  {
    id: 8,
    title: "Tarjetas de crédito: aliadas o enemigas",
    category: "Deudas",
    level: "Principiante",
    readTime: "7 min",
    updatedAt: "Noviembre 2024",
    description: "Cómo usar las tarjetas de crédito de forma inteligente sin endeudarte.",
    intro:
      "Las tarjetas de crédito son una de las herramientas financieras más poderosas y más peligrosas que existen. Usadas correctamente, te dan beneficios reales: puntos, millas, seguros de compra, historial crediticio, y liquidez temporal. Usadas incorrectamente, pueden atraparte en un ciclo de deuda con intereses del 30-60% anual. La diferencia está completamente en cómo las usas.",
    sections: [
      {
        heading: "Cómo funciona una tarjeta de crédito",
        content:
          "El banco te presta dinero hasta tu límite de crédito. Tienes un período de gracia (generalmente 20-25 días) para pagar sin intereses. Si pagas el total del estado de cuenta antes de la fecha límite, no pagas ningún interés — usas dinero del banco gratis por semanas. Si no pagas el total, el banco cobra intereses sobre el saldo restante desde el primer día de compra.",
      },
      {
        heading: "El costo real de pagar solo el mínimo",
        content:
          "El pago mínimo está diseñado para maximizar los intereses que pagas. Funciona así:",
        bullets: [
          "Deuda de $10,000 pesos al 36% anual (3% mensual)",
          "Pago mínimo típico: 1.5% del saldo = $150 pesos",
          "Con solo el mínimo: tardas más de 25 años en pagar y pagas más de $45,000 pesos en intereses",
          "Si pagas $500 pesos mensuales: pagas en 24 meses y en intereses aproximadamente $2,000 pesos",
          "La diferencia: $43,000 pesos solo por el monto del pago mensual",
        ],
      },
      {
        heading: "El CAT: el número que realmente importa",
        content:
          "El Costo Anual Total (CAT) incluye la tasa de interés nominal más todas las comisiones (anualidad, comisión por disposición, seguros). Es el número real que debes comparar al elegir una tarjeta. En México, el CAT de las tarjetas varía del 20% al 90% dependiendo del banco y el tipo de tarjeta. Busca siempre el CAT más bajo en el comparador de la CONDUSEF.",
      },
      {
        heading: "Estrategias para usar tarjetas sin endeudarte",
        content: "Las personas que dominan las tarjetas de crédito siguen estas reglas:",
        bullets: [
          "Regla de oro: nunca gastes con tarjeta lo que no tienes en tu cuenta de banco",
          "Paga el total del estado de cuenta cada mes, nunca solo el mínimo",
          "Configura el pago automático del total para evitar olvidos",
          "Usa la tarjeta como método de pago, no como extensión de tu salario",
          "Mantén la utilización de crédito por debajo del 30% de tu límite total",
        ],
      },
      {
        heading: "Beneficios reales de las tarjetas (cuando las usas bien)",
        content:
          "Usadas correctamente, las tarjetas ofrecen beneficios que el efectivo no puede darte:",
        bullets: [
          "Puntos, millas o cashback: según el programa, puedes recuperar del 1% al 5% en compras",
          "Seguro de compra: protección contra robo o daño en compras recientes",
          "Seguro de viaje: algunas tarjetas premium incluyen seguro médico y de cancelación",
          "Historial crediticio: el uso responsable mejora tu score para futuras solicitudes de crédito",
          "Protección contra fraude: es más fácil disputar cargos no reconocidos que recuperar efectivo robado",
        ],
      },
      {
        heading: "¿Cuándo NO debes usar una tarjeta de crédito?",
        content:
          "Hay situaciones donde el crédito es definitivamente contraproducente:",
        bullets: [
          "Cuando no puedes pagar el total al final del mes",
          "Para pagar otras deudas (encarece el costo del dinero)",
          "En casinos o juegos de azar",
          "Para compras impulsivas que no estaban en tu presupuesto",
          "Cuando ya tienes saldo revolving (deuda de un mes anterior) sin pagar",
        ],
      },
    ],
    tips: [
      "Revisa tu estado de cuenta semana a semana, no solo al final del mes.",
      "Activa las notificaciones de cada cargo para detectar fraudes de inmediato.",
      "Cancela las tarjetas de tiendas departamentales primero — suelen tener las tasas más altas.",
      "Si tu tarjeta cobra anualidad alta pero no usas sus beneficios, solicita la cancelación o el cambio a una sin anualidad.",
      "Una sola tarjeta bien manejada es mejor que cinco tarjetas mal administradas.",
    ],
    keyPoints: [
      "Pagar el total del estado de cuenta mensualmente elimina completamente los intereses.",
      "El pago mínimo está diseñado para maximizar cuánto pagas al banco.",
      "Compara tarjetas por el CAT, no por la tasa nominal anunciada.",
      "Una tarjeta es una herramienta de pago, no de financiamiento.",
      "Usada bien, una tarjeta da beneficios reales sin ningún costo.",
    ],
    summary:
      "Las tarjetas de crédito no son ni buenas ni malas — son herramientas. En manos de alguien que paga el total cada mes, son fuente de beneficios gratuitos. En manos de alguien que paga el mínimo, son uno de los productos financieros más costosos del mercado. La decisión de qué serán para ti depende únicamente de tu disciplina de pago.",
  },
  {
    id: 9,
    title: "ETFs vs fondos mutuos",
    category: "Inversión",
    level: "Avanzado",
    readTime: "11 min",
    updatedAt: "Octubre 2024",
    description: "Comparativa entre las dos formas más populares de inversión pasiva.",
    intro:
      "ETFs y fondos mutuos compiten por ser el vehículo de inversión preferido de millones de personas. Ambos ofrecen diversificación con una sola inversión, pero tienen diferencias importantes en costos, flexibilidad, fiscalidad y mecánica. Entender estas diferencias te ayudará a elegir el instrumento más adecuado para tu estrategia.",
    sections: [
      {
        heading: "¿Qué son los fondos mutuos?",
        content:
          "Un fondo mutuo agrupa el dinero de múltiples inversionistas para comprar una cartera de activos administrada por profesionales. Puedes comprar participaciones directamente con la gestora (no en bolsa) al precio de cierre del día (NAV - Net Asset Value). Existen fondos activos (donde un gestor selecciona activos buscando superar al mercado) y fondos índice pasivos (que replican un índice sin gestión activa).",
      },
      {
        heading: "¿Qué son los ETFs (Exchange Traded Funds)?",
        content:
          "Un ETF es un fondo que cotiza en bolsa como si fuera una acción. Puedes comprar y vender durante el horario de mercado al precio en tiempo real. La inmensa mayoría de los ETFs son fondos índice pasivos — replican automáticamente un índice como el S&P 500, sin que un gestor tome decisiones de qué comprar o vender. Su diseño los hace inherentemente más baratos.",
      },
      {
        heading: "Diferencias clave: costos",
        content:
          "La diferencia de costos es la razón principal por la que los ETFs han ganado popularidad masiva en los últimos 15 años:",
        bullets: [
          "ETFs pasivos: expense ratio del 0.03% al 0.20% anual (ej: VTI de Vanguard cobra 0.03%)",
          "Fondos mutuos activos: expense ratio del 0.50% al 2.5% anual",
          "Fondos mutuos índice (pasivos): 0.05% al 0.5% anual",
          "Diferencia acumulada: $100,000 pesos al 0.05% vs 1.5% durante 30 años = diferencia de más de $200,000 pesos solo en comisiones",
          "Comisión de bróker por comprar ETFs: varía según plataforma, muchas ya ofrecen $0",
        ],
      },
      {
        heading: "Diferencias clave: operación y liquidez",
        content: "La mecánica operativa de cada instrumento es distinta:",
        bullets: [
          "ETFs: se compran y venden en tiempo real durante el horario bursátil, precio fluctúa durante el día",
          "Fondos mutuos: se compran y venden al precio de cierre del día, sin cotización intradía",
          "ETFs: requieren una cuenta de bróker (GBM+, Kuspit, Interactive Brokers, etc.)",
          "Fondos mutuos: puedes comprarlos directamente con la gestora (BBVA, Banorte, Fondo México, etc.)",
          "Inversión mínima: ETFs generalmente desde el precio de una acción; fondos mutuos pueden requerir montos mínimos más altos",
        ],
      },
      {
        heading: "Diferencias clave: eficiencia fiscal",
        content:
          "En México, los rendimientos de ambos instrumentos tributan de forma similar para personas físicas. Sin embargo, los ETFs tienen una ventaja estructural importante: en su mecanismo de creación/redención de participaciones, los ETFs raramente distribuyen ganancias de capital, mientras los fondos activos frecuentemente realizan ventas internas que generan eventos fiscales. Esto puede significar pagar más impuestos con fondos activos incluso si tu inversión personal no ha crecido.",
      },
      {
        heading: "¿Cuándo tiene sentido un fondo activo?",
        content:
          "La gestión activa busca superar al mercado. El problema: la evidencia muestra que más del 80-90% de los fondos activos no superan a su índice de referencia después de comisiones en períodos de 10-15 años. Sin embargo, puede tener sentido en:",
        bullets: [
          "Mercados menos eficientes: empresas pequeñas, mercados emergentes, bonos de alta rentabilidad",
          "Estrategias alternativas no disponibles en ETFs pasivos",
          "Cuando el gestor tiene un historial demostrado de superar al mercado por más de 10 años (son raros)",
          "Para inversionistas que prefieren delegar completamente la toma de decisiones",
        ],
      },
      {
        heading: "Recomendación práctica: portafolio con ETFs",
        content:
          "Para la mayoría de los inversionistas individuales, un portafolio de 2-4 ETFs de bajo costo es superior a cualquier selección de fondos activos. Una combinación simple pero poderosa:",
        bullets: [
          "VTI (Mercado total EE.UU.) o IVV (S&P 500): exposición a las mayores empresas del mundo",
          "VXUS (Mercado internacional): Europa, Asia, mercados emergentes",
          "BND o AGG (Bonos del gobierno EE.UU.): estabilidad y descorrelación",
          "Ajusta los porcentajes según tu edad y tolerancia al riesgo",
          "Rebalancea anualmente y no toques más nada",
        ],
      },
    ],
    tips: [
      "Compara siempre el expense ratio antes de invertir. La diferencia del 1% al año se vuelve enorme en décadas.",
      "Los ETFs de Vanguard, iShares (BlackRock) y Schwab son líderes mundiales en bajo costo y confiabilidad.",
      "Revisa en México las opciones de GBM+, Kuspit, o Interactive Brokers para acceder a ETFs internacionales.",
      "Prefiere ETFs de acumulación (reinvierten dividendos automáticamente) si no necesitas el ingreso periódico.",
      "Evita ETFs inversos o apalancados para inversión a largo plazo — son herramientas de trading, no de construcción de riqueza.",
    ],
    keyPoints: [
      "Los ETFs pasivos tienen costos significativamente menores que los fondos activos.",
      "Los ETFs cotizan en tiempo real; los fondos mutuos al precio de cierre del día.",
      "Más del 80% de los fondos activos no superan a su índice de referencia a largo plazo.",
      "Un portafolio de 2-4 ETFs de bajo costo es suficiente para la mayoría de inversionistas.",
      "La diferencia en comisiones se acumula exponencialmente con el tiempo.",
    ],
    summary:
      "Para el inversionista individual con visión de largo plazo, los ETFs pasivos de bajo costo ganan la comparativa en prácticamente todas las dimensiones: menores costos, mayor eficiencia fiscal, mayor transparencia, y rendimientos que históricamente superan a la mayoría de los fondos activos. La excepción podría ser mercados menos eficientes o estrategias especializadas. Pero para construir riqueza sólida a lo largo del tiempo, pocos ETFs bien elegidos, comprados regularmente, y dejados en paz, son la estrategia ganadora.",
  },
];

export function getArticle(id: number): Article | undefined {
  return articles.find((a) => a.id === id);
}
