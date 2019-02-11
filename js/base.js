function insertRow(nom, telephone, courriel) {
      if(nom != "" && telephone != "" && courriel != "") {
            var table = $('#DataTable');
            
            var row = document.createElement("div");
            row.classList.add("table-row");


            for (var i=0; i < arguments.length; i++) {
                  row.appendChild(createCol(arguments[i]));
            }

            var deleteButton = document.createElement("button");
            deleteButton.classList.add('invisible');
            


            var col = document.createElement("div");
            col.classList.add("table-cell");
            col.appendChild(deleteButton);
            col.classList.add('foo');

            row.addEventListener('mouseover', cellOverRow);
            row.addEventListener('mouseout', cellLeaveRow);
            row.appendChild(col);

            table.append(row);
      }     
}

function createCol(data) {
      var col = document.createElement("div");
      col.innerHTML = data;
      col.classList.add("table-cell");
      return col;
}


    
    function cellOverRow(event){
      let commandes =  event.target.parentElement.lastChild.childNodes;
      //console.log(commandes);
      for (var i = commandes.length - 1; i >= 0; i--) {
        commandes[i].classList.remove('invisible');
      }
      
    }
    function cellLeaveRow(event){
       if(!event.target.classList.contains('foo')){
        let commandes =  event.target.parentElement.lastChild.childNodes;
       // console.log(event.target.tagName);
        for (var i = commandes.length - 1; i >= 0; i--) {
         
            commandes[i].classList.add('invisible');
         
          
        }
      }
    }

// $("#DataTable .table-row").hover(function(event){
//   event.stopPropagation();
//   $(this).find("#commandes").last().show();
// }, function(event){
//      event.stopPropagation();
//      $(this).find("#commandes").last().hide();
// });




$("#InsertShowButton" ).click(function(event) {
      $("#Tableau-Controls").show();
      $(this).hide();
});

$("#Form-Insert" ).submit(function( event ) {
      var name = $('#InsertName').val();
      var telephone = $('#InsertTelephone').val();
      var email = $('#InsertEmail').val();
      

      if(validationProvider.isValid())
            insertRow(name, telephone, email);  
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

$('#DataTable .table-row').on('mouseover',  function(e) {
  console.log($(this).find('.foo').show());
});

$('#DataTable .table-row').on('mouseleave',  function(e) {
  console.log($(this).find('.foo').hide());
});




