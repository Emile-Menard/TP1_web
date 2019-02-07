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

insertRow('Samuel', '00000000', 'sam@outlook.com');
insertRow('Jean', '00000000', 'jean.pierre@outlook.com');
insertRow('Audrey', '00000000', 'audrey.vigneux@outlook.com');