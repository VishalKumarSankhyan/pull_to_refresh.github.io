mobile_app_body = document.querySelector('.mobile_app_body');
refresher = document.querySelector('.refresher');
loading_bar = document.querySelectorAll('.loading_bar');
var other_function_active = false;
var scroll_active = false;
var scroll_stop_timer;
var p_current_y = null;
var p_start_y = null;
var changeY = null;
/*-------------------------------------------------- scrollstart --------------------------------------------------*/
mobile_app_body.addEventListener('scroll', function () {
    scroll_active = true;
})
/*-------------------------------------------------- scrollend --------------------------------------------------*/
mobile_app_body.addEventListener('scroll', function () {
    clearTimeout(scroll_stop_timer);
    scroll_stop_timer = setTimeout(function () {
        scroll_active = false;
    }, 400);
})
/*-------------------------------------------------- close refresh --------------------------------------------------*/
function refresh_close() {
    refresher.style.transform = 'translateY(-100px)';
    refresher.style.transitionDuration = 350 + 'ms';
    mobile_app_body.classList.remove('refresh_loading')
    mobile_app_body.style.overflow = '';
    document.body.style.overflow = '';
}
/*-------------------------------------------------- open refresh --------------------------------------------------*/
function refresh_open() {
    refresher.style.transitionDuration = 350 + 'ms';
    refresher.style.transform = 'translateY(45px)';
    mobile_app_body.classList.add('refresh_loading')
    mobile_app_body.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    for (let i = 0; i < loading_bar.length; i++) {
        loading_bar[i].classList.add('loading_prgrass')
    }
    setTimeout(function () {
        for (let i = 0; i < loading_bar.length; i++) {
            loading_bar[i].classList.remove('loading_prgrass')
        }
        refresh_close()
    }, 3000)
}
/*-------------------------------------------------- move refresh --------------------------------------------------*/
function refresh_move(RefreshY) {
    mobile_app_body.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    refresher.style.transitionDuration = 0 + 'ms';
    refresher.style.transform = "translate3d(" + 0 + "px, " + RefreshY + "px, 0)";
}
/*-------------------------------------------------- touchstart --------------------------------------------------*/
mobile_app_body.addEventListener('touchstart', function (event) {
    if (mobile_app_body.scrollTop === 0 && scroll_active == false && other_function_active == false) {
        if (event.type === "touchstart") {
            let touch = event.touches[0];
            p_start_y = touch.clientY;
        }
    }
})
/*-------------------------------------------------- touchmove --------------------------------------------------*/
mobile_app_body.addEventListener('touchmove', function (event) {
    if (mobile_app_body.scrollTop === 0 && scroll_active == false && other_function_active == false) {
        if (event.type === "touchmove") {
            let touch = event.touches[0];
            p_current_y = touch.clientY;
        }
        changeY = p_start_y < p_current_y ? Math.abs(p_current_y - p_start_y) : 0;
        // move refresh
        if (changeY == 0) { }
        else if(changeY>(document.body.clientHeight/2)){ }
        else {
            refresh_move(changeY)
        }
    }
})
/*-------------------------------------------------- touchend --------------------------------------------------*/
document.body.addEventListener('touchend', function (event) {
    if (mobile_app_body.scrollTop === 0 && scroll_active == false && other_function_active == false) {
        if (event.type === "touchend") {
            if (changeY == 0) { 
                refresh_close()
            }
            else {
                if (changeY > 100) {
                    refresh_open()
                }
                else if (changeY < 100) {
                    refresh_close()
                }
            }
        }
    }
})
