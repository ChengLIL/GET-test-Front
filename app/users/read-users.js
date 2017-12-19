$(document).ready(function(){

    // show list of users on first load
    showUsers();
    // when a 'read users' button was clicked
    $(document).on('click', '.read-users-button', function(){
        showUsers();
    });

});


// function to show list of users
function showUsers(){
    // get list of users from the API
    $.getJSON("http://localhost:8888/GET-test-api/1/users", function(data){
        // html for listing users
        read_users_html="";

        // when clicked, it will load the add user form
        read_users_html+="<div id='add-user' class='btn btn-primary pull-right m-b-15px add-user-button'>";
        read_users_html+="<span class='glyphicon glyphicon-plus'></span> Ajouter un User";
        read_users_html+="</div>";

        // start table
        read_users_html+="<table class='table table-bordered table-hover'>";

        // creating our table heading
        read_users_html+="<tr>";
        read_users_html+="<th class='w-10-pct'>Id</th>";
        read_users_html+="<th class='w-15-pct'>Name</th>";
        read_users_html+="<th class='w-25-pct'>Email</th>";
        read_users_html+="<th class='w-20-pct text-align-center'>Action</th>";
        read_users_html+="</tr>";

        // loop through returned list of data
        $.each(data.items, function(key, val) {

            // creating new table row per record
            read_users_html+="<tr>";

            read_users_html+="<td>" + val.id + "</td>";
            read_users_html+="<td>" + val.name + "</td>";
            read_users_html+="<td>" + val.email + "</td>";

            // 'action' buttons
            read_users_html+="<td>";

            // read user's tasks button
            read_users_html+="<button class='btn btn-info m-r-10px read-tasks-button' user-id='" + val.id + "'>";
            read_users_html+="<span class='glyphicon glyphicon-edit'></span> Gestion des Tâches";
            read_users_html+="</button>";

            // delete button
            read_users_html+="<button class='btn btn-danger delete-user-button' user-id='" + val.id + "'>";
            read_users_html+="<span class='glyphicon glyphicon-remove'></span> Supprimer";
            read_users_html+="</button>";
            read_users_html+="</td>";

            read_users_html+="</tr>";

        });

        // end table
        read_users_html+="</table>";
        // inject to 'page-content' of our app
        $("#page-content").html(read_users_html);
        // chage page title
        changePageTitle("Gestion des Users");
    });
}
