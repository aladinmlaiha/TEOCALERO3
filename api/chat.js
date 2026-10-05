// Serverless Function handler para Vercel / Netlify / Node Functions
const SYSTEM_PROMPT = `
Eres el Asistente Virtual y Asesor Barbero de "Peluquería Teo Calero", una prestigiosa barbería tradicional de caballeros situada en Huelva (España), con más de 23 años de oficio y valoración 5,0 estrellas en Google.

TU IDENTIDAD Y TONO:
- Eres un barbero experto, cercano, profesional, masculino, educado y con un trato natural y de confianza.
- Habla con soltura y calidez ("Buenas tardes, caballero", "Cuenta con ello", "En el salón siempre aconsejamos...", "Te explico con detalle").
- Evita sonar como un robot frío o excesivamente técnico. Da consejos prácticos y fundamentados en el visagismo y la salud capilar y de la barba.

CONOCIMIENTOS DE BARBERÍA Y ESTILISMO:
1. Visagismo y Tipos de Rostro:
   - Cara alargada / rectangular: Evitar tupés o pompadours excesivamente altos que alarguen más la cara. Recomendado degradado bajo o medio (low/mid fade) no muy rapado arriba, o corte a tijera con volumen lateral y flequillo sutil o caída hacia un lado para armonizar las facciones.
   - Cara redonda / cuadrada: Fades medios y altos para estilizar y afinar laterales; tupés, quiff o volumen superior para dar altura visual. Mandíbula y contornos bien perfilados a navaja.
   - Entradas o cabello fino: Corte French Crop texturizado hacia delante, corte estilo César o peinado lateral suave con pomada mate. Un degradado limpio en los laterales resta contraste a las entradas.
   - Cabello rizado: Se puede hacer degradado perfectamente (mid fade o taper fade). Se trabaja la parte superior a tijera respetando la definición natural del rizo y aplicando crema de peinado o pomada ligera para evitar encrespamiento.
   - Cabello largo masculino: Mantenimiento de puntas, capeado para dar movimiento, limpieza de nuca y contornos.

2. Degradados (Fades) y Tiempos:
   - Low Fade (Bajo): Nace justo sobre la oreja y nuca baja; discreto, elegante y clásico.
   - Mid Fade (Medio): A la altura de la sien; el más versátil, equilibrado y popular.
   - High Fade (Alto): Sube hasta la parte alta; marcado, fresco, moderno y con gran contraste.
   - Taper Fade: Degradado limpio únicamente en patillas y nuca baja, manteniendo densidad en laterales.
   - Duración de un fade: Luce perfecto 10-15 días. Para llevarlo siempre niquelado se recomienda retocar cada 2-3 semanas. Los cortes clásicos a tijera aguantan 3-5 semanas.

3. Cuidado y Mantenimiento de la Barba:
   - Lavado: Usar champú específico para barba 2-3 veces por semana (el champú normal reseca la piel de la cara).
   - Hidratación y suavidad: Aplicar 3-5 gotas de aceite de barba a diario masajeando la piel y el pelo.
   - Peinado: Cepillar con cepillo de cerdas naturales de jabalí para distribuir los aceites y disciplinar el vello.
   - Fijación y forma: Usar bálsamo para barbas medianas/largas.
   - Mantenimiento: Recorte y perfilado a navaja en la barbería cada 2-3 semanas.

4. Productos Recomendados:
   - Ceras/pomadas mate base agua (efecto natural sin brillo ni residuo graso).
   - Polvos de volumen (volumizing powder) para textura y fijación flexible sin apelmazar.
   - Aceite nutritivo y tónico aftershave para calmar la piel tras la navaja.

INFORMACIÓN DEL SALÓN (PELUQUERÍA TEO CALERO):
- Ubicación: Av. de la Raza, 21, Local 7, 21002 Huelva (zona de fácil aparcamiento).
- Teléfono fijo: 959 79 06 60.
- Móvil / WhatsApp de citas: 641 72 94 54 (Enlace: https://wa.me/34641729454).
- Horario: Lunes a Viernes, cierre a las 17:30 h.
- Servicios y duraciones orientativas:
  * Corte Clásico de Caballero (~30 min): a tijera/máquina, contornos a navaja, colonia y peinado.
  * Degradado / Fade Moderno (~35 min): low, mid o high fade con máxima precisión.
  * Arreglo de Barba & Afeitado (~25 min): perfilado a navaja desechable, recorte simétrico, hidratación y bálsamo.
  * Pack Completo Corte + Barba (~50 min): sesión integral de cuidado masculino.
- Citas: Se atiende con y sin cita previa (se aconseja cita previa para asegurar el hueco sin esperas).

NORMAS DE RESPUESTA:
- Responde siempre en español.
- Mantén las respuestas amenas, directas y claras (entre 2 y 4 párrafos o con listas con viñetas cuando sea apropiado).
- Cuando el usuario pregunte por reservas, disponibilidad o dudas que requieran gestión humana directa, anímale amablemente a pedir cita por WhatsApp (641 72 94 54) o llamar al 959 79 06 60.
`;

function getSmartFallbackResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('cara alargada') || msg.includes('rostro alargado') || msg.includes('alargada')) {
    return `Para un rostro alargado, lo ideal es buscar un corte que aporte **armonía y equilibrio**, evitando dar excesiva altura visual.

✂️ **Mis recomendaciones de barbero:**
1. **Tipo de degradado:** Opta por un **Low Fade (degradado bajo)** o un degradado medio suave. Evita rapados muy altos al cero que acentúen la verticalidad.
2. **Volumen superior:** Te favorece mucho un peinado texturizado hacia adelante (**French Crop**), peinado de lado con caída natural o raya clásica sin demasiado tupé.
3. **Barba:** Si llevas barba, dejarla algo más densa en laterales y perfilada en el mentón ensancha el tercio inferior del rostro.

¿Quieres que te preparemos un corte a medida en el salón? Puedes pedir cita directa por **WhatsApp al 641 72 94 54** o llamarnos al **959 79 06 60**.`;
  }

  if (msg.includes('diferencia') && (msg.includes('fade') || msg.includes('degradado'))) {
    return `¡Buena pregunta! La diferencia principal entre un fade bajo, medio y alto está en **la altura donde comienza la transición del rapado**:

💈 **1. Low Fade (Degradado Bajo):** Comienza sobre la oreja y nuca baja; discreto, elegante y perfecto para el día a día.
💈 **2. Mid Fade (Degradado Medio):** La transición se sitúa a la altura de la sien; es el más equilibrado y popular.
💈 **3. High Fade (Degradado Alto):** Sube hasta la parte alta, dando máximo contraste y frescura.

En **Peluquería Teo Calero** los pulimos a navaja con la máxima precisión.`;
  }

  if (msg.includes('cita') || msg.includes('reservar') || msg.includes('pedir cita') || msg.includes('horario') || msg.includes('donde') || msg.includes('dirección')) {
    return `¡Por supuesto! Para pedir cita o consultar disponibilidad en **Peluquería Teo Calero**:

📍 **Ubicación:** Av. de la Raza, 21, Local 7, Huelva.
🕒 **Horario:** Lunes a Viernes (cierre a las 17:30 h).
📱 **WhatsApp de citas:** [641 72 94 54](https://wa.me/34641729454)
📞 **Teléfono fijo:** 959 79 06 60

Te recomendamos escribirnos por WhatsApp o llamarnos para reservar tu hueco sin esperas.`;
  }

  if (msg.includes('barba') || msg.includes('suave') || msg.includes('pica')) {
    return `Para mantener una barba suave, limpia y sin picores:

1. **Champú específico:** Lávala 2-3 veces por semana con champú para barba.
2. **Aceite hidratante diario:** Aplica 3-4 gotas de aceite para ablandar el vello y cuidar la piel.
3. **Cepillado diario:** Usa cepillo de cerdas de jabalí para desenredar y dar forma.
4. **Perfilado profesional:** Pásate cada 2-3 semanas por el salón para recortar y marcar contornos a navaja.`;
  }

  return `¡Hola! Como asesor barbero de **Peluquería Teo Calero** en Huelva, estoy aquí para aconsejarte sobre el corte que mejor se adapta a tu rostro, el cuidado de tu barba o los productos ideales para tu cabello.

¿Qué estilo o duda te gustaría consultar hoy? También puedes pedir cita directamente por **WhatsApp al 641 72 94 54** o llamarnos al **959 79 06 60**.`;
}

module.exports = async (req, res) => {
  // Configuración de cabeceras CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
  }

  try {
    const { message, history } = req.body || {};
    const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
    const GEMINI_MODEL = (process.env.GEMINI_MODEL || 'gemini-1.5-flash').trim();

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
    }

    const cleanMessage = message.trim().slice(0, 500);

    if (!GEMINI_API_KEY) {
      return res.json({
        reply: getSmartFallbackResponse(cleanMessage)
      });
    }

    // Construir historial asegurando alternancia estricta de roles para la API de Gemini
    const rawHistory = Array.isArray(history) ? history : [];
    const contents = [];

    for (const h of rawHistory) {
      if (!h || typeof h.text !== 'string' || !h.text.trim()) continue;
      
      const text = h.text.trim();
      // Si coincide con el mensaje actual, lo omitimos para añadirlo como último turno
      if (h.sender === 'user' && text === cleanMessage) continue;

      const role = h.sender === 'user' ? 'user' : 'model';

      // Gemini exige que una conversación multiturno empiece con rol 'user'
      if (contents.length === 0 && role === 'model') {
        continue;
      }

      // Evitar dos turnos consecutivos con el mismo rol
      const lastRole = contents.length > 0 ? contents[contents.length - 1].role : null;
      if (role !== lastRole) {
        contents.push({
          role,
          parts: [{ text: text.slice(0, 1000) }]
        });
      }
    }

    // Asegurar que el último turno sea el mensaje actual del usuario
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1] = {
        role: 'user',
        parts: [{ text: cleanMessage }]
      };
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: cleanMessage }]
      });
    }

    let candidateText = '';
    const modelsToTry = [GEMINI_MODEL, 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro'].filter((v, i, a) => a.indexOf(v) === i);

    for (const model of modelsToTry) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        
        const requestPayload = {
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents,
          generationConfig: {
            temperature: 0.65,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 600
          }
        };

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload)
        });

        const data = await response.json();
        
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          candidateText = data.candidates[0].content.parts[0].text;
          break;
        } else if (data?.error) {
          console.error(`Error con modelo ${model}:`, data.error);
        }
      } catch (err) {
        console.error(`Fallo llamando a ${model}:`, err);
      }
    }

    if (!candidateText) {
      return res.json({
        reply: getSmartFallbackResponse(cleanMessage)
      });
    }

    return res.json({ reply: candidateText });
  } catch (error) {
    console.error('Error en handler:', error);
    return res.json({
      reply: `Buenas tardes. Puedes consultarnos cualquier duda sobre tu corte o pedir cita por WhatsApp al **641 72 94 54** o llamando al **959 79 06 60**.`
    });
  }
};
