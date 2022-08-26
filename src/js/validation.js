import $ from 'jquery';
import validate from "jquery-validation";

$(function () {
	//validate form
	const form = $('.js-form');
	$.validator.messages.required = 'Заполните поле';
	form.each(function(){
		let thisForm = $(this);
		thisForm.validate({
			highlight: function(element) {
				$(element).parent('.js-input').addClass('form-field--error');
			},
			unhighlight: function(element) {
				$(element).parent('.js-input').removeClass('form-field--error');
			},
			submitHandler: function(form, event){
				event.preventDefault();
				const data = new FormData();
				const formParams = thisForm.serializeArray();

				$.each(formParams, function(i, val) {
					data.append(val.name, val.value);
				});

				data.append('key', 'value');

				/* ******* */
				$.ajax({
					url: thisForm[0].action,
					type: 'POST',
					processData: false,
					contentType: false,
					data: data,
					beforeSend: function (data) {
						thisForm.find('button').attr('disabled', 'disabled');
					},
					success: function (data) {
						if (data['error']) {
							console.log('error');
						} else {
							thisForm[0].reset();
							$('.js-success').fadeIn();
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.status);
						console.log(thrownError);
					}
				});
				return false;
			}
		});

		const agree = $('.js-agreement');
		if (agree.length) {
			if (agree.is(':not(:checked)')) {
				thisForm.find('button').prop('disabled', true);
			}
		}

		agree.on('change',function () {
			if (agree.is(':checked')) {
				thisForm.find('button').prop('disabled', false);
			} else {
				thisForm.find('button').prop('disabled', true);
			}
		});

	});
});
