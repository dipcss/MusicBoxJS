$(function () {

    /*function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    //usage:
    readTextFile("/db.json", function(text){
        var data = JSON.parse(text);
        console.log(data);
    });*/
    /*function renderSections(){
       var url = "db.json";         
        $.getJSON(url, function (data) {
            //data.myPlaylist=[];
            console.log(data);
            $.each(data, function (key, model) {
                    console.log(model);
                    const postContainer = createPostConteiner(model);
                    $('.app').append(postContainer);
            });
        });
    };*/

    createPostConteiner();
    ///////////////////////////////////////////////
    function createPostConteiner() {
        $('.playlist').fadeIn(700);
        $('.app').html('');
        var url = "db.json";
        $.getJSON(url, function (data) {
            $.each(data, function (key, model) {

                var post = $('<div/>', {
                    class: 'post'
                });
                $('.app').append(post);
                var mainPicture = $('<img>', {
                    class: 'picture',
                    src: model.imgUrl,
                    id: model._id,
                    click: function (event) {
                        const itemId = event.currentTarget.id;
                        $('.addToMyPlaylist').attr('id', itemId);
                        $('#modal').show();
                        ModalView(itemId);
                        //addItemToMyPlayList(itemId);
                        $('.addToMyPlaylist').click(function () {
                            const itemId = event.currentTarget.id;
                            addItemToMyPlayList(itemId);
                            $('#modal').hide();
                        });
                        $('#close_modal').click(function () {
                            zero=[];
                            $('#modal').hide();
                        });
                    }
                }).appendTo(post);
                var mainAuthor = $('<p/>', {
                    class: 'author',
                    text: model.author
                }).appendTo(post);
                var mainTitle = $('<h3/>', {
                    class: 'title',
                    text: model.title
                }).appendTo(post);
                /* var mainButton = $('<button/>', {
                     class: 'addToMyPlaylist',
                     html: '<i class="material-icons">star</i>'
                 }).appendTo(post);*/
            });
        });
    };
    ////////////////////////////////////////////////


    $('.PlayList').click(function () {
        $('.hotlist').hide();
        $('.myplaylist').hide();
        $('.playlist').fadeIn(700);
        createPostConteiner();
    });
    $('.HotList').click(function () {
        $('.playlist').hide();
        $('.myplaylist').hide();
        $('.hotlist').fadeIn(700);
        Hotlist();
    });
    $('.MyPlayList').click(function () {
        $('.playlist').hide();
        $('.hotlist').hide();
        $('.myplaylist').fadeIn(700);
        myPlayList();
    });

    var baza = [];
    var myplaylist = [];
    var zero=[];

    function ModalView(itemId) {
        var url = "db.json";
        $.getJSON(url, function (data) {
            $.each(data, function (key, model) {
                if (model._id == itemId) {
                    //baza.splice(-1, 0, this);
                    baza.push(this);
                    zero.push(this);
                    $('.modal_img').attr('src', model.imgUrl);
                    $('.modal_author').text(model.author);
                    $('.modal_title').text(model.title);
                    return false;
                };
            });
        });
    };

    function addItemToMyPlayList(itemId) {
       $.each(zero, function (key, model) {
            if (model._id == itemId) {
                myplaylist.push(this);
                zero=[];
                return false;
            };
        });
};


    function removeMyPlayList(itemId) {
            $.each(myplaylist, function (key, model) {
                if (model._id == itemId) {
                    var idxdel = myplaylist.indexOf(this);
                    myplaylist.splice(idxdel, 1);
                    myPlayList();
                    return false;
                };
            });
    };

    function removeHotList(itemId) {
            $.each(baza, function (key, model) {
                if (model._id == itemId) {
                    var idxdel = baza.indexOf(this);
                    baza.splice(idxdel, 1);
                    Hotlist();
                    return false;
                };
            });
    };

    function Hotlist() {
        $('.app').html('');
        $.each(baza, function (key, model) {
            var post = $('<div/>', {
                class: 'post'
            });
            $('.app').append(post);
            var mainPicture = $('<img>', {
                class: 'picture',
                src: model.imgUrl,
                id: model._id,
                click: function (event) {
                    const itemId = event.currentTarget.id;
                    removeHotList(itemId);
                }
            }).appendTo(post);
            var mainAuthor = $('<p/>', {
                class: 'author',
                text: model.author
            }).appendTo(post);
            var mainTitle = $('<h3/>', {
                class: 'title',
                text: model.title
            }).appendTo(post);
            /* var mainButton = $('<button/>', {
                 class: 'addToMyPlaylist',
                 html: '<i class="material-icons">star</i>'
             }).appendTo(post);*/
        });
    };

    function myPlayList() {
        $('.app').html('');
        $.each(myplaylist, function (key, model) {
            var post = $('<div/>', {
                class: 'post'
            });
            $('.app').append(post);
            var mainPicture = $('<img>', {
                class: 'picture',
                src: model.imgUrl,
                id: model._id,
                click: function (event) {
                    const itemId = event.currentTarget.id;
                    removeMyPlayList(itemId);
                }
            }).appendTo(post);
            var mainAuthor = $('<p/>', {
                class: 'author',
                text: model.author
            }).appendTo(post);
            var mainTitle = $('<h3/>', {
                class: 'title',
                text: model.title
            }).appendTo(post);
            /* var mainButton = $('<button/>', {
                 class: 'addToMyPlaylist',
                 html: '<i class="material-icons">star</i>'
             }).appendTo(post);*/
        });
    };


});