$(document).ready(function(){

    // show list of tasks on first load
    // showTasks();
    // when a 'read tasks' button was clicked
    $(document).on('click', '.read-tasks-button', function(){
        // get the user id
        var user_id = $(this).attr('user-id');
        showTasks(user_id);
    });

});


// function to show list of tasks
function showTasks(user_id){
    // get list of tasks from the API
    $.getJSON("http://localhost:8888/GET-test-api/1/tasksByUser/"+user_id, function(data){
        // html for listing tasks
        read_tasks_html="";

        // 'users list' button to show list of users
        read_tasks_html+="<div id='read-users' class='btn btn-primary pull-left m-b-15px read-users-button'>";
        read_tasks_html+="<span class='glyphicon glyphicon-list'></span> Gestion des Users";
        read_tasks_html+="</div>";

        // when clicked, it will load the add task form
        read_tasks_html+="<div id='add-task' class='btn btn-primary pull-right m-b-15px add-task-button' user-id='" + user_id + "'>";
        read_tasks_html+="<span class='glyphicon glyphicon-plus'></span> Ajouter une Tâche";
        read_tasks_html+="</div>";

        // start table
        read_tasks_html+="<table class='table table-bordered table-hover'>";

        // creating our table heading
        read_tasks_html+="<tr>";
        read_tasks_html+="<th class='w-10-pct'>Title</th>";
        read_tasks_html+="<th class='w-25-pct'>Description</th>";
        read_tasks_html+="<th class='w-15-pct'>User</th>";
        read_tasks_html+="<th class='w-10-pct'>Status</th>";
        read_tasks_html+="<th class='w-15-pct text-align-center'>Action</th>";
        read_tasks_html+="</tr>";

        // loop through returned list of data
        $.each(data.items, function(key, val) {

            // creating new table row per record
            read_tasks_html+="<tr>";

            read_tasks_html+="<td>" + val.title + "</td>";
            read_tasks_html+="<td>" + val.description + "</td>";
            read_tasks_html+="<td>" + val.user_id + "</td>";
            read_tasks_html+="<td>" + val.status + "</td>";

            // 'action' buttons
            read_tasks_html+="<td>";
            // read one task button
            read_tasks_html+="<button class='btn btn-primary m-r-10px read-one-task-button' task-id='" + val.id + "' user-id='" + user_id + "'>";
            read_tasks_html+="<span class='glyphicon glyphicon-eye-open'></span> Voir";
            read_tasks_html+="</button>";

            // delete button
            read_tasks_html+="<button class='btn btn-danger delete-task-button' task-id='" + val.id + "' user-id='" + user_id + "'>";
            read_tasks_html+="<span class='glyphicon glyphicon-remove'></span> Supprimer";
            read_tasks_html+="</button>";
            read_tasks_html+="</td>";

            read_tasks_html+="</tr>";

        });

        // end table
        read_tasks_html+="</table>";
        // inject to 'page-content' of our app
        $("#page-content").html(read_tasks_html);
        // chage page title
        changePageTitle("Gestion des Tâches");
    });
}
