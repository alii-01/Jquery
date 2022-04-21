$(document).ready(function () {

    $(".entries div").hide();
    $(".entry1").eq(0).show();
    $(".prev,.submit,.update,.cancel").hide();
    var x, length, i = 1, s = false;
    $(".tab button").eq(0).css({ "background-color": "wheat" })
    // datepicker
    $("#dob").datepicker({
        dateFormat: 'dd-mm-yy',
        maxDate: '-1d'
    }).on("change", function () {
        $(this).valid();
    })
    // disallowing keyboard on DOB
    $("#dob").on('keydown', function () {
        return false;
    });
    // masking for dob,number,zip,money,ipaddress
    $("#dob").inputmask()
    $("#number").inputmask({ mask: "9999999999" });
    $("#zip").inputmask("999-999");
    $("#money").inputmask({
        alias: "indianns",
        greedy: false
    })
    $("#ipadd").inputmask({
        alias: "ip",
        greedy: false
    });
    
    /*------------------for Nav-Tab---------------------*/

    $(".tab button").click(function () {
        x = $(this).index();
        length = $(".entries div").length;
        $(".entries div").hide();
        $(".entries div").eq(x).show();
        $(".tab button").css({ "background-color": "aliceblue" })
        $(".tab button").eq(x).css({ "background-color": "wheat" })
        if (x == 0) {
            $(".prev,.submit").hide();
            $(".save").show();
        }
        else if (length == x + 1) {
            $(".save").hide();
            $(".submit,.prev").show();
        }
        else {
            $(".save,.prev").show();
            $(".submit").hide();
        }
        editworking();
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
        length = $(".entries div").length;
        if (x == length - 1) {
            $(".save").hide();
            $(".submit").show();
        }
        $(".entries div").eq(x).show();
        $(".prev").show();
        editworking();
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
        editworking();
        $(".tab button").css({ "background-color": "white" })
        $(".tab button").eq(x).css({ "background-color": "wheat" })
    });

    // Create Regex Method
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },"Please check your input.");

    // Create Ipaddress Method
    $.validator.addMethod('IP4Checker', function (value) {
        return value.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
    }, 'Invalid IP address');

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

    /*-----------------Submit button---------------*/
    $("button.submit").click(function () {
        console.log($("#form").valid());
        if ($("#form").valid() == true) {
            value();
            details();
            $('#fname,#lname,#email,#number,#dob,#ipadd,#hours,#sports,#say,#zip,#money').val("");
            $('#tc').prop("checked", false);
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
            backroundnav();
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
            backroundnav();
        }
    });

    /*-----------------delete button----------------------*/
    $('table').on('click', '.dlt', function () {
  
        confirm("You sure?") ? $(this).closest("tr").remove():" ";
        $('table tr').each(function (x) {
            $($(this).find('td')[0]).html(x);
            x++;
            i = x;
        });
       
    });

    /*-------------------edit button--------------------*/
    /*-------------------set values --------------------*/
    $('table').on('click', '.edit', function () {
        $("button.dlt").attr("disabled", false);
        $(this).closest('tr').find('td').eq(15).find("button.dlt").attr("disabled", true);

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
        editworking();
        $(".error").text("").css({ "color": "black" });
    });

    /*-------------------for update--------------------*/
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
            $('#tc').prop("checked", false);
            $("button.dlt").attr("disabled", false);
            $(".update, .cancel").hide();
            $(".submit").show();
            s = false;
            editworking();
            $(".entries div").hide();
            $(".entries div").eq(0).show();
            $(".prev,.submit").hide();
            $(".save").show();
            x = 0;
            backroundnav();
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
            backroundnav();
        }
    });

    /*---------------cancel------------------------*/
    $('.cancel').click(function () {
        $("button.dlt").attr("disabled", false);
        $('#fname,#lname,#email,#number,#dob,#ipadd,#hours,#sports,#say,#zip,#money').val("");
        $('#tc').prop("checked", false);
        x = 0
        $(".update, .cancel, .prev").hide();
        $(".save").show();
        $(".entries div").hide();
        $(".entries div").eq(0).show();
        // $(".submit").show();
        s = false;
        editworking();
        backroundnav();
        return x;
    });

/*------------for checking navigation and edit is working properly or not--------------------*/
    function editworking() {
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

    // Seting nav-tab color
    function backroundnav() {
        $(".tab button").css({ "background-color": "aliceblue" });
        $(".tab button").eq(x).css({ "background-color": "wheat" });
    }
  
    // Validator
    $("#form").validate({
        ignore: [],
        rules: {
            email: {
                required: true,
                regex: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
            },
            fname: {
                required: true,
                regex: /^[a-zA-Z]+$/g
            },
            lname: {
                required: true,
                regex: /^[a-zA-Z]+$/g
            },
            number: {
                required: true, 
                regex: /^[0-9]{10}$/,
            },
            ipadd: {
                required: true,
                IP4Checker: true
            },
            dob: {
                required: true,
            },
            say: {
                required: true,
                regex: /^[a-zA-Z0-9]/g
            },
            hours: {
                required: true,
                range: [1, 24]
            },
            zip: {
                required: true,
                regex: /^\d{3}[-\s]?(?:\d{3})?$/gm
            
            },
            money: {
                required: true
            },
            tc:{
                required:true
            }
        },
        messages: {
            fname: "please enter your name",
            lname: "please enter your last name",
            email:{regex: "Enter valid email"}  ,
            number:{ regex:"Enter valid number"},
            zip:{
                regex: "Enter correct zip"
            },
            dob:"please enter your BirthDate",
            hours: "Enter hours between 1-24",
            tc: "Agree to our Terms and conditions"
        }
    });
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




