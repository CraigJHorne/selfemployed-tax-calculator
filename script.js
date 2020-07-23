//USER INPUT

var userEmployedSalary = document.getElementById("userEmployedSalary");
var userSelfEmployedIncome = document.getElementById("userSelfEmployedIncome");
var studentLoanPlan1 = document.getElementById("studentLoanPlan1");
var studentLoanPlan2 = document.getElementById("studentLoanPlan2");
var startedThisYear = document.getElementById("startedThisYear");
var endedThisYear = document.getElementById("endedThisYear");
var userStartDate = document.getElementById("userStartDate");
var userEndDate = document.getElementById("userEndDate");
var totalSelfEmployedExpenses = document.getElementById("totalSelfEmployedExpenses");

////FIELDS TO POPULATE

var selfEmployedTax = document.getElementById("selfEmployedTax");
var selfEmployedStudentLoan = document.getElementById("selfEmployedStudentLoan");
var nationalInsurance4 = document.getElementById("nationalInsurance4");
var nationalInsurance2 = document.getElementById("nationalInsurance2");
var totalSeTaxToPay = document.getElementById("totalSeTaxToPay");

////

//STUDENT LOAN CHECK BOXES

////

//IF STUDENT LOAN PLAN 1 CHECKBOX CHECKED PLAN 2 CHECK BOX UNCHECKS

function studentLoan1CheckBox() {
	var studentLoanPlan1 = document.getElementById("studentLoanPlan1");
	var studentLoanPlan2 = document.getElementById("studentLoanPlan2");
	if (studentLoanPlan1.checked) {
    	document.getElementById("studentLoanPlan2").checked = false;
    	var studentLoanPlan1 = true;
    return 1;
	}
}

//IF STUDENT LOAN PLAN 1 CLICKED EVERYTHING RECALCULATES


function studentLoan1CheckBoxAnddoEverything() {
	studentLoan1CheckBox();
	doEverything()
}

//IF STUDENT LOAN PLAN 2 CHECKBOX CHECKED PLAN 1 CHECK BOX UNCHECKS

function studentLoan2CheckBox() {
	var studentLoanPlan1 = document.getElementById("studentLoanPlan1");
	var studentLoanPlan2 = document.getElementById("studentLoanPlan2");
	if (studentLoanPlan2.checked) {
    	document.getElementById("studentLoanPlan1").checked = false;
    	var studentLoanPlan2 = true;
    return 2;
	}
}

//IF STUDENT LOAN PLAN 2 CLICKED EVERYTHING RECALCULATES


function studentLoan2CheckBoxAnddoEverything() {
	studentLoan2CheckBox();
	doEverything()
}

////

//CALCULATE EMPLOYED TAX

////

//CALCULATE EMPLOYED SALARY IN 45% BRACKET


function calculateEmployedBracket45() {
	var employedBracket45 = Math.max((userEmployedSalary.value - 150000), 0);
	return employedBracket45
}

//CALCULATE EMPLOYED SALARY IN 40% BRACKET

function calculateEmployedBracket40() {
	var employedBracket45 = calculateEmployedBracket45();
	var employedBracket40 = Math.max((userEmployedSalary.value - employedBracket45 - 50000), 0);
	return employedBracket40
}

//CALCULATE EMPLOYED SALARY IN 20% BRACKET

function calculateEmployedBracket20() {
	var employedBracket45 = calculateEmployedBracket45();
	var employedBracket40 = calculateEmployedBracket40();
	var employedBracket20 = Math.max((userEmployedSalary.value - employedBracket45 - employedBracket40 - 12500), 0);
	return employedBracket20
}

//CALCULATE EMPLOYED SALARY IN 0% BRACKET

function calculateEmployedBracket0() {
	var employedBracket45 = calculateEmployedBracket45();
	var employedBracket40 = calculateEmployedBracket40();
	var employedBracket20 = calculateEmployedBracket20();
	var employedBracket0 = (userEmployedSalary.value - employedBracket45 - employedBracket40 - employedBracket20);
	return employedBracket0
}

////

//CALCULATE REMAINING TAX ALLOWANCE IN EACH BRACKET AFTER EMPLOYED TAX IS TAKEN
//
//

//CALCULATE REMAINING ALLOWANCE in 40% BRACKET

function calculateRemainingBracket40() {
	var employedBracket40 = calculateEmployedBracket40();
	var remainingBracket40 = (100000 - employedBracket40);
	return remainingBracket40;
}

//CALCULATE REMAINING ALLOWANCE in 20% BRACKET

