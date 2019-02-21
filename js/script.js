var updating = { isUpdating: false, row: null, children: null};
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
            deleteButton.classList.add('invisible');

            var editButton = document.createElement("button");
            editButton.classList.add('invisible');
            
            var col = document.createElement("div");
            col.classList.add("table-cell");
            col.appendChild(editButton);
            col.appendChild(deleteButton);

            editButton.innerHTML = '<i class="fa fa-pencil"></i>';
            deleteButton.style.marginLeft= '5px';
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

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
                currentRow = $(this).parent().parent();
                console.log($(this))
                overlay_.classList.add('show');
                popup_.classList.add('show');
                document.getElementById('ContactName').innerHTML = currentRow.children()[0].innerHTML + "?";
                back.classList.add('disabled');
            });

            $(editButton).on('click',  function(e) {
                let row = $(this).parent().parent();
                updateData.children = row.parent().children();
                if(updateData.children != null)
                    RemoveCurrentEdit();
                
                row.addClass('current-edit');
                updateData(row);
            });


            $(delAcceptBtn).on('click',  function(e) {
                row.remove();
                overlay_.classList.remove('show');
                popup_.classList.remove('show');
                back.classList.remove('disabled'); 
                clearControls();            
            });

            $(delDenyBtn).on('click',  function(e) {
                
                overlay_.classList.remove('show');
                popup_.classList.remove('show');
                back.classList.remove('disabled');             
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

    row

}

function createCol(data) {
    var col = document.createElement("div");
    col.innerHTML = data;
    col.classList.add("table-cell");
    return col;
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
        }
        else{
            insertRow(name, telephone, email); 
            clearControls();
        }
        
    }         
});




insertRow('Samuel', '1234567890', 'sam@outlook.com');
insertRow('Jean', '1234567890', 'jean.pierre@outlook.com');
insertRow('Audrey', '1234567890', 'audrey.vigneux@outlook.com');



