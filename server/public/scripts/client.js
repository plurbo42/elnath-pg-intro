console.log('js loaded');

$(document).ready(onReady);

function onReady(){
    console.log('jquery has been loaded')
    $.ajax({
        method: "POST",
        url: '/shoes',
        data: {
            name: 'nike air jordan',
            cost: '110'
        },
        success: function(response){
            console.log('response ', response)
        }
    })
};

