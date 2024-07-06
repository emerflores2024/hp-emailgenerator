$(document).ready(function(){
    $('select').formSelect();
    $('.modal').modal();

    // Check if agent's name has been already set
    if (localStorage.getItem("name")){
        $("#nav-mobile").html('<li>Hello, ' + localStorage.getItem("name") + ' <a style="width: fit-content; font-size: 14px; font-family: Quicksand, sans-serif;" class="btn-small btn-flat modal-trigger" id="change_name" href="#modal1"><i style="color: #eeeeee!important" class="material-icons">edit</i></a></li>');
    }
    else{
        $("#nav-mobile").html('<li><a style="width: fit-content; font-size: 14px; font-family: Quicksand, sans-serif; color: #eeeeee;" class="btn-small btn-flat modal-trigger" id="change_name" href="#modal1">Set my name</a></li>');
    }
    
    // Event of "set name" button
    $("#set-name-button").click(function(){
        localStorage.setItem("name", $('#set_agent_name').val());
        $("#nav-mobile").html('<li>Hello, ' + localStorage.getItem("name") + ' <a style="width: fit-content; font-size: 14px; font-family: Quicksand, sans-serif; color: #eeeeee" class="btn-small btn-flat modal-trigger" id="change_name" href="#modal1"><i class="material-icons">edit</i></a></li>');
        $("#modal1").modal('close');
    });

    // Event of "generate" button
    $("#action_button").click(function (event){
        $("#form_details").submit(function(e){
            var template = $("#template_select").val();
            if(!template){
                M.toast({html: '<i class="material-icons left">priority_high</i>Please select a template', classes: 'error-toast'});
            }
            else if(!localStorage.getItem("name")){
                M.toast({html: '<i class="material-icons left">priority_high</i>Please set your name first', classes: 'error-toast'});
            }
            else{
                $("#email-container").load(template + '.html', function(){
                    $(".customer_name_template").text($("#customer_name").val());
                    $(".case_number_template").text($("#case_number").val());
                    $(".agent_name_template").text(localStorage.getItem("name"));
                    $(".order_number_template").text($("#order_number").val());
                    $(".escalation_resolution_template").text($("#escalation_resolution").val());
                });
                $("#reset-button").prop("hidden", false);
            };
            e.preventDefault();
            M.toast.dismissAll();
        });
    });

    // Function to copy email content to clipboard
    $(document).on('click', ".copy-content-link", function(){
        const content = document.getElementsByClassName('email-content-container')[0].innerHTML;
        const blob = new Blob([content], {type: 'text/html'});
        const clipboardItem = new window.ClipboardItem({'text/html': blob});
        navigator.clipboard.write([clipboardItem]).then(
            M.toast({html: '<i class="material-icons left">check</i>Succesfully copied to clipboard', classes: 'custom-toast'})
        );
    });

    // Function to copy subject content to clipboard
    $(document).on('click', ".copy-subject-link", function(){
        var content = $('#email-container').find(".template-subject-content").text();
        navigator.clipboard.writeText(content).then(
            M.toast({html: '<i class="material-icons left">check</i>Succesfully copied to clipboard', classes: 'custom-toast'})
        );
    });

    // Function for reset button
    $("#reset-button").click(function(){
        $("#email-container").html("<p>Your template will show here</p>");
        $("#form_details")[0].reset();
        $("#reset-button").prop("hidden", true);
    });


    // Function to add order field when template select is change
    $("#template_select").change(function(){
        if($(this).val() == "replacement_confirmation"){
            $("#order_number_field").prop("hidden", false);
            $("#order_number").prop("required", true);
        }else{
            $("#order_number_field").prop("hidden", true);
            $("#order_number").prop("required", false);
        };
      });

    // Function to add resolution field when template select is change
    $("#template_select").change(function(){
        if($(this).val() == "escalation_resolution"){
            $("#resolution_field").prop("hidden", false);
            $("#escalation_resolution").prop("required", true);
        }else{
            $("#resolution_field").prop("hidden", true);
            $("#escalation_resolution").prop("required", false);
        };
      });
});