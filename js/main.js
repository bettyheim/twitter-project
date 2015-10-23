$(function () {

	var user = {
		handle: '@bradwestfall',
		img: 'images/brad.png'
	};

	var number = 140;

	var renderTweet = function (user, message) {
		var tweetTmpl = $('#template-tweet').text();
		var createTweet = Handlebars.compile(tweetTmpl);
		return createTweet({
			img: user.img,
			title: user.handle,
			message: message
		});
	};

	var renderCompose = function () {
		var composeTmpl = $('#template-compose').text();
		var createCompose = Handlebars.compile(composeTmpl);
		return createCompose;
	};

	var renderThread = function (user, message) {
		var threadTmpl = $('#template-thread').text();
		var createThread = Handlebars.compile(threadTmpl);
		$('.tweets').append(createThread({
			tweetTemp: renderTweet(user, message),
			compose: renderCompose()
		}));
	};

	$('main').on('click', 'textarea', function () {
		$(this).parents('form').toggleClass('expand');
	});

	$('.tweets').on('click', '.tweet', function () {
		$(this).parent('.thread').toggleClass('expand');
	});

	$('main').on('submit', 'form.compose', function () {
		var message = $(this).find('textarea').val();
		$(this).toggleClass('expand');
		$(this).find('.count').text('140');
		$(this).find('textarea').val('');

		if ($(this).parent('header').length) {
			renderThread(user, message);
		} else {
			$(this).parents('.replies').append(renderTweet(user, message));
		}

		return false;
	});

	$('textarea').on('keyup', function () {
		$(this).parent().find('.count').text(--number)
	});

});

