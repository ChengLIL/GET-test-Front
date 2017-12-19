$(document).ready(function(){

    // show html form when 'add task' button was clicked
    $(document).on('click', '.add-task-button', function(){
        // get the user id
        var user_id = $(this).attr('user-id');
        // load list of users
        $.getJSON(window.location.protocol + "//" + window.location.host + "/GET-test-api/1/users", function(data){
            // build users option html
            // loop through returned list of data
            var users_options_html="";
            users_options_html+="<select name='user_id' id='user_id' class='form-control'>";
            if(data.items.length > 1){
                $.each(data.items, function(key, val){
                    if (val.id == user_id){
                        users_options_html+="<option selected='selected' value='" + val.id + "'>" + val.name + "</option>";
                    }
                    else{
                        users_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
                    }
                });
            }else if((typeof data.items !== 'undefined')&&(data.items.name)){
                users_options_html+="<option selected='selected' value='" + data.items.id + "'>" + data.items.name + "</option>";
            }

            users_options_html+="</select>";

            // we have our html form here where task information will be entered
            // we used the 'required' html5 property to prevent empty fields
            var add_task_html="";

            // 'tasks list' button to show list of tasks
            add_task_html+="<div id='read-tasks' class='btn btn-primary pull-right m-b-15px read-tasks-button' user-id='" + user_id + "'>";
            add_task_html+="<span class='glyphicon glyphicon-list'></span> Gestion des Tâches";
            add_task_html+="</div>";

            // 'add task' html form
            add_task_html+="<form id='add-task-form' action='#' method='post' border='0'>";
            add_task_html+="<table class='table table-hover table-responsive table-bordered'>";

            // title field
            add_task_html+="<tr>";
            add_task_html+="<td>Title</td>";
            add_task_html+="<td><input type='text' name='title' class='form-control' required /></td>";
            add_task_html+="</tr>";

            // description field
            add_task_html+="<tr>";
            add_task_html+="<td>Description</td>";
            add_task_html+="<td><textarea name='description' class='form-control' required></textarea></td>";
            add_task_html+="</tr>";

            // user 'select' field
            add_task_html+="<tr>";
            add_task_html+="<td>User</td>";
            add_task_html+="<td>" + users_options_html + "</td>";
            add_task_html+="</tr>";

            // status field
            add_task_html+="<tr>";
            add_task_html+="<td>Status</td>";
            add_task_html+="<td><input type='number' min='0' name='status' class='form-control' required /></td>";
            add_task_html+="</tr>";

            // button to submit form
            add_task_html+="<tr>";
            add_task_html+="<td></td>";
            add_task_html+="<td>";
            add_task_html+="<button type='submit' class='btn btn-primary'>";
            add_task_html+="<span class='glyphicon glyphicon-plus'></span> Ajouter cette Tâche";
            add_task_html+="</button>";
            add_task_html+="</td>";
            add_task_html+="</tr>";

            add_task_html+="</table>";
            add_task_html+="</form>";

            // inject html to 'page-content' of our app
            $("#page-content").html(add_task_html);

            // chage page title
            changePageTitle("Ajouter une Tâche");
        });
    });

    // will run if add task form was submitted
    $(document).on('submit', '#add-task-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());
        // submit form data to api
        $.ajax({
            url: window.location.protocol + "//" + window.location.host + "/GET-test-api/1/tasks",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // task was created, go back to tasks list
                showTasks($( "#user_id" ).val());
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});