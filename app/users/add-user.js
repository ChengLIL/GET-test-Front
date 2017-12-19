$(document).ready(function(){

    // show html form when 'add user' button was clicked
    $(document).on('click', '.add-user-button', function(){
        // we have our html form here where user information will be entered
        // we used the 'required' html5 property to prevent empty fields
        var add_user_html="";

        // 'users list' button to show list of users
        add_user_html+="<div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>";
        add_user_html+="<span class='glyphicon glyphicon-list'></span> Gestion des Users";
        add_user_html+="</div>";

        // 'add user' html form
        add_user_html+="<form id='add-user-form' action='#' method='post' border='0'>";
        add_user_html+="<table class='table table-hover table-responsive table-bordered'>";

        // name field
        add_user_html+="<tr>";
        add_user_html+="<td>Name</td>";
        add_user_html+="<td><input type='text' name='name' class='form-control' required /></td>";
        add_user_html+="</tr>";

        // email field
        add_user_html+="<tr>";
        add_user_html+="<td>Email</td>";
        add_user_html+="<td><textarea name='email' class='form-control' required></textarea></td>";
        add_user_html+="</tr>";

        // button to submit form
        add_user_html+="<tr>";
        add_user_html+="<td></td>";
        add_user_html+="<td>";
        add_user_html+="<button type='submit' class='btn btn-primary'>";
        add_user_html+="<span class='glyphicon glyphicon-plus'></span> Ajouter ce User";
        add_user_html+="</button>";
        add_user_html+="</td>";
        add_user_html+="</tr>";

        add_user_html+="</table>";
        add_user_html+="</form>";

        // inject html to 'page-content' of our app
        $("#page-content").html(add_user_html);

        // chage page title
        changePageTitle("Ajouter un User");
    });

    // will run if add user form was submitted
    $(document).on('submit', '#add-user-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: window.location.protocol + "//" + window.location.host + "/GET-test-api/1/users",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // user was added, go back to users list
                showUsers();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});