        $(document).ready(function () {
            $('.resume,.restart').hide();
            // $('.restart').hide();
            $(".tag h4").hide();
            $('.stop,.pause').attr('disabled', true);
            // $('.pause').attr('disabled', true);
            var timer;
            var hours = 0;
            var minutes = 0;
            var sec = 0;
            var csec = 0;

/*--------------------------Start-------------------------------------*/

            $('.start').click(function () {
                hours = 0,minutes =59,sec =50, cesc =0;
                //    console.log(minutes);
                startTimer();
                $('.start').attr('disabled', true);
                $(".tag h4").eq(0).show().css({ "color": "green" });
                $(".hit").hide();
                $('.pause,.stop').attr('disabled', false);
                // $('.stop').attr('disabled', false);
            });

/*--------------------------Stop-------------------------------------*/

            $('.stop').click(function () {
                $(".start,.resume").hide();
                // $(".resume ").hide();
                $(".restart").show();
                $(".tag h4").hide();
                $(".tag h4").eq(1).show().css({ "color": "red" });
                $(".tag .stopped").show().prepend("<h3>Stop at " + hours + "HH, " + minutes + "MM, " + sec + "SS").css({ "color": "red" });
                $('.pause,.stop').attr('disabled', true);
                // $('.stop').attr('disabled', true);
                clearInterval(timer);
            });

/*--------------------------Reset-------------------------------------*/

            $('.reset').click(function () {
                $("th").text(0);
                csec = 0;
                clearInterval(timer);
                $('.start,.hit').show();
                $('.restart,.resume').hide();
                // $('.resume').hide();
                $('.start').attr('disabled', false);
                $('.stop,.pause').attr('disabled', true);
                $(".tag h3").empty();
                $(".tag h4").hide();
                // $(".hit").show();
            });

/*--------------------------Pause-------------------------------------*/

            $('.pause').click(function () {
                $('.resume').show();
                $('.start,.restart').hide();
                // $('.restart').hide();
                $(".pause").attr('disabled', true);
                $(".tag h4").hide();
                $(".tag h4").eq(2).show().css({ "color": "orange" });
                $(".tag .pause").show().prepend("<h3>pause at " + hours + "HH, " + minutes + "MM, " + sec + "SS").css({ "color": "orange" });
                clearInterval(timer);
            });

/*--------------------------Resume-------------------------------------*/

            $('.resume').click(function () {
                startTimer();
                $('.resume,.hit').hide();
                $('.start').show();
                $('p').eq(0).show();
                // $(".hit").hide();
                $(".tag h4").hide();
                $(".tag h4").eq(0).show();
                $('.pause').attr('disabled', false);
            });

/*--------------------------Restart-------------------------------------*/

            $('.restart').click(function () {
                hours = minutes = sec = cesc =0;
                startTimer();
                $('.start').show();
                $('.restart,.hit').hide();
                // $(".hit").hide();
                $(".tag .pause").empty();
                $(".tag .stopped").empty();
                $('.pause').attr('disabled', false);
                $('.stop').attr('disabled', false);
                $(".tag h4").eq(0).show().css({ "color": "green" });
                $(".tag h4").eq(1).hide();
            });

/*--------------------------Function-------------------------------------*/

            function startTimer() {
                timer = setInterval(function () {
                    csec++;
                    if (csec > 99) {
                        csec = 0;
                        sec++;
                        if (sec > 59) {
                            sec = 0;
                            minutes++;
                            if (minutes > 59) {
                                minutes = 0
                                hours++;
                            }
                        }
                    }
                    $("th").eq(0).text(hours);
                    $("th").eq(1).text(minutes);
                    $("th").eq(2).text(sec);
                    $("th").eq(3).text(csec);
                }, 10);
            }
        });
        