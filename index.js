// import XLSX from './lib/sheetjs/dist/xlsx.mini.min.js'
// var XLSX=''
// import './lib/sheetjs/xlsx.mjs'

//https://www.youtube.com/watch?v=BE8U2wPL4k0&ab_channel=ISeeSharp
//https://blog.katastros.com/a?ID=c788097f-bfc1-42eb-88cb-144f6978792b

document.getElementById('btn-export').onclick = function() {
    generateReport('xlsx')
}
    
function generateReport(type, fn, dl) {
    let nameFile = 'prueba'// se obtendria del titulo de la seccion donde se encuentra la tabla
    let nameSheet = 'Hoja1'// nombre de la hoja se obtendra de los encabezados activos de los filtros
    var table_elt  = document.getElementById('export-to-excel');// Elemento tabla de html
    
  

    //obtener las posibles hojas que se puedan generar
    // var ws = XLSX.utils.table_to_book(table_elt , { sheet: nameSheet });
    var workbook  = XLSX.utils.table_to_book(table_elt,{sheet:nameSheet});
    console.log('workbook',workbook)
   // workbook - wb
   //workSheet - ws 
    var ws = workbook.Sheets;

    console.log('ws',ws)

    XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});
    console.log(XLSX)
    return dl ?
        XLSX.write(workbook , { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(workbook , fn || (nameFile +'.'+ (type || 'xlsx')));
}

//delete col and row empty
function deleteRowsAndColums(wb,ws){

}


// upload file


