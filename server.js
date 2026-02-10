const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Document, Packer, Paragraph } = require('docx');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generar', async (req, res) => {
    const data = req.body;

    const doc = new Document({
        creator: "Inmobiliaria Demo",
        title: "Contrato de Locación",
        description: "Contrato generado automáticamente",

        styles: {
            paragraphStyles: [
                {
                    id: "TituloNegrita",
                    name: "Título Negrita",
                    basedOn: "Heading1",
                    next: "Normal",
                    run: {
                        bold: true,
                        color: "000000", // opcional: negro
                        size: 25         // opcional: tamaño similar a Heading1
                    }
                }
            ]
        },

        sections: [
            {
                children: [
                    new Paragraph({
                        text: "CONTRATO DE LOCACIÓN CON CLÁUSULA DE VENTA",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),

                    new Paragraph(
                        `Entre la Señora ${data.nombre_locador}, de nacionalidad ${data.nacionalidad_locador}, quien acredita su identidad con DNI N° ${data.dni_locador}, CUIL N° ${data.cuil_locador}, con domicilio en la calle ${data.direccion_locador}, de la localidad de ${data.localidad_locador}, Provincia de ${data.provincia_locador}, quien en adelante será denominado "LOCADOR", por una parte;`
                    ),
                    new Paragraph(
                        `Y por la otra el Señor ${data.nombre_inquilino}, de nacionalidad ${data.nacionalidad_inquilino}, quien acredita su identidad con DNI N° ${data.dni_inquilino}, CUIL N° ${data.cuil_inquilino}, domiciliado en la calle ${data.direccion_inquilino}, de la ciudad de ${data.ciudad_inquilino}, Provincia de ${data.provincia_inquilino}, quien en adelante será denominado "LOCATARIO", y juntamente con el LOCADOR se denominarán "LAS PARTES", celebran el presente Contrato de Locación con Cláusula de Venta, en adelante denominado CONTRATO, sujeto al Código Civil y Comercial, Leyes vigentes, Decreto de Necesidad y Urgencia (DNU) N° 70/2.023, y a las declaraciones y cláusulas siguientes:`
                    ),
                    new Paragraph(" "),
                    new Paragraph({
                        text: "PRIMERA - LOCACIÓN:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(
                        `El LOCADOR da en locación al LOCATARIO un inmueble de su propiedad, ubicado en la calle ${data.direccion_inmueble} de la ciudad de ${data.ciudad_inmueble}, provincia de ${data.provincia_inmueble}, en adelante denominada "UNIDAD LOCADA", compuesta de la siguiente forma: ${data.descripcion_inmueble}.`
                    ),
                    new Paragraph(
                        `El LOCATARIO declara haber visitado y examinado el inmueble que alquilará, manifestando que el mismo se encuentra en muy buen estado de conservación y aseo, recientemente pintado con pintura marca "${data.marca_pintura}" y con mano de obra profesional.`
                    ),
                    new Paragraph(
                        `El destino declarado de la UNIDAD LOCADA es ${data.uso_inmueble}. Denuncia el LOCATARIO como único conviviente a su grupo familiar compuesto por ${data.cantidad_personas} personas.`
                    ),
                    new Paragraph(" "),
                    new Paragraph({
                        text: "SEGUNDA - VIGENCIA:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(
                        `El plazo total e improrrogable del CONTRATO será de ${data.plazo_escrito} (${data.plazo_numerico}) años a partir del día ${data.fecha_inicio}, por lo que su vencimiento se operará de pleno derecho e indefectiblemente el día ${data.fecha_fin} a las 00.00 hs, fecha y hora en que el LOCATARIO se obliga a restituir la UNIDAD LOCADA totalmente desocupada y libre de ocupantes, sin necesita de interpelación alguna, y en el mismo estado de uso y conservación que fue entregada, caso contrario como cláusula penal, conforme artículo 790 y 88, del Código Civil y Comercial de la Nación, el LOCATARIO deberá pagar al LOCADOR la suma equivalente al TREINTA POR CIENTO (30%) calculado sobre el valor del alquiler vigente por día exigible por adelantado hasta la devolución de La UNIDAD LOCADA, pactándose para su cobro el procedimiento judicial ejecutivo, La Cláusula Penal (Artículo 790 y ss. Del Código Civil y Comercial de la Nación) por no restitución de la UNIDAD LOCADA; es independiente de la obligación de pagar el alquiler y del derecho de accionar que tendrá el LOCADOR, singular o pluralmente por incumplimientos del LOCATARIO, sean por mora en el pago de alquileres, tributos, tasas, servicios, etc.`
                    ),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "TERCERA - PRECIO:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Las partes acuerdan que realizarán aumentos ${data.tipo_actualizacion} al valor locativo, utilizando el Índice de Precios al Consumidor (IPC) publicado por el Instituto Nacional de Estadísticas y Censos (INDEC); El precio del alquiler mensual será de ${data.precio_escrito}($${data.precio_numerico}.-) durante los primeros ${data.tiempo_precio_escrito} (${data.tiempo_precio_numerico}) meses del contrato, desde el ${data.fecha_inicio}  hasta el ${data.fecha_final_1er_precio}. A partir del ${data.fecha_final_1er_precio} el alquiler mensual se actualizará ${data.tipo_actualizacion} utilizando el Índice de Precios al Consumidor (IPC) publicado por el Instituto Nacional de Estadísticas y Censos (INDEC) tal cual lo acordado en la presente cláusula. El LOCADOR realizará el cálculo indexatorio con una anticipación de DIEZ (10) días al vencimiento del primer mes de cada aumento nuevo, tomando al efecto el último índice mensual (IPC) publicado por el INDEC correspondiente al mes anterior en que deba aplicarse el incremento cuatrimestral. El LOCADOR informará el nuevo valor del alquiler al LOCATARIO por vía electrónica, al menos diez (10) días antes que venza el alquiler del mes. Si a la fecha de vencimiento del pago mensual estipulada no se hubiese efectuado aún la publicación respectiva, el LOCATARIO ingresará el monto que venía abonando durante los meses anteriores en modo mensual y con carácter provisorio, debiendo integrar la diferencia que surja de la aplicación de dicho índice dentro de las cuarenta y ocho (48) horas hábiles posteriores contadas desde la fecha que resulte publicado el mismo. A su vez, junto al pago del alquiler, el LOCATARIO abonará los gastos y servicios administrativos inmobiliarios mensuales equivalentes al dos por ciento (2%) calculados sobre el alquiler vigente. Si correspondiera tributar el Impuesto al Valor agregado (IVA) será siempre a cargo del LOCATARIO.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "CUARTA - FORMA DE PAGO:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`El canon locativo mensual será abonado por EL LOCATARIO por mes adelantado, dentro del plazo comprendido entre el día primero (1°) y el día diez (10) de cada mes, conforme la modalidad de pago convenida con EL LOCADOR.`),

                    new Paragraph(`Toda modificación respecto del domicilio o modalidad de pago deberá ser notificada por escrito y contar con el acuerdo expreso de ambas partes.`),

                    new Paragraph(`En el presente contrato se establece que el pago del alquiler será efectuado mediante transferencia bancaria a favor de EL LOCADOR, a la siguiente cuenta:`),

                    new Paragraph(" "),

                    new Paragraph(`Tipo de cuenta: ${data.tipoCuentaBancaria_locador}`),
                    new Paragraph(`N° de cuenta: ${data.numeroCuentaBancaria_locador}`),
                    new Paragraph(`Banco: ${data.Banco_locador}`),
                    new Paragraph(`Titular: ${data.nombre_locador}`),
                    new Paragraph(`CUIT: ${data.cuil_locador}`),
                    new Paragraph(`CBU: ${data.cbu_locador}`),
                    new Paragraph(`Alias: ${data.alias_locador}`),

                    new Paragraph(" "),

                    new Paragraph(`EL LOCATARIO deberá informar cada transferencia realizada a los siguientes correos electrónicos:`),

                    new Paragraph(" "),

                    new Paragraph(`${data.mail_locador}`),

                    new Paragraph(`ushuaiarentaltdf@gmail.com`),

                    new Paragraph(`EL LOCADOR faculta expresamente a Sur Gestiones a extender los recibos correspondientes por cuenta y orden del mismo.`),

                    new Paragraph(`Asimismo, EL LOCADOR, por sí o a través de la administradora designada, podrá inspeccionar la UNIDAD LOCADA, previa comunicación al LOCATARIO con una antelación mínima de cuarenta y ocho (48) horas, a los fines de verificar el estado de conservación del inmueble o realizar cualquier acto necesario vinculado al control, mantenimiento o cumplimiento del presente contrato.`),

                    new Paragraph(`El precio de la locación se pacta por mes completo, no encontrándose EL LOCADOR obligado a recibir pagos proporcionales ni a efectuar devoluciones por fracciones de mes no utilizadas. En consecuencia, aun cuando EL LOCATARIO desocupara la unidad con anterioridad a la finalización del período mensual, deberá abonar íntegramente el alquiler correspondiente.`),

                    new Paragraph(`Si el último día de pago resultare inhábil o feriado, el mismo deberá efectuarse el día hábil inmediato posterior, devengándose intereses por mora en caso de incumplimiento conforme lo pactado en el presente contrato.`),


                    new Paragraph(" "),
                    new Paragraph({
                        text: "QUINTA - MORA:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`En caso de mora en el pago de los alquileres o demás obligaciones dinerarias del LOCATARIO, éste pagará al LOCADOR un interés resarcitorio por el monto debido cobrándose intereses por mora diaria a partir del primer día del mes impago; a los efectos del cálculo de los intereses correspondientes, se aplicará un interés punitorio diario del cero punto cinco por ciento (0,5%) sobre el valor del alquiler mensual. Si la mora supera los sesenta (60) días, se podrá pedir al LOCATARIO el desalojo inmediato de la UNIDAD LOCADA, conforme lo determina el Artículo 1.219 y 1.222 del Código Civil y Comercial de la Nación, quedando rescindido el presente contrato de pleno derecho y facultado el LOCADOR para ejercer todos los derechos y acciones que la ley o este contrato le confieran, particularmente para considerar unilateralmente rescindido el presente contrato mediante simple comunicación en tal sentido y exigir el inmediato desalojo y restitución de la UNIDAD LOCADA. Los gastos correspondientes que ocasione la demanda judicial serán soportados en su totalidad por el LOCATARIO y deberá pagar los daños y perjuicios ocasionados desde la mora en el cumplimiento de las obligaciones, y no desde la notificación de la demanda.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "SEXTA - RESTITUCIÓN:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`EL LOCATARIO asume la obligación de restituir la UNIDAD LOCADA en el mismo estado en que la recibió conforme a lo estipulado en la CLÁUSULA- PRIMERA del presente contrato, ya sea por finalización del contrato, o por rescisión anticipada, con más las mejoras edilicias realizadas durante la locación, salvo los deterioros sufridos por el buen uso y transcurso del tiempo, en caso contrario deberá responder por los daños y perjuicios originados por su actuar. Se conviene entre las partes que al momento de la restitución de la UNIDAD LOCADA el LOCATARIO deberá abonar al LOCADOR los materiales necesarios para realizar la pintura total de la vivienda (pintura de primera calidad marca ${data.marca_pintura}), como así también la mano de obra profesional, para esto las partes acuerdan en solicitar tres (3) presupuestos de pintores profesionales promediando los mismos, en el caso que el LOCATARIO no cumpla con lo acordado deberá pagar una Cláusula Penal diaria equivalente al TREINTA POR CIENTO (30%) calculado sobre el alquiler vigente (Artículo 790 y ss., Código Civil y Comercial de la Nación) en forma diaria hasta la devolución de la UNIDAD LOCADA en las condiciones pactadas. También deberá presentar las correspondientes libres deudas de los servicios que tomó  a su cargo (luz, agua, gas y tasas) a través de los organismos pertinentes, caso contrario y hasta tanto dé cumplimiento de los requisitos exigidos por el presente contrato, deberá seguir abonando los alquileres y recargos que puedan corresponder. El LOCATARIO deberá presentar al momento de la restitución de la UNIDAD LOCADA, los servicios de mantenimiento realizados a los artefactos a gas por gasista matriculado y a la caldera por técnico calderista. En el caso que el LOCATARIO dejará la UNIDAD LOCADA abandonada o depositara judicialmente las llaves, se compromete a pagar el alquiler hasta el día en que el Juzgado restituya la posesión de la UNIDAD LOCADA al LOCADOR, completamente desocupado y de conformidad. El único instrumento válido para acreditar fehacientemente la restitución de la UNIDAD LOCADA, será el emanado exclusivamente por el LOCADOR.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "SÉPTIMA - MODIFICACIONES Y MEJORAS:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Queda prohibida toda modificación o mejoras voluntarias en la UNIDAD LOCADA salvo las permitidas por el LOCADOR de forma fehaciente. El LOCATARIO libera al LOCADOR del pago de cualquier mejora, aún si la misma fuera necesaria o urgente, la tomará a su exclusivo cargo y la dejará en beneficio de la UNIDAD LOCADA sin indemnización, desde el momento mismo de su construcción o incorporación. Asimismo, pagará también el arreglo de cualquier avería que acaeciere, siempre y cuando le corresponda, renunciando al derecho de repetición contra el LOCADOR. A todos los efectos el LOCATARIO renuncia a la facultad de retención por eventuales mejoras que le otorgan los artículos 1.226 y 2.587 del Código Civil y Comercial de la Nación.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "OCTAVA - INTRANSFERIBILIDAD:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`El presente contrato es intransferible, el LOCATARIO no podrá en ningún momento y bajo concepto alguno, subalquilar o transmitir, total o parcialmente, transitoria o permanentemente, gratuita u onerosamente la UNIDAD LOCADA, lo que le queda terminantemente prohibido, como así también el cambio del destino habitacional. El incumplimiento de la presente cláusula por el LOCATARIO dará derecho de rescisión contractual en favor del LOCADOR y además durante la transgresión deberá pagar una Cláusula Penal diaria de TREINTA PORCIENTO (30%) (Artículo 790 y ss., Código Civil y Comercial de la Nación).`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "NOVENA - RECEPCIÓN Y MANTENIMIENTO:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`El LOCATARIO recibe la UNIDAD LOCADA en perfecto estado de conservación, recientemente pintada y en correcto funcionamiento de sus accesorios, comprometiéndose a mantenerla y devolverla en las mismas condiciones en que la ha recibido, tomando a su cargo las reparaciones que le correspondan a raíz del uso cotidiano de sus instalaciones, no así las edilicias o estructurales, por roturas o desperfectos que se originen en la propiedad, artefactos, muebles y accesorios, no correspondiendo indemnización por reembolso. En base a lo expresado en el párrafo anterior es por cuenta y cargo del LOCATARIO efectuar a su exclusivo costo todas las reparaciones y gastos que fueran necesarios a fin de mantener la UNIDAD LOCADA en perfecto estado de funcionamiento y el de sus accesorios. Asimismo, deberá el LOCATARIO realizar por su cuenta y cargo, el servicio de mantenimiento de los artefactos a gas, por gasista matriculado; y de la caldera, por técnico calderista, una vez por año y al momento de la devolución de la UNIDAD LOCADA el LOCATARIO deberá realizar el mantenimiento descripto anteriormente, debiendo adjuntar en el acta de entrega la certificación del buen funcionamiento correspondiente. Se detalla en anexo "Acta de entrega e Inventario" los muebles y artefactos que el LOCADOR deja en la UNIDAD LOCADA, formando dicha Acta parte del presente contrato firmado por las partes de conformidad.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DÉCIMA - RESOLUCIÓN ANTICIPADA:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Por imperio del artículo 262 del DNU N° 70/2.023 el LOCATARIO tiene la facultad de "resolución anticipada" y podrá ejercerla en cualquier momento abonando el equivalente al DIEZ POR CIENTO (10%) del saldo del canon locativo futuro, calculado desde la fecha de notificación de la rescisión hasta la fecha de finalización pactada en el contrato. EL LOCATARIO notificará en forma fehaciente su resolución al LOCADOR con una antelación mínima de diez (10) días a la fecha en que restituirá la UNIDAD LOCADA.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DÉCIMA PRIMERA - DAÑOS:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`El LOCADOR no responderá por los daños y perjuicios que sufra el LOCATARIO o terceros en sus personas o en sus bienes por causa de accidentes, averías, catástrofes, cortocircuitos, corrosión, derrumbes, deflagraciones, desperfectos, deterioros, estragos, explosiones, fallas, filtraciones, humo, humedades, imperfecciones, incendios, inundaciones, pérdidas, roturas, o de cualquier otro tipo, incluyendo el caso fortuito y la fuerza mayor, ya que el LOCATARIO los asume como riesgo propio.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DÉCIMA SEGUNDA - TASAS Y SERVICIOS:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`EI LOCATARIO toma a su cargo el pago de las facturas por los servicios de provisión de Agua, Luz , Gas y las Tasas Municipales, debiendo abonarlos antes de cada vencimiento y entregar al LOCADOR el comprobante original del pago efectuado. Se deja convenientemente aclarado que junto al pago del alquiler se le requerirá al LOCATARIO el pago de todos los servicios enunciados por encontrarse en débito automático al LOCADOR. EI LOCATARIO será responsable de todo hecho que pudiera motivar el retiro, anulación o suspensión de cualquiera de estos servicios por atraso o falta de pago.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DÉCIMA TERCERA - PAGO Y DEPÓSITO EN GARANTÍA:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`A fin de garantizar el fiel cumplimiento de este contrato y todas las obligaciones contraídas, el LOCATARIO entrega al LOCADOR en este acto la suma de ${data.precio_escrito}($${data.precio_numerico}.-) en concepto de pago del alquiler correspondiente al mes de ${data.mes_escrito} ${data.anio_inicio_escrito} y la suma de ${data.precio_escrito}($${data.precio_numerico}.-), en concepto de "Depósito en Garantía"; siendo los vencimientos de los pagos los días DIEZ de cada mes; sirve el presente contrato de recibo suficiente para los mismos. El depósito en garantía se actualizará cuatrimestralmente, conforme los aumentos estipulados en el presente contrato. No podrá el LOCATARIO imputar el depósito en garantía para el pago de alquileres, gastos comunes del predio, tributos, servicios y en general a cualquier obligación corriente o anterior a restituir la UNIDAD LOCADA, y su devolución se hará efectiva al LOCATARIO, dentro de los treinta (30) días de la desocupación de la UNIDAD LOCADA al valor del alquiler vigente y una vez satisfechos todos los requerimientos por parte del LOCADOR, previa deducción de los gastos de reparación que se hubieren ocasionado a la propiedad o a sus instalaciones.`),


                    new Paragraph(" "),
                    new Paragraph({
                        text: "DÉCIMA CUARTA - FIADORES:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Afianzando las obligaciones del LOCATARIO nacidas o que deriven del presente contrato, sean extracontractuales o contractuales, y hasta la restitución de la UNIDAD LOCADA y extinción de sus obligaciones de conformidad al LOCADOR, asumen como FIADORES Solidarios, Lisos, Llanos y Principales Pagadores, con los alcances de codeudores solidarios, sin los beneficios de excusión, división y pre interpelación, ${data.sexo_fiador_1} ${data.nombre_fiador_1} quien acredita su identidad con DNI N°${data.dni_fiador_1} , con domicilio en la calle ${data.calle_fiador_1}  y ${data.sexo_fiador_2} ${data.nombre_fiador_2} , quien acredita su identidad con DNI N°${data.dni_fiador_2}, con domicilio en la calle ${data.calle_fiador_2}, ambos domicilios de la ciudad de Ushuaia, Provincia de Tierra del Fuego, quienes firman el presente contrato en prueba de conformidad. En caso de incapacidad o insolvencia parcial o total de alguno de los FIADORES, el LOCATARIO deberá sustituirlo en un plazo máximo de diez (10) días, sin necesidad de requerimiento alguno del LOCADOR, por otro que reúna la solvencia pretendida del sustituido. Adicionalmente el LOCADOR, siempre que circunstancias razonables así lo aconsejaren, se reserva el derecho de exigir otra garantía, real o personal, obligándose al LOCATARIO a presentarla a entera satisfacción del LOCADOR. Dentro del plazo que éste le imponga, el que no podrá ser mayor de quince (15) días. En caso de no presentarse la garantía requerida, o no ser ésta de entera satisfacción del LOCADOR, se considerará al LOCATARIO en Incumplimiento del Contrato, pudiendo el LOCADOR demandar la resolución de éste. Queda aclarado que, al vencer el plazo original del CONTRATO, caducará la garantía de los FIADORES y para que continúe, deberá suscribir cada nuevo acto de renovación, sean expresos o tácitos, según lo impone el artículo 1.225 del Código Civil y Comercial de la Nación.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DECIMA QUINTA - SEGURO DE INCENDIO:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`El LOCATARIO deberá contratar dentro de los diez (10) días de celebrado el presente contrato, un seguro contra incendio que asegure la UNIDAD LOCADA, con una Compañía de Seguros de primer nivel y prestigio, y mantenerlo asegurado durante toda la vigencia del contrato, la póliza deberá ser endosada a favor del LOCADOR y presentar copia de ésta. Sin perjuicio de lo antes dicho, la póliza deberá ser actualizada conforme a los precios de la plaza, de no hacerse, y de ocurrir un siniestro, El LOCATARIO será responsable por los daños que eventualmente se ocasionen a la UNIDAD LOCADA, a terceros o a ambos, en la medida en que no sean cubiertos por la Compañía Aseguradora.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DECIMA SEXTA - DOMICILIOS:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`A los efectos legales del presente contrato, las partes constituyen los siguientes domicilios especiales y correos electrónicos, en los cuales se tendrán por válidas todas las notificaciones derivadas del presente contrato, incluidas las de carácter judicial, extrajudicial o administrativo:`),
                    new Paragraph(`El LOCADOR: Con domicilio en calle ${data.direccion_locador}, localidad ${data.localidad_locador}, provincia de ${data.provincia_locador}, y correo electrónico  ${data.mail_locador}`),
                    new Paragraph(`El LOCATARIO: Con domicilio en calle ${data.direccion_inquilino}, ciudad de ${data.ciudad_inmueble}, provincia de ${data.provincia_inmueble}, y correo electrónico ${data.mail_inquilino}`),
                    new Paragraph(`El FIADOR ${data.nombre_fiador_1} : Con domicilio en calle ${data.calle_fiador_1}, ciudad de ${data.ciudad_fiador_1}, provincia de ${data.provincia_fiador1}, y correo electrónico  ${data.mail_fiador1}`),
                    new Paragraph(`El FIADOR BELIU RODRIGO MIGUEL : Con domicilio en calle ${data.calle_fiador_2}, ciudad de ${data.ciudad_fiador_2}, provincia de ${data.provincia_fiador2}, y correo electrónico ${data.mail_fiador2} `),
                    new Paragraph(`Las partes aceptan que toda notificación cursada a los domicilios o correos electrónicos aquí indicados será plenamente válida, aunque los interesados no residan o no se encuentren en ellos, salvo que hayan notificado fehacientemente a las demás partes un nuevo domicilio físico o electrónico.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DECIMA SEPTIMA - SELLADOS:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`El sellado del presente contrato estará a cargo del LOCADOR según lo dispuesto en la Ley Provincial N° 1.075, sancionada el 08 de Enero del 2.016 y publicada en el Boletín Oficial el 22 de Enero del 2.016, Título Cuarto, Impuesto de Sellos, Capítulo "De Las Exenciones”, Artículo 276, Inciso 31, siendo el mismo del 0,5% del valor total del presente contrato; suma de  ${data.precio_cerocinco_letra}  PESOS ($${data.precio_cerocinco_num}.-)  para su posterior pago mediante declaración jurada al organismo de Agencia de Recaudación Fueguina (AREF). El precio total de la locación se establece en ${data.precio_total_letra} PESOS ($${data.precio_total_num}.-),tomando como base el valor locativo del primer mes calculado por la duración del contrato conforme al DNU N° 70/2.023, Ley de Alquileres 27.737 y teniendo en cuenta la Disposición General AREF N° 001/20 de fecha 03 de Septiembre del 2.020.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DECIMA OCTAVA - JURISDICCION:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Para el caso de litigio entre el LOCADOR, LOCATARIO y  FIADORES se someterán a la jurisdicción de la Justicia Provincial Ordinaria de Ushuaia Distrito Judicial Sur, renunciando a cualquier otro fuero, constituyendo como domicilios legales los mencionados en el presente contrato, donde se considerarán válidas todas las notificaciones que se efectúen ya sea judiciales o extrajudiciales.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "DECIMA NOVENA - PROHIBICIONES:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Está prohibido introducir o almacenar en el inmueble elementos de cualquier índole (combustible, materiales inflamables, ácidos, explosivos, etc.) que puedan crear  perjuicio o peligro a la vivienda o a las personas o bien que pudieran afectar la seguridad de éste, objetos e instalaciones del mismo. Si el LOCATARIO trasgrediera las prohibiciones deberá abonar al LOCADOR, en concepto de Cláusula Penal una multa diaria del TREINTA POR CIENTO (30%) calculada sobre el valor del alquiler vigente (Artículo 790 y ss., Código Civil y Comercial de la Nación).`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "VIGESIMO - ACTOS EXCLUSIVAMENTE ESCRITOS:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Las partes declaran y se obligan en forma definitiva e irrevocable y como condición indispensable de esta locación, que todos los actos entre ellas únicamente se perfeccionarán por mutuo consentimiento y por escrito, más ninguno en forma oral o verbal, de palabra o, de hecho; vedando en especial cualquier prórroga o nuevos contratos sobre esta UNIDAD LOCADA, fuera de los escritos y firmados por las partes obligadas. Si el LOCATARIO pretendiere quedarse en la UNIDAD LOCADA, invocando: “locación verbal”, “de palabra” o “de hecho”, prohibida expresamente en esta cláusula; pagará como cláusula penal (Artículo 790 y ss., Código Civil y Comercial de la Nación) la suma de TREINTA POR CIENTO (30%) diarios en efectivo y además las otras obligaciones asumidas en el CONTRATO.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "VIGESIMO PRIMERA - RESPONSABILIDAD SOBRE DATOS DE LOS CONTRATANTES:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`En caso de falsedad de los datos personales o patrimoniales aportados en este contrato por el LOCATARIO o falsa negación de la firma impuesta en el mismo, dará derecho al LOCADOR, según el caso, a considerar rescindido el presente contrato con los alcances previstos en el mismo, quedando obligado el LOCATARIO a abonar al LOCADOR la suma equivalente a dos (2) meses de alquiler vigente al momento de comprobarse la falsedad, en concepto de daño moral sobrevenido de ésta causa, sin perjuicio de la aplicación de lo que las demás cláusulas establecen.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "VIGESIMO SEGUNDA - DESFASAJE DE ALQUILER Y READECUACION DE VALOR:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Si por la promulgación de nuevas normas o derogación de alguna o acontecimientos extraordinarios e imprevisibles, sean económicos o no, el alquiler neto a recibir por el LOCADOR se viere afectado, disminuido o desfasado respecto al alquiler "de plaza" o "de mercado” de la UNIDAD LOCADA, se comprometen el LOCADOR y el LOCATARIO a renegociar y adecuar inmediatamente el alquiler o precio de la locación a aplicar conforme a los valores de plaza determinando los períodos que corresponda, desde que esos hechos acaecieran o se dieran aquellas circunstancias y a efectos de ajustar el alquiler al valor de mercado vigente desde el mes en que se produjo la variación. En caso de falta de conformidad entre las partes sobre la readecuación del monto del nuevo valor del alquiler, se pedirán tasaciones a tres (3) inmobiliarias, cada parte designará una a su elección y a su cargo, y la tercera será una neutral, a cargo de ambas partes;  las tasaciones se promediarán, fijándose el monto resultante como alquiler y se incorporará al contrato mediante escrito firmado por ambas partes, con igual validez y eficacia jurídica que el presente. En todos los casos, la adecuación del valor del alquiler deberá concluir antes del devengamiento del siguiente cuatrimestre, sin que ello habilite al LOCATARIO a suspender el pago de las sumas correspondientes por falta de acuerdo previo entre las partes. Nunca podrán reducirse los "montos base" del alquiler en los periodos ya fijados en el presente contrato.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "VIGESIMO TERCERA - INCUMPLIMIENTOS CONTRACTUALES:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Se deja debidamente acordado entre las partes que cualquier incumplimiento del LOCATARIO establecido en las cláusulas del presente contrato, conforme al artículo N° 260 del DNU N° 70/2.023 inciso D, incorporándose al artículo N° 1.219 del Código Civil y Comercial de la Nación, el LOCADOR posee la facultad de resolución anticipada del contrato imputable al LOCATARIO. En estos casos el LOCADOR informará vía correo electrónico el incumplimiento que ocasionó la resolución unilateral del contrato por parte del LOCADOR, dando un plazo de diez (10) días para que el LOCATARIO entregue la UNIDAD LOCADA conforme a la cláusula SEXTA- RESTITUCIÓN  del presente contrato, abonando el LOCATARIO en concepto de resolución imputable al mismo lo establecido en la cláusula DÉCIMA- RESOLUCIÓN ANTICIPADA del presente contrato.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "VIGESIMO CUARTA - CLAUSULA DE VENTA:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`El LOCADOR manifiesta su intención de poner a la venta la UNIDAD LOCADA durante la vigencia del presente contrato. En tal caso, el LOCATARIO gozará de un derecho de preferencia para adquirir el inmueble en las mismas condiciones que cualquier oferta recibida de terceros. El LOCADOR se compromete a notificar fehacientemente al LOCATARIO sobre la oferta de venta recibida, detallando el precio, forma de pago y condiciones. Desde la recepción de dicha notificación, el LOCATARIO tendrá un plazo de treinta (30) días corridos para manifestar por escrito su voluntad de ejercer su derecho de preferencia. Si el LOCATARIO no ejerciera tal derecho dentro del plazo establecido, el LOCADOR quedará autorizado a concretar la venta con el tercero oferente, siempre que lo haga bajo iguales condiciones que las notificadas.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "VIGESIMO QUINTA - SELLADO Y REGISTRACION:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`Los pagos de sellado y registro serán a cargo del locatario al 100%.`),

                    new Paragraph(" "),
                    new Paragraph({
                        text: "VIGESIMO SEXTA - FIRMA E INSTRUMENTACION:",
                        style: "TituloNegrita",
                        spacing: { after: 300 }
                    }),
                    new Paragraph(`En prueba de conformidad y para su fiel cumplimiento se firman tres (3) ejemplares de un mismo tenor y a un solo efecto en la ciudad de Ushuaia, provincia de Tierra del Fuego, a los ${data.dia_firma} días de ${data.mes_firma} del ${data.anio_firma}. En este mismo acto, EL LOCATARIO recibe las llaves y la tenencia de la UNIDAD LOCADA.`),

                    new Paragraph(`FIRMA DEL LOCADOR`),
                    new Paragraph(`Nombre completo: __________________________ `),
                    new Paragraph(`DNI Nº: ___________________________________ `),

                    new Paragraph(" "),

                    new Paragraph(`FIRMA DEL LOCATARIO`),
                    new Paragraph(`Nombre completo: __________________________ `),
                    new Paragraph(`DNI Nº: ___________________________________ `),

                    new Paragraph(" "),

                    new Paragraph(`FIRMA DEL FIADOR`),
                    new Paragraph(`Nombre completo: __________________________ `),
                    new Paragraph(`DNI Nº: ___________________________________ `),

                    new Paragraph(" "),

                    new Paragraph(`FIRMA DEL FIADOR `),
                    new Paragraph(`Nombre completo: __________________________ `),
                    new Paragraph(`DNI Nº: ___________________________________ `),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `Contrato-${Date.now()}.docx`;

    fs.writeFileSync(fileName, buffer);
    res.download(fileName, fileName, err => {
        if (err) console.log(err);
        fs.unlinkSync(fileName);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
