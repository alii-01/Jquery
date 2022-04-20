$(document).ready(function () {
    $(".entries div").hide();
    $(".entry1").eq(0).show();
    $(".prev,.submit,.update,.cancel").hide();
    var x, length, i = 1, s = false;
    $(".tab button").eq(0).css({ "background-color": "wheat" })
    $("#dob").datepicker({
        dateFormat: 'dd-mm-yy',
        maxDate: '-1d',
    })
    $("#number").inputmask({mask: "999 999 9999"});
    $("#zip").inputmask("999-999");
    $("#money").inputmask({
        alias : "indianns",
        greedy:false
    })
    $("#ipadd").inputmask({
        alias:"ip",
        greedy:false
    });

    /*------------------for Nav-Tab---------------------*/

    $(".tab button").click(function () {
        x = $(this).index();
        length = $(".entries div").length;
        $(".entries div").hide();
        $(".entries div").eq(x).show();
        // console.log(length);
        $(".tab button").css({ "background-color": "white" })
        $(".tab button").eq(x).css({ "background-color": "wheat" })
        if (x == 0) {
            // console.log(x);
            $(".prev,.submit").hide();
            $(".save").show();
        }
        else if (length == x + 1) {
            // console.log(x);
            $(".save").hide();
            $(".submit,.prev").show();
        }
        else {
            // console.log(x);
            $(".save,.prev").show();
            $(".submit").hide();
        }

        boolean();
    });

    /*------------------for save and next button---------------------*/

    $("button.save").click(function () {
        $(".entries div").hide();
        if (x == null) {
            $(".tab button").css({ "background-color": "white" })
            $(".tab button").eq(x).css({ "background-color": "wheat" })
            x = 0;
        }
        x++;

        // console.log(x)
        length = $(".entries div").length;
        if (x == length - 1) {
            $(".save").hide();
            $(".submit").show();
        }
        $(".entries div").eq(x).show();
        $(".prev").show();
        boolean();
        $(".tab button").css({ "background-color": "white" })
        $(".tab button").eq(x).css({ "background-color": "wheat" })
    });

    /*----------------for previous-----------------------*/

    $("button.prev").click(function () {
        $(".entries div").hide();
        x--;
        if (x == 0) {
            $(".prev").hide();
        }
        $(".entries div").eq(x).show();
        $(".save").show();
        $(".submit").hide();
        boolean();
        $(".tab button").css({ "background-color": "white" })
        $(".tab button").eq(x).css({ "background-color": "wheat" })
    });

    // Create Regex Method
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Validator
    $("#form").validate({
        ignore: [],
        rules: {
            email: {
                required: true,
                email: true
                // regex: /^[a-zA-Z]+[@][a-zA-Z]+[.][a-z]+$/
            },
            fname: {
                required: true,
                regex: /^[a-zA-Z]/g
            },
            lname: {
                required: true,
                regex: /^[a-zA-Z]/g
            },
            gender: {
                required: true
            },
            number: {
                required: true,
            },
            ipadd: {
                required: true,
            },
            dob: {
                required: true,
                // regex: "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$"
            },
            say: {
                required: true,
                regex: /^[a-zA-Z]/g
            },
            hours: {
                required: true,
                range: [1, 24]
            },
            zip: {
                required: true
            },
            money: {
                required: true
            }
        },
        messages: {
            fname: "please enter your name",
            lname: "please enter your last name",
            email: "Enter valid email",
            hour: "Enter hours between 1-24"
        }
    });

    /*-----------------Submit button---------------*/

    $("button.submit").click(function () {
        console.log($("#form").valid());
        if ($("#form").valid() == true) {
            value();
            details();
            $('#fname,#lname,#email,#number,#dob,#ipadd,#hours,#sports,#say,#zip,#money').val("");
            $('#female,#male,#tc').prop("checked", false);
            $(".entries div").hide();
            $(".entries div").eq(0).show();
            $(".prev,.submit").hide();
            $(".save").show();
            $('table tr').each(function (x) {
                $($(this).find('td')[0]).html(x);
                x++;
                i = x;
            });
            x = 0;
            $(".tab button").css({ "background-color": "white" });
            $(".tab button").eq(x).css({ "background-color": "wheat" });
        }
        else {
            length = $(".entries div").length;
            var indexx = $(".entries div").has('input.error, textarea.error').eq(0).index();
            $(".entries div").hide();
            $(".entries div").has('input.error, textarea.error').eq(0).show()
            if (indexx == 0) {
                $(".save").show();
                $(".prev,.submit").hide();
            }
            else if (indexx + 1 == length) {
                $(".submit,.prev").show();
                $(".save").hide();
            }
            else {
                $(".save,.prev").show();
                $(".submit").hide();
            }
            x = indexx;
            $(".tab button").css({ "background-color": "white" });
            $(".tab button").eq(x).css({ "background-color": "wheat" });
            $(".error").text().css({"color":"red"});

        }
    });

    /*----------------function to append values-----------------------*/

    function details() {
        $("table").append(`<tr>
        <td class = "serial">${i}</td>
        <td>${fname}</td>
        <td>${lname}</td>
        <td>${gender}</td>
        <td>${email}</td>
        <td>${number}</td>
        <td>${dob}</td>
        <td>${ipadd}</td>
        <td>${hours}</td>
        <td>${sports}</td>
        <td>${say}</td>
        <td>${zip}</td>
        <td>${money}</td>
        <td>${tc}</td>
        <td><button type="button" value="edit" class="edit">Edit</button></td>
        <td><button type="button" value="dlt" class="dlt">Delete</button></td>
         </tr>`);
        i++;
    }

    /*-----------------delete button----------------------*/

    $('table').on('click', '.dlt', function () {
        $(this).closest('tr').remove();
        $('table tr').each(function (x) {
            $($(this).find('td')[0]).html(x);
            x++;
            i = x;
        });
    });

    /*-------------------edit button--------------------*/
    /*-------------------set values --------------------*/

    $('table').on('click', '.edit', function () {
        i = $(this).closest('tr').find('td').eq(0).text();
        fname = $(this).closest('tr').find('td').eq(1).text();
        lname = $(this).closest('tr').find('td').eq(2).text();
        gender = $(this).closest('tr').find('td').eq(3).text();
        email = $(this).closest('tr').find('td').eq(4).text();
        number = $(this).closest('tr').find('td').eq(5).text();
        dob = $(this).closest('tr').find('td').eq(6).text();
        ipadd = $(this).closest('tr').find('td').eq(7).text();
        hours = $(this).closest('tr').find('td').eq(8).text();
        sports = $(this).closest('tr').find('td').eq(9).text();
        say = $(this).closest('tr').find('td').eq(10).text();
        zip = $(this).closest('tr').find('td').eq(11).text();
        money = $(this).closest('tr').find('td').eq(12).text();
        tc = $(this).closest('tr').find('td').eq(13).text();
        $('#fname').val(fname);
        $('#lname').val(lname);
        if (gender == "Female") {
            $("#female").prop("checked", true);
        }
        else if (gender == "Male") {
            $("#male").prop("checked", true);
        }
        $('#email').val(email);
        $('#number').val(number);
        $('#dob').val(dob);
        $("#ipadd").val(ipadd);
        $('#hours').val(hours);
        $('#sports').val(sports);
        $('#say').val(say);
        $("#zip").val(zip);
        $("#money").val(money);
        $('#tc').val(tc);
        if (tc == "Agree") {
            $("#tc").prop("checked", true);
        }
        else {
            $("#tc").prop("checked", false);
        }
        $(".update,.cancel").show();
        s = true;
        boolean();
        $(".error").text("").css({"color":"black"});
        // $(".error").hide();
        
    });

    /*-------------------for update--------------------*/
    /*--------------------change value -------------------*/

    $('.update').click(function () {
        if ($("#form").valid() == true) {
            value();
            $('tr').find(`.serial:contains(${i})`).siblings().eq(0).text(fname);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(1).text(lname);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(2).text(gender);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(3).text(email);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(4).text(number);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(5).text(dob);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(6).text(ipadd);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(7).text(hours);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(8).text(sports);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(9).text(say);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(10).text(zip);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(11).text(money);
            $('tr').find(`.serial:contains(${i})`).siblings().eq(12).text(tc);
            $('#fname,#lname,#email,#number,#dob,#ipadd,#hours,#sports,#say,#zip,#money').val("");
            $('#female,#male,#tc').prop("checked", false);
            $(".update, .cancel").hide();
            $(".submit").show();
            s = false;
            boolean();
            $(".entries div").hide();
            $(".entries div").eq(0).show();
            $(".prev,.submit").hide();
            $(".save").show();
            x = 0;
            $(".tab button").css({ "background-color": "white" });
            $(".tab button").eq(x).css({ "background-color": "wheat" });
        }
        else {
            length = $(".entries div").length;
            var indexx = $(".entries div").has('input.error, textarea.error').eq(0).index();
            $(".entries div").hide();
            $(".entries div").has('input.error, textarea.error').eq(0).show()

            if (indexx == 0) {
                $(".save").show();
                $(".prev,.submit,.cancel,.update").hide();
            }
            else if (indexx + 1 == length) {
                $(".prev").show();
                $(".save,.submit").hide();
            }
            else {
                $(".save,.prev").show();
                $(".submit,.cancel,.update").hide();
            }
            x = indexx;
            $(".tab button").css({ "background-color": "white" });
            $(".tab button").eq(x).css({ "background-color": "wheat" });
        }
    });

    /*---------------cancel------------------------*/

    $('.cancel').click(function () {

        $('#fname,#lname,#email,#number,#dob,#sports,#say').val("");
        $('#female,#male,#tc').prop("checked", false);
        $(".update, .cancel").hide();
        $(".submit").show();
        s = false;
        boolean();
    });
    function boolean() {
        if (s == true) {
            if (length == x + 1) {
                $(".update,.cancel").show();
                $(".save,.submit").hide();
            }
            else {
                $(".update,.cancel").hide();
                $(".save").show();
            }
        }
    }
    function value() {
        fname = $('#fname').val();
        lname = $('#lname').val();
        gender = $('#gender').val();
        email = $('#email').val();
        gender = ($('#female').is(":checked") || $('#male').is(":checked")) ? ($("#female").is(':checked') ? 'Female' : 'Male') : "null";
        number = $('#number').val();
        dob = $('#dob').val();
        ipadd = $('#ipadd').val();
        hours = $('#hours').val();
        sports = $('#sports').val();
        say = $('#say').val();
        zip = $('#zip').val();
        money = $('#money').val();
        if ($("#tc").is(":checked")) {
            tc = "Agree";
        }
        else {
            tc = "Disagree";
        }
    }
});

    // $("#fname").click(function () {
    //     $("#fname").attr("placeholder", "").placeholder();
    // });
    // $("#lname").click(function () {
    //     $("#lname").attr("placeholder", "").placeholder();
    // });
    // $("#email").click(function () {
    //     $("#email").attr("placeholder", "").placeholder();
    // });
    // $("#number").click(function () {
    //     $("#number").attr("placeholder", "").placeholder();
    // });
    // $("#say").click(function () {
    //     $("#say").attr("placeholder", "").placeholder();
    // });




