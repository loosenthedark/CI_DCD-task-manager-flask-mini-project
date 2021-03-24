$(document).ready(function () {
    $('.sidenav').sidenav({ edge: 'right' });
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
    $('select').formSelect();
    $('.datepicker').datepicker({
        format: "dd mmmm, yyyy",
        yearRange: 3,
        showClearBtn: true,
        i18n: {
            done: "Select"
        }
    });

    // Custom jQuery & JavaScript code for validation of Materialize form select elements
    validateMaterializeSelect();
    function validateMaterializeSelect() {
        let classValid = { "border-bottom": "1px solid #4caf50", "box-shadow": "0 1px 0 0 #4caf50" };
        let classInvalid = { "border-bottom": "1px solid #f44336", "box-shadow": "0 1px 0 0 #f44336" };
        if ($("select.validate").prop("required")) {
            $("select.validate").css({ "display": "block", "height": "0", "padding": "0", "width": "0", "position": "absolute" });
        }
        $(".select-wrapper input.select-dropdown").on("focusin", function () {
            $(this).parent(".select-wrapper").on("change", function () {
                if ($(this).children("ul").children("li.selected:not(.disabled)").on("click", function () { })) {
                    $(this).children("input").css(classValid);
                }
            });
        }).on("click", function () {
            if ($(this).parent(".select-wrapper").children("ul").children("li.selected:not(.disabled)").css("background-color") === "rgba(0, 0, 0, 0.03)") {
                $(this).parent(".select-wrapper").children("input").css(classValid);
            } else {
                $(".select-wrapper input.select-dropdown").on("focusout", function () {
                    if ($(this).parent(".select-wrapper").children("select").prop("required")) {
                        if ($(this).css("border-bottom") != "1px solid rgb(76, 175, 80)") {
                            $(this).parent(".select-wrapper").children("input").css(classInvalid);
                        }
                    }
                });
            }
        });
    }

    $('select#category_name_edit').parent('.select-wrapper').children('input').css({ "color": "#d1d1d1" });
    $('select#category_name_edit').parent('.select-wrapper').children('input').focus( function() {
        $(this).css("color","black");
    });
    
    $('#edit_task_form #task_name, #edit_task_form #task_description, #edit_task_form #due_date, #edit_category_form #category_name').css({ "color": "#d1d1d1" });
    $('#edit_task_form #task_name, #edit_task_form #task_description, #edit_task_form #due_date, #edit_category_form #category_name').focus( function() {
        $(this).css("color","black");
    });
});