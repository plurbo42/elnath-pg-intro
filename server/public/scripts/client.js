console.log('js loaded');

$(document).ready(onReady);

function onReady() {
    console.log('jquery has been loaded');
    getShoes();
    $('#MOREJORDANS').on('click', postShoes);
    $('#shoelist').on('click', '.deleteShoe', removeShoe);
};


function getShoes() {
    $.ajax({
        method: 'GET',
        url: '/shoes',
        success: function (response) {
            console.log('successful get shoes', response)
            $('#shoelist').empty();
            for (var i = 0; i < response.length; i++) {
                var currentShoe = response[i];
                $('#shoelist').append('<li class="shoeItem">' + currentShoe.name + ' cost: $' + 
                currentShoe.cost + '<button class="deleteShoe" data-id="' + currentShoe.id + '">Delete Shoe</button></li>');
            }
        }
    })
}

function postShoes() {
    $.ajax({
        method: "POST",
        url: '/shoes',
        data: {
            name: 'nike air jordan',
            cost: '110'
        },
        success: function (response) {
            console.log('response ', response);
            getShoes();
        }
    })
}

function removeShoe(){
    var shoeIdToRemove = $(this).data('id');
    console.log('clicked remove shoe, the shoe id was', shoeIdToRemove);
    $.ajax({
        method: 'DELETE',
        url: '/shoes/' + shoeIdToRemove,
        success: function(response) {
            getShoes();
        }

    })
}