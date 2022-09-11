//IMPORTACION DE MODULOS DE NODE JS

const { ipcRenderer } = require('electron'); 

////DECLARACION DE VARIABLE DEL GRUPO ABIERTO, OBJETO, CONTENEDOR DE LOS OBJETOS Y FORMATO DE MONEDA

let groupOfObject;

let openObject;

let moneyF = new Intl.NumberFormat('es-CO', {

    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2
    

})

//INSERCION DE DATOS DEL GRUPO EN EL DOM Y DECLARACION DEL GRUPO ABIERTO

ipcRenderer.on('openPayroll', async (e, objectSelected) => {

    openObject = objectSelected

    groupOfObject = JSON.parse(localStorage.getItem(openObject.objectOfGroup));

    const windowTittle = document.getElementById('tittleOfWindowText');
    windowTittle.textContent = openObject.nameOfObject;

    const windowDescription = document.getElementById('descriptionOfWindow');
    windowDescription.textContent = openObject.descriptionOfObject;
    
    await renderizateFieldsF(objectSelected);

    autoSaveStartF();
  
})

//REQUERIMIENTO DE CAMPOS DE LA NOMINA

var nameAndLastname = document.getElementById('name');
var minimunWage = document.getElementById('minimunWage');
var days = document.getElementById('days');
var salaryWorked = document.getElementById('salaryWorked');
var extraHours = document.getElementById('extraHours');
var commissions = document.getElementById('commissions');
var transportAssist = document.getElementById('transportAssist');
var totalAccrued = document.getElementById('totalAccrued');
var epsContribution = document.getElementById('epsContribution');
var pensionContribution = document.getElementById('pensionContribution');
var lendLease = document.getElementById('lendLease');
var solidarityFund = document.getElementById('solidarityFund');
var totalDeducted = document.getElementById('totalDeducted');
var totalToPay = document.getElementById('totalToPay');

//REQUERIMIENTO DE CANTIDADES PARA LOS CLACULOS DE LA NOMINA

var amountDays = document.getElementById('amountDays');
var amountTransAss = document.getElementById('amountTransAss');
var amountEpsCon = document.getElementById('amountEpsCon');
var amountPenCon = document.getElementById('amountPenCon');

//RENDERIZACION DE CAMPOS DE LA NOMINA GUARDADOS EN EL LOCAL STORAGE

async function renderizateFieldsF(objectSelected) {
    
    amountDays.value = objectSelected.amountDays;
    amountTransAss.value = objectSelected.amountTransAss;
    amountEpsCon.value = objectSelected.amountEpsCon;
    amountPenCon.value = objectSelected.amountPenCon;

    nameAndLastname.value = objectSelected.name;
    minimunWage.value = openObject.minimunWage;
    days.value = objectSelected.days;
    extraHours.value = objectSelected.extraHours;
    commissions.value = objectSelected.commissions;   
    lendLease.value = objectSelected.lendLease;

}

//TAMAÑO AUTOMATICO DE LOS TEXT AREA
function reloadTextArea() {
    
    textArea = document.querySelectorAll('textarea');

    textArea.forEach(area => {
       
        area.style.height = `${area.scrollHeight}px`

    });

}

setInterval(reloadTextArea, 500);

//ESTABLECIMIENTO DE FORMATO DE LOS CAMPOS DE LA NOMINA

function formatF() {

}

//setInterval(formatF, 500);

//CALCULOS AUTOMATICOS DE LA NOMINA

function calculateF(){

    var amountDaysValue = parseFloat(amountDays.value);
    var amountTransAssValue = parseFloat(amountTransAss.value);
    var epsPercentage = parseFloat(amountEpsCon.value)/100;
    var pensionPercentage = parseFloat(amountPenCon.value)/100;


    var minimunWageValue = parseFloat(minimunWage.value);
    var daysValue = parseFloat(days.value);
    var salaryWorkedValue = parseFloat(salaryWorked.value);
    var extraHoursValue = parseFloat(extraHours.value);
    var commissionsValue = parseFloat(commissions.value);
    var transportAssistValue = parseFloat(transportAssist.value);
    var totalAccruedValue = parseFloat(totalAccrued.value);
    var epsContributionValue = parseFloat(epsContribution.value);
    var pensionContributionValue = parseFloat(pensionContribution.value);
    var lendLeaseValue = parseFloat(lendLease.value);
    var solidarityFundValue = parseFloat(solidarityFund.value);
    var totalDeductedValue = parseFloat(totalDeducted.value);

    var preTotalAccrued = salaryWorkedValue + extraHoursValue + commissionsValue;

    //calculo automatico del salario trabajado segun los dias trabajados

    var salaryPerDay = minimunWageValue / amountDaysValue;

    salaryWorked.value = parseInt(salaryPerDay * daysValue);

    //deteccion de si se requiere auxilio de transporte

    if (preTotalAccrued < 2000000){

        transportAssist.value = amountTransAssValue;

    }else{

        transportAssist.value = 0;

    }


    //calculo automatico del total devengado

    totalAccrued.value = salaryWorkedValue + extraHoursValue + commissionsValue + transportAssistValue;

    //calculo automatico de los aportes a pension eps y fondo solidario

    epsContribution.value = epsPercentage * preTotalAccrued;

    pensionContribution.value = pensionPercentage * preTotalAccrued;


    if (preTotalAccrued >= 4000000) {
        
        solidarityFund.value = 0.01 * preTotalAccrued;

    }else{

        solidarityFund.value = 0;

    }

    totalDeducted.value = epsContributionValue + pensionContributionValue + lendLeaseValue + solidarityFundValue;

    totalToPay.value = moneyF.format(totalAccruedValue - totalDeductedValue); 

}

setInterval(calculateF, 500);

//FUNCION DE GUARDADO AUTOMATICO DE LA NOMINA

function autoSavePayrollF() {

    openObject.amountDays = amountDays.value;
    openObject.amountTransAss = amountTransAss.value;
    openObject.amountEpsCon = amountEpsCon.value;
    openObject.amountPenCon = amountPenCon.value;

    openObject.name = nameAndLastname.value;
    openObject.minimunWage = minimunWage.value;
    openObject.days = days.value;
    openObject.extraHours = extraHours.value;
    openObject.commissions = commissions.value; 
    openObject.lendLease = lendLease.value;    

    localStorage.setItem(openObject.nameOfObject, JSON.stringify(openObject));

}

function autoSaveStartF(){
    
    setInterval(autoSavePayrollF, 500)

}