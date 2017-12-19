$(document).ready(function(){

    // handle 'read one' button click
    $(document).on('click', '.read-one-task-button', function(){
        // get task id
        var task_id = $(this).attr('task-id');
        var user_id = $(this).attr('user-id');
        // read task record based on given ID
        $.getJSON("http://localhost:8888/GET-test-api/1/tasks/" + task_id, function(data){
            // start html
            var read_one_task_html="";

            // when clicked, it will show the user's tasks list
            read_one_task_html+="<div id='read-tasks' class='btn btn-primary pull-right m-b-15px read-tasks-button' user-id='" + user_id + "'>";
            read_one_task_html+="<span class='glyphicon glyphicon-list'></span> Gestion des Tâches";
            read_one_task_html+="</div>";

            // task data will be shown in this table
            read_one_task_html+="<table class='table table-bordered table-hover'>";

            // task title
            read_one_task_html+="<tr>";
            read_one_task_html+="<td class='w-30-pct'>Title</td>";
            read_one_task_html+="<td class='w-70-pct'>" + data.items.title + "</td>";
            read_one_task_html+="</tr>";

            // task description
            read_one_task_html+="<tr>";
            read_one_task_html+="<td>Description</td>";
            read_one_task_html+="<td>" + data.items.description + "</td>";
            read_one_task_html+="</tr>";

            // task user name
            read_one_task_html+="<tr>";
            read_one_task_html+="<td>User</td>";
            read_one_task_html+="<td>" + data.items.user_id + "</td>";
            read_one_task_html+="</tr>";

            // task status
            read_one_task_html+="<tr>";
            read_one_task_html+="<td>Status</td>";
            read_one_task_html+="<td>" + data.items.status + "</td>";
            read_one_task_html+="</tr>";

            read_one_task_html+="</table>";
            // inject html to 'page-content' of our app
            $("#page-content").html(read_one_task_html);

            // chage page title
            changePageTitle("Tâche détail");
        });
    });

});
