/* VARIABLES  */

var items = [];
var total = "";
var sum;
var inputIsValid;
var errorMessage = "";
var errors = [];
var row = "";

/*    UPDATE FUNCTIONS    */

function updateTable(){
	row = "";
	for(var i = 0; i< items.length;i++){
		row = row.concat("<tr>");		
		row = row.concat("<td><a class=' text-danger' onclick='onClickRemoveItemInstance(this)'><i class='glyphicon glyphicon-remove-circle'></i></td></a>");		
		row = row.concat("<td id='index'>"+i+"</td>");		
		row = row.concat("<td>"+items[i].name+"</td>");
		row = row.concat("<td>"+items[i].price+"</td>");
		row = row.concat("</tr>");
	}
	updateTotal();
	$("#tbody").html(row);
}


function updateTotal(){
	total = "";
	sum = 0;
	for(var i = 0; i<items.length;i++){
		sum = parseFloat(items[i].price) + parseFloat(sum);
	}
	total = sum;
	$("#total").html(total);
}


/*  SUPPORT FUNCTIONS   */ 

function validateInput(){
	inputIsValid = false;


	if ($("#inputItemPrice").val() && $("#inputItemName").val()){			
		if( !isNaN($("#inputItemPrice").val()) ){
			inputIsValid = true;
		} else{				
			errors.push("Input must be a number");
			showErrors();
		}			
	} else{			
		errors.push("Blank Fields not Allowed");
		showErrors();
	}
}

function unique(array) {
	return $.grep(array, function(el, index) {
		return index === $.inArray(el, array);
	});
}


/* HIDE AND SHOW ERRORS FUNCTIONS */

function showErrors(){
	errorMessage="";
	errors = unique(errors);
	for(var i = 0; i < errors.length; i++){			
		errorMessage = errorMessage.concat(errors[i]  + "<br>");
	}

	$("#errors").html(errorMessage);
	$("#errors").css("display","block");
}
function hideErrors(){
	errorMessage  = "";
	$("#errors").css("display","none");	
}



/*   USER INTERFACE FUNCTIONS     */

function addItem (item){
	items.push(item);
	items[items.length-1].desc = "Default";
}
function removeItem (){
	items.pop();
}
function clearAll (){
	$("#tbody").html("");

	hideErrors();
}
function removeAllItems(){
	items = [];
}


/*     ON CLICK USER INTERFACE BUTTONS    */
function onClickAddItemButton(){
	validateInput();
	if(inputIsValid){
		clearAll();	
		addItem(new Item ($("#inputItemName").val(), $("#inputItemPrice").val() ));
		updateTable();
	}
}
function onClickRemoveItemButton(){
	clearAll();
	removeItem();
//updateResults();
updateTable();
}
function onClickClearAllButton(){
	clearAll();
}
function onClickRemoveAllButton(){
	clearAll();
	removeAllItems();
	updateTable();
}
 
function onClickRemoveItemInstance(e){
	var instance = $(e).parent().parent().find("#index").text();
	items.splice(instance,1);
	updateTable();	
}


/*  CLASSES  */

class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;
		this.desc;
	}
}