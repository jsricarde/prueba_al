function ajaxRequest(service, method, data, callback) {
    var url_load = '';
    if (data) {
        url_load = 'http://api.themoviedb.org/3/' + service + '/' + method + '?api_key=e057efdb0f878c0989768d1a12ddd8f5&query=' + data + '&language=es';

    } else {
        url_load = 'http://api.themoviedb.org/3/' + service + '/' + method + '?api_key=e057efdb0f878c0989768d1a12ddd8f5&language=es';

    }
    $.ajax({
        type: "GET",
        url: url_load,
        dataType: "json",
//        data: data,
        success: function (r) {
            if (callback) {
                callback(r);
            }

            if (r.callback) {
                window[r.callback](r);
            }
        },
        failure: function (errMsg) {
            console.log("Failure");
        },
        error: function (x, t, m) {
            console.log("Error");
        }
    });

}

function loadMovies(data) {
    var ul_positions = '';
    ul_positions += '<ul class="media-list">';
    var title = '';
    var id = '';
    var poster_img = '';
    var overview = '';
    $.each(data.results, function (k, v) {
        title = v.title;
        id = v.id;
        poster_img = v.backdrop_path;
        overview = v.overview;
        console.log(v.title);
        if (poster_img) {
            ul_positions += '<li class="media">';
            ul_positions += '<div class="media-left">';
            ul_positions += '<a href="#" class="add_open_modal_movie" id="' + id + '">';
            ul_positions += '<img class="media-object" style="width:185px;" src="https://image.tmdb.org/t/p/w185' + poster_img + '">';
            ul_positions += '</a>';
            ul_positions += '</div>';
            ul_positions += '<div class="media-body">';
            ul_positions += '<h4 class="media-heading" id="media-heading">' + title + '</h4>';
            if (overview) {
                ul_positions += '<p>' + overview + '</p>';
            }
            ul_positions += '<a href="#" class="add_open_modal_movie" id="' + id + '">Ver más</a><br>';
            ul_positions += '</div>';
            ul_positions += '</li>';
        }


    });
    ul_positions += '</ul>';
    $("#load_movies").empty();
    $("#load_movies").html(ul_positions);
    $(".add_open_modal_movie").click(function () {
        var id_movie = $(this).attr('id');
        console.log($(this).attr('id'));
        ajaxRequest("movie", id_movie, null, openDetailMovie);

    });
}

function loadActors(data) {
    console.log(data);
    var ul_positions = '';
    ul_positions += '<ul class="media-list">';
    var title = '';
    var id = '';
    var poster_img = '';
    var overview = '';
    var know_for;
    var block_know;
    $.each(data.results, function (k, v) {
         title = v.name;
         id = v.id;
         poster_img = v.profile_path;
         overview = v.popularity;
         know_for = v.known_for;
         block_know = '';
//        console.log(v.title);
        block_know += '<p>';
        if (know_for) {
            $.each(know_for, function (x, y) {
                var img_block = y.backdrop_path;
                var title_block = y.title;
                if (img_block) {
                    block_know += '<div style="display:inline-block; margin:10px;"><img class="img-responsive" style="width:150px;" src="https://image.tmdb.org/t/p/w185' + img_block + '"><span>' + title_block + '<span></div>';

                }
                console.log(y.original_title);
            });
        }
        block_know += '</p>';

        if (poster_img) {
            ul_positions += '<li class="media">';
            ul_positions += '<div class="media-left">';
            ul_positions += '<a href="#" class="add_open_modal" id="' + id + '">';
            ul_positions += '<img class="media-object" style="width:185px;" src="https://image.tmdb.org/t/p/w185' + poster_img + '">';
            ul_positions += '</a>';
            ul_positions += '</div>';
            ul_positions += '<div class="media-body">';
            ul_positions += '<h4 class="media-heading" id="media-heading">' + title + '</h4>';
            ul_positions += '<a href="#" class="add_open_modal" id="' + id + '">Ver más</a><br>';

            if (overview) {
                ul_positions += '<p>Popularidad: ' + overview + '</p>';
                if (know_for) {
                    ul_positions += '<b>Actuaciones : </b><br>' + block_know;

                }
            }
            ul_positions += '</div>';
            ul_positions += '</li>';
        }


    });
    ul_positions += '</ul>';
    $("#load_actors").empty();
    $("#load_actors").html(ul_positions);
    $(".add_open_modal").click(function () {
        var id_actor = $(this).attr('id');
        console.log($(this).attr('id'));
        ajaxRequest("person", id_actor, null, openDetailActor);

    });
}

function openDetailActor(data) {
    console.log(data);
    var text_modal = '';
    var name = data.name;
    var poster_img_detail = data.profile_path;
    var bio = data.biography;
    var place_of_birth = data.place_of_birth;
    var birthday = data.birthday;
    text_modal += '<p><b>Fecha de nacimiento : </b>' + birthday + ' </p><br>';
    text_modal += '<p><b>Lugar de Nacimiento : </b>' + place_of_birth + '</p><br>';
    text_modal += '<p><b>Biografia : </b>' + bio + '</p>';
    $("#modalDetail .modal-title").html('');
    $("#modalDetail .modal-title").html(name);
    $("#modalDetail .modal-body .imagen").html('');
    $("#modalDetail .modal-body .texto").html('');
    $("#modalDetail .modal-body .texto").html(text_modal);
    $("#modalDetail .modal-body .imagen").html('<img src="https://image.tmdb.org/t/p/w185' + poster_img_detail + '">');

    $("#modalDetail").modal('show');


}

function openDetailMovie(data) {
    console.log(data);
    var text_modal = '';
    var name = data.title;
    var poster_img_detail = data.poster_path;
    var popularity = data.popularity;
    var overview = data.overview;
    var release_date = data.release_date;
    var vote_average = data.vote_average;
    var status = data.status;
    text_modal += '<p><b>Votación : </b>' + vote_average + ' </p><br>';
    text_modal += '<p><b>Estado : </b>' + status + ' </p><br>';
    text_modal += '<p><b>Fecha de Lanzamiento : </b>' + release_date + ' </p><br>';
    text_modal += '<p><b>Popularidad : </b>' + popularity + '</p><br>';
    text_modal += '<p><b>Intro : </b>' + overview + '</p>';
    $("#modalDetailM .modal-title").html('');
    $("#modalDetailM .modal-title").html(name);
    $("#modalDetailM .modal-body .imagen").html('');
    $("#modalDetailM .modal-body .texto").html('');
    $("#modalDetailM .modal-body .texto").html(text_modal);
    $("#modalDetailM .modal-body .imagen").html('<img src="https://image.tmdb.org/t/p/w185' + poster_img_detail + '">');

    $("#modalDetailM").modal('show');


}


