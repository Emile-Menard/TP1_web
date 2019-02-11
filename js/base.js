function insertRow(nom, telephone, courriel) {
      if(nom != "" && telephone != "" && courriel != "") {
            var table = $('#DataTable');
            
            var row = document.createElement("tr");
            for (var i=0; i < arguments.length; i++) {
                  row.appendChild(createCol(arguments[i]));
            }
            row.appendChild(createCol(''));
            table.append(row);
      }     
}

function createCol(data) {
      var col = document.createElement("td");
      col.innerHTML = data;
      return col;
}

$("#InsertShowButton" ).click(function(event) {
      $("#Tableau-Controls").show();
      $(this).hide();
});

$("#ControlAcceptButton" ).click(function(event) {
      var name = $('#InsertName').val();
      var telephone = $('#InsertTelephone').val();
      var email = $('#InsertEmail').val();
      
      if(validationProvider.isValid())
            insertRow(name, email, telephone);
     
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