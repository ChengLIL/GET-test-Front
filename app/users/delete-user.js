$(document).ready(function(){

    // will run if the delete button was clicked
    $(document).on('click', '.delete-user-button', function(){
        // get the task id
        var user_id = $(this).attr('user-id');
        // bootbox for good looking 'confirm pop up'
        bootbox.confirm({

            message: "<h4>Êtes-vous sûr de supprimer ce user?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Oui',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> Non',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if(result==true){

                    // send delete request to api / remote server
                    $.ajax({
                        url: window.location.protocol + "//" + window.location.host + "/GET-test-api/1/tasksByUser/"+user_id,
                        type : "DELETE",
                        dataType : 'json',
                        success : function(result) {
                            $.ajax({
                                url: window.location.protocol + "//" + window.location.host + "/GET-test-api/1/users/"+user_id,
                                type : "DELETE",
                                dataType : 'json',
                                success : function(result) {
                                    // re-load list of users
                                    showUsers();
                                },
                                error: function(xhr, resp, text) {
                                    console.log(xhr, resp, text);
                                }
                            });
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });
                }
            }
        });
    });
});