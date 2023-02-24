 

function showModal(){
    $("#addOrEdit").modal('show')
}



function Edit(id, titel, amount, type){
    $("#op").val('U')
    $("#id").val(id)
    $("#title").val(titel)
    $("#amount").val(amount)
    $("#type").val(type).change()

    $("#addOrEdit").modal('show')
}

