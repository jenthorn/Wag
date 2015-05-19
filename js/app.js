// Line 32 - Turn off sort to style swipe

var wag ={};

wag.apiKey='6ac20078901cea18218523b01b037eea';
wag.liked = [];

wag.location = function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		var location = $('input.location').val();
		var size = $('#size').val();
		var age =$('#age').val();
		wag.getData(location, size, age);
	});
};


// function that displays one dog
wag.displayDogs = function(data){
	$('header.intro').fadeOut();
	$.each(data, function(i, piece){
		var photo = piece.media.photos;
		var descript = piece.description;
		console.log(piece);
		if (photo != undefined && descript != undefined) {
			var name = $('<p>').addClass('dogName').text(piece.name.$t);
	 	var age = $('<p>').addClass('dogAge').text(piece.age.$t);
		var breed = $('<p>').addClass('breed').text(piece.breeds.breed.$t);
	 	var image = $('<img>').attr('src', piece.media.photos.photo[2].$t);
	 	var dogFile = $('<li>').addClass('dogFile').attr('data-dscrpt', piece.description.$t).append(image, name, age, breed);
	 	$('.deck').append(dogFile);
		}
	});
   wag.sortDogs();
};

wag.sortDogs = function() {
	$(".results").jTinder({
		// like callback
	    onLike: function(item) {
		    var index = item.index();
		    var list = $('ul.deck li');
		    var faved = list[index];
		    wag.liked.push({
		    	name: $(faved).find('p.dogName').text(),
		    	description: $(faved).data('dscrpt'),
		    	image: $(faved).find('img').attr('src')
		    });
		    wag.showLiked();
	    },
		animationRevertSpeed: 200,
		animationSpeed: 400,
		threshold: 1
	});
}



wag.showLiked = function() {
	$('.faveddogs').empty();
	$('input.view').on('click', function() {
		$('section.choices').fadeIn();
	});
	$.each(wag.liked, function(x, tail) {
		var choiceName = $('<p>').addClass('choiceName').text(tail.name);
		var choiceDescription = $('<p>').addClass('choiceDescription').text(tail.description);
		var choiceImg = $('<img>').attr('src', tail.image);
		var choice = $('<article>').append(choiceImg, choiceName, choiceDescription);
		$('.faveddogs').append(choice); 
	});
}



//start call getting data 
wag.getData = function(locationString, sizeString, ageString){
	$.ajax({
		url:'http://api.petfinder.com/pet.find',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			key: wag.apiKey,
			format: 'json',
			animal: 'dog',
			location: locationString,
			output: 'string',
			size: sizeString,
			count: 10,
			age: ageString 
		},
		success: function(response){
			//write a each loop for each item shows up in the results array
			wag.displayDogs(response.petfinder.pets.pet);
			//in each result run the function that displays the dog
		}
	});
}

wag.flickity = function() {
	var elem = document.querySelector('.gallery');
	var flkty = new Flickity( elem, {
	  cellAlign: 'center',
	  contain: true,
	  setGallerySize: false,
	  imagesLoaded: true,
	  wrapAround: true,
	  autoPlay: 5000,
	  prevNextButtons: false,
	  pageDots: false
	});
}

wag.init = function(){
	wag.flickity();
	wag.location();
};

$(function(){
	wag.init();
});


