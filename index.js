/* Based on the nodejs API documentation            *
 * https://www.npmjs.com/package/google-spreadsheet */

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./Credentials.json');

const doc = new GoogleSpreadsheet('1k2WL8lhCH_M2gDaDdE1OGw2c4lZj5n6VoevNr3wG4Wo');

async function updateSpreadSheet() {
    /* Header class for clearer indexing of cells */
    const header = {
        Matricula: 0,
        Aluno:     1,
        Faltas:    2,
        P1:        3,
        P2:        4,
        P3:        5,
        Situacao:  6,
        NAF:       7
    };

    /* Aunthenticate */
    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    });
      
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] // gets the first sheet
    await sheet.loadCells('A1:H27'); // loads specific cells

    /* Go through each row(student) and determine their situation and NAF */
    for(let i = 3; i < 27; i++) {
        /* Load cells for especific student */
        let attendance = sheet.getCell(i, header.Faltas);
        let p1 = sheet.getCell(i, header.P1).value;
        let p2 = sheet.getCell(i, header.P2).value;
        let p3 = sheet.getCell(i, header.P3).value;
        let situation = sheet.getCell(i, header.Situacao);
        let naf = sheet.getCell(i, header.NAF);

        /* Calculate attendance */
        naf.value = 0; // set inital naf
        if(attendance/60 > 0.25) {
            situation.value = "Reprovado por Falta";
        } else { // didnt fail due to attendance
            /* Calculate grade */
            let grade = Math.ceil((p1 + p2 + p3) / 3);

            if(grade >= 70) {
                situation.value = "Aprovado";
            } else if(grade >= 50) {
                situation.value = "Exame Final";
                /* naf : 5 <= (m + naf)/2 is the same as naf >= 10 - m. *
                 * since the grades are 0..100, we use naf >= 100 - m   */
                naf.value = 100 - grade;
            } else {
                situation.value = "Reprovado por Nota";
            }
        }
        await sheet.saveUpdatedCells();

    }
}

updateSpreadSheet();