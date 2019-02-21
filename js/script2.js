var contacts = [];
var i = 1;

class Contact{
	mName;
	mPhone;
	mEmail;
	constructor(name = null, phone = null, email = null){
		this.mName = name;
		this.mPhone = phone;
		this.mEmail = email;
	}
}

function insertContact(contact){
	if(contact.name != "" && contact.phone != "" && contact.email != "") {

		contacts.push(contact);
		console.log(contacts);

		let grid = $("#DataGrid");

		let row = document.createElement("div");
		row.classList.add('grid-container');
		row.classList.add("row_" + i++);

		let name = document.createElement("div");
		let phone = document.createElement("div");
		let email = document.createElement("div");
		let ctrl = document.createElement("div");

		let j = 1;
		name.classList.add("cell_" + j++);
		phone.classList.add("cell_" + j++);
		email.classList.add("cell_" + j++);
		ctrl.classList.add("cell_" + j++);

		name.innerHTML = contact.mName;
		phone.innerHTML = contact.mPhone;
		email.innerHTML = contact.mEmail;

        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        editButton.classList.add('hide');
        deleteButton.classList.add('hide');
        editButton.innerHTML = '<i class="fa fa-pencil"></i>';
        deleteButton.style.marginLeft= '5px';
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        ctrl.appendChild(editButton);
		ctrl.appendChild(deleteButton);

		row.append(name);		
		row.append(phone);
		row.append(email);
		row.append(ctrl);	

		let overlay_ = document.getElementById("Overlay");
        let back = document.getElementById("Wrapper");
        let popup_ = document.getElementById("Popup");

        let delAcceptBtn = document.getElementById("DeleteAcceptButton");
        let delDenyBtn = document.getElementById("DeleteDenyButton");	

		$(row).on('mouseover',  function(e) {
            $(this).find('button').show();
        });
            
        $(row).on('mouseout',  function(e) {
            $(this).find('button').hide();
        });

        $(deleteButton).on('click',  function(e) {
            overlay_.classList.add('show');
            popup_.classList.add('show');
            document.getElementById('ContactName').innerHTML = row.childNodes[0].innerHTML + "?";
            back.classList.add('disabled');
        });

        $(editButton).on('click',  function(e) {
            // updateData.children = row.parent().children();
            // if(updateData.children != null)
            //     RemoveCurrentEdit();
            
            // row.addClass('current-edit');
            // updateData(row);
        });


        $(delAcceptBtn).on('click',  function(e) {
            console.log(row);
            overlay_.classList.remove('show');
            popup_.classList.remove('show');
            back.classList.remove('disabled'); 
            //clearInputs();            
        });

        $(delDenyBtn).on('click',  function(e) {
            overlay_.classList.remove('show');
            popup_.classList.remove('show');
            back.classList.remove('disabled');             
        });

		grid.append(row);
	}
}

$("#InsertShowButton").click(function(event) {
    $("#Tableau-Controls").show();
    $(this).hide();
    validationProvider.reset();
});

$("#ControlRefreshButton").click(function(event) {
    clearInputs();
    if(updateData.children != null)
        removeCurrentEdit();
        
    updateData.children = null;
});

$("#ControlCancelButton").click(function(event) {
    clearInputs();
    $("#Tableau-Controls").hide();
    $("#InsertShowButton" ).show();
    if(updateData.children != null)
        removeCurrentEdit();

    updateData.children = null;
});

function clearInputs() {
    $('#InsertName').val('');
    $('#InsertTelephone').val('');
    $('#InsertEmail').val('');
    updating = {isUpdating: false, row: null};
}

function removeCurrentEdit() {
    for (let index = 0; index <  updateData.children.length; index++) {
        $(updateData.children[index]).removeClass('current-edit');
    }
}

function validate_email(){
    let TBX_Email = document.getElementById("InsertEmail");
    let emailRegex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

    if (!emailRegex.test(TBX_Email.value))
        return "Adresse de courriel invalide";

    return "";
}

function validate_name(){
    let TBX_FirstName = document.getElementById("InsertName");

    if (TBX_FirstName.value === "")
        return "Prénom manquant";
      
    return "";
}

function validate_telephone(){
    let TBX_Phone = document.getElementById("InsertTelephone");

    if (TBX_Phone.value === "" )
        return "Téléphone manquant";
    if (!(TBX_Phone.value.length === 10 && $.isNumeric(TBX_Phone.value) && TBX_Phone.value > 0)) {
        return "Téléphone de format invalide";
    }
      
    return "";
}

let validationProvider = new ValidationProvider("Form-Insert");

validationProvider.addControl("InsertName", validate_name);
validationProvider.addControl("InsertEmail", validate_email);
validationProvider.addControl("InsertTelephone", validate_telephone);

insertContact(new Contact('Samuel', '1234567890', 'sam@outlook.com'));
insertContact(new Contact('Jean', '1234567890', 'jean.pierre@outlook.com'));
insertContact(new Contact('Audrey', '1234567890', 'audrey.vigneux@outlook.com'));