function calculateRemainingBracket20() {
	var employedBracket20 = calculateEmployedBracket20();
	var remainingBracket20 = (37500 - employedBracket20);
	return remainingBracket20;
}

//CALCULATE REMAINING ALLOWANCE in 0% BRACKET

function calculateRemainingBracket0() {
	var employedBracket0 = calculateEmployedBracket0();
	var remainingBracket0 = (12500 - employedBracket0);
	return remainingBracket0;
}

////

//CALCULATE STUDENT LOAN

////

//CALCULATE STUDENT LOAN THRESHOLD

function calculateStudentLoanThreshold() {
	var studentLoanPlan1 = studentLoan1CheckBox();
	var studentLoanPlan2 = studentLoan2CheckBox();
	if (studentLoanPlan1 == 1) {
		var studentLoanThreshold = 19390;
		//console.log(studentLoanThreshold);
		return studentLoanThreshold;
	} else if (studentLoanPlan2 == 2) {
		var studentLoanThreshold = 26575;
		//console.log(studentLoanThreshold);
		return studentLoanThreshold;
	} else {
		var studentLoanThreshold = (Number(userSelfEmployedIncome.value)) + (Number(userEmployedSalary.value));
		//console.log(studentLoanThreshold);
		return studentLoanThreshold;

	}
}

//CALCULATE EMPLOYED STUDENT LOAN

function calculateEmployedStudentLoan() {
	var studentLoanThreshold = calculateStudentLoanThreshold();
	var employedStudentLoan = Math.max((userEmployedSalary.value - studentLoanThreshold), 0) * 0.09;
	return employedStudentLoan;
}

//CALCULATE REMAINING STUDENT LOAN ALLOWANCE AFTER EMPLOYED TAX IS TAKEN

function calculateRemaningStudentLoanBracket() {
	var studentLoanThreshold = calculateStudentLoanThreshold();
	var remainingStudentLoanBracket = Math.max((studentLoanThreshold - userEmployedSalary.value), 0)
	//console.log(studentLoanThreshold, remainingStudentLoanBracket);
	return remainingStudentLoanBracket;
}


//CALCULATE SELF EMPLOYED STUDENT LOAN

function calculateSelfEmployedStudentLoan() {
	var remainingStudentLoanBracket = calculateRemaningStudentLoanBracket();
	var selfEmployedStudentLoan = (Math.max((userSelfEmployedIncome.value - remainingStudentLoanBracket), 0) * 0.09).toFixed(2);
	return selfEmployedStudentLoan;
}

////

//CALCULATE TAX

////

//CALCULATE EMPLOYED TAX

function calculateEmployedTax() {
	var employedBracket45 = calculateEmployedBracket45();
	var employedTax45 = employedBracket45 * 0.45;
	var employedBracket40 = calculateEmployedBracket40();
	var employedTax40 = employedBracket40 * 0.40;
	var employedBracket20 = calculateEmployedBracket20();
	var employedTax20 = employedBracket20 * 0.20;
	var employedBracket0 = calculateEmployedBracket0();
	var employedTax0 = 0;
}


//CALCULATE SELF EMPLOYED TAX

function calculateSelfEmployedTax() {
	var employedBracket45 = calculateEmployedBracket45();
	var remainingBracket40 = calculateRemainingBracket40();
	var remainingBracket20 = calculateRemainingBracket20();
	var remainingBracket0 = calculateRemainingBracket0();
	if (employedBracket45 > 0) {
		return (userSelfEmployedIncome.value * 0.45).toFixed(2);
	} else if (userSelfEmployedIncome.value > (remainingBracket20 + remainingBracket0)) {
		return (((userSelfEmployedIncome.value - (remainingBracket20 + remainingBracket0)) * 0.40) + (37500 * 0.20)).toFixed(2);
	} else if (userSelfEmployedIncome.value > remainingBracket0) {
		return ((userSelfEmployedIncome.value - remainingBracket0) * 0.20).toFixed(2);
	} else;
		return 0;
}


//CALCULATE NATIONAL INSURANCE 4


function calculateNationalInsurance4() {
	var nationalInsurance4 = (Math.max((userSelfEmployedIncome.value - 9500), 0) * 0.09).toFixed(2);
	return nationalInsurance4;
}

////

//CALCULATE NATIONAL INSURANCE 2

////

//START DATE INPUT APPEARS IF CHECKBOX SELECTED

