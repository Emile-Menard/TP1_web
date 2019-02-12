var updating = { isUpdating: false, row: null};
var currentRow = null;
function insertRow(nom, telephone, courriel) {
      if(nom != "" && telephone != "" && courriel != "") {
            var table = $('#DataTable');
            
            var row = document.createElement("div");
            row.classList.add("table-row");


            for (var i=0; i < arguments.length; i++) {
                  row.appendChild(createCol(arguments[i]));
            }

            var deleteButton = document.createElement("button");
            
            var EditButton = document.createElement("button");
            
            EditButton.classList.add('invisible');
            deleteButton.classList.add('invisible');


            var col = document.createElement("div");
            col.classList.add("table-cell");
            col.appendChild(EditButton);
            col.appendChild(deleteButton);
            EditButton.innerHTML = '<i class="fa fa-pencil"></i>';
 
            deleteButton.style.marginLeft= '5px';
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

            
            $(row).on('mouseover',  function(e) {
              $(this).find('button').show();
            });






            let overlay_ = document.getElementById("Overlay");
            let back = document.getElementById("Wrapper");
            let popup_ = document.getElementById("Popup");

            $(deleteButton).on('click',  function(e) {
              currentRow = $(this).parent().parent();
              console.log($(this))
              overlay_.classList.add('overlay');
              popup_.classList.remove('invisible');
              back.classList.add('disabled');
             
            });

            let delAccept = document.getElementById("DeleteAcceptButton");

             $(delAccept).on('click',  function(e) {
                currentRow.remove();
                overlay_.classList.remove('overlay');
                popup_.classList.add('invisible');
                back.classList.remove('disabled');             
             });

             let delDeny = document.getElementById("DeleteDenyButton");

             $(delDeny).on('click',  function(e) {
                
                overlay_.classList.remove('overlay');
                popup_.classList.add('invisible');
                back.classList.remove('disabled');             
              });






            
            $(row).on('mouseout',  function(e) {
             $(this).find('button').hide();
            });

            $(EditButton).on('click',  function(e) {
             
             let row = $(this).parent().parent();
              
             updateData(row);
            
            });
            row.appendChild(col);

            table.append(row);
      }     
}

function updateData(row) {
 
  let nom = row.children()[0].innerHTML;
  let telephone = row.children()[1].innerHTML;
  let courriel = row.children()[2].innerHTML;
  
  let controlTab =  $("#Tableau-Controls");
  if(!controlTab.is(":visible")){
    controlTab.show();
    $("#InsertShowButton" ).hide();
  
  }

  validationProvider.reset();

  $('#InsertName').val(nom);
  $('#InsertTelephone').val(telephone);
  $('#InsertEmail').val(courriel);

  updating = {isUpdating: true, row: row};

}

function createCol(data) {
      var col = document.createElement("div");
      col.innerHTML = data;
      col.classList.add("table-cell");
      return col;
}

$("#InsertShowButton").click(function(event) {
      $("#Tableau-Controls").show();
      $(this).hide();
      validationProvider.reset();
});

$("#ControlDenyButton").click(function(event) {
      clearSoft();
});

function clearControls() {
      $('#InsertName').val('');
      $('#InsertTelephone').val('');
      $('#InsertEmail').val('');
      updating = {isUpdating: false, row: null};

      $("#Tableau-Controls").hide();
      $("#InsertShowButton" ).show();
     
}

function clearSoft() {
      $('#InsertName').val('');
      $('#InsertTelephone').val('');
      $('#InsertEmail').val('');
      updating = {isUpdating: false, row: null};
     
}


$("#Form-Insert").submit(function( event ) {
      var name = $('#InsertName').val();
      var telephone = $('#InsertTelephone').val();
      var email = $('#InsertEmail').val();
      
      if(validationProvider.isValid()) {
        if(updating.isUpdating){
         
         $(updating.row).children()[0].innerHTML = name;
         $(updating.row).children()[1].innerHTML = telephone;
         $(updating.row).children()[2].innerHTML = email;
         clearControls();
        }else{
          insertRow(name, telephone, email); 
          clearControls();
        }
        
      }
            
});

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

      if (TBX_Phone.value === "")
          return "Téléphone manquant";
      
      return "";
  }



insertRow('Samuel', '00000000', 'sam@outlook.com');
insertRow('Jean', '00000000', 'jean.pierre@outlook.com');
insertRow('Audrey', '00000000', 'audrey.vigneux@outlook.com');


let validationProvider = new ValidationProvider("Form-Insert");

validationProvider.addControl("InsertName", validate_name);
validationProvider.addControl("InsertEmail", validate_email);
validationProvider.addControl("InsertTelephone", validate_telephone);