function createStartDate() {
	if (userStartDate.style.display != "block") {
		userStartDate.style.display = "block";
	} else {
		userStartDate.style.display = ""
	}
}

//END DATE INPUT APPEARS IF CHECKBOX SELECTED

function createEndDate() {
	if (userEndDate.style.display != "block") {
		userEndDate.style.display = "block";
	} else {
		userEndDate.style.display = ""
	}
}

//GET START WEEK

function getStartWeek() {
	var startWeek = getDateValue(userStartDate.value);
	return startWeek;
}

//GET NUMBER OF WEEKS BETWEEN START & END

function getDateValue(a1) {
	var yearmonthVar = a1.substring(0, 7);
	var dayVar = a1.substring(8, 10);
	if (yearmonthVar == "2020-04") {
		var dayValue = (Number(dayVar)) - 5;
		//console.log(dayVar);
		var weekValue = Math.ceil(dayValue / 7);
		//console.log("day value = " + dayValue + " week value = " + weekValue);
		return weekValue;
	} else if (yearmonthVar == "2020-05") {
		var dayValue = (Number(dayVar)) + 25;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2020-06") {
		var dayValue = (Number(dayVar)) + 56;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2020-07") {
		var dayValue = (Number(dayVar)) + 86;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2020-08") {
		var dayValue = (Number(dayVar)) + 117;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2020-09") {
		var dayValue = (Number(dayVar)) + 148;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2020-10") {
		var dayValue = (Number(dayVar)) + 178;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2020-11") {
		var dayValue = (Number(dayVar)) + 209;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2020-12") {
		var dayValue = (Number(dayVar)) + 239;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2021-01") {
		var dayValue = (Number(dayVar)) + 270;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else if (yearmonthVar == "2021-02") {
		var dayValue = (Number(dayVar)) + 301;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} 	else if (yearmonthVar == "2021-03") {
		var dayValue = (Number(dayVar)) + 329;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	} else {
		var dayValue = (Number(dayVar)) + 360;
		var weekValue = Math.ceil(dayValue / 7);
		return weekValue;
	}
}

////

//GET END WEEK

////

//SET DEFAULT END DATE AS TODAYS DATE

var date = new Date();
userEndDate.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
    '-' + date.getDate().toString().padStart(2, 0);


//GET END WEEK

function getEndWeek() {
	var endWeek = getDateValue(userEndDate.value);
	return endWeek;
}

//CALCULATE NATIONAL INSURANCE 2 OWED

function calculateNationalInsurance2() {
	if (userSelfEmployedIncome.value > 6475) {
	var numberOfWeeks = getEndWeek() - getStartWeek();
	var nationalInsurance2 = numberOfWeeks * 3.05;
	var nationalInsurance2 = Math.max(nationalInsurance2, 0);
	return nationalInsurance2.toFixed(2);
	} else {
	var nationalInsurance2 = 0;
	var nationalInsurance2 = Math.max(nationalInsurance2, 0);
	return nationalInsurance2.toFixed(2);
	}
}

//POPULATE FIELDS

function doEverything() {
	selfEmployedTax.value =  (" " + calculateSelfEmployedTax());
	selfEmployedStudentLoan.value = (" " + calculateSelfEmployedStudentLoan());
	nationalInsurance4.value = (" " + calculateNationalInsurance4());
	nationalInsurance2.value = (" " + calculateNationalInsurance2());
	var totalSETaxes = (Number(selfEmployedTax.value) + Number(selfEmployedStudentLoan.value) + Number(nationalInsurance4.value) + Number(nationalInsurance2.value)).toFixed(2);
	totalSeTaxToPay.value = (" " + totalSETaxes);
}

function tradingAllowanceAlert() {
	if (totalSelfEmployedExpenses.value == "") {
		tradingAllowanceNote.style.display = "none";
	} else if (totalSelfEmployedExpenses.value < 1000) {
		tradingAllowanceNote.style.display = "block";
	} else {
		tradingAllowanceNote.style.display = "none";
	}
}

//LISTEN FOR EVENTS

userEmployedSalary.addEventListener("input", doEverything);
userSelfEmployedIncome.addEventListener("input", doEverything);
studentLoanPlan1.addEventListener("click", studentLoan1CheckBoxAnddoEverything);
studentLoanPlan2.addEventListener("click", studentLoan2CheckBoxAnddoEverything);
startedThisYear.addEventListener('click', createStartDate);
endedThisYear.addEventListener('click', createEndDate);
userStartDate.addEventListener('input', doEverything);
userEndDate.addEventListener('input', doEverything);
