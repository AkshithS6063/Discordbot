const POST_URL =
  'https://discord.com/api/webhooks/891592414077255771/-2TUQddB9n4CpVEp1F1DNDzbLaVDU_RqEzPyZzuPbKuJYM15vFZBbUIdhBCgD33yGkxt';

function onSubmit(e) {
	const form = FormApp.getActiveForm();
	const allResponses = form.getResponses();
	const latestResponse = allResponses[allResponses.length - 1];
	const response = latestResponse.getItemResponses();
	const items = [];

	for (let i = 0; i < response.length; i++) {
		const question = response[i].getItem().getTitle();
		const answer = response[i].getResponse();
		try {
			var parts = answer.match(/[\s\S]{1,1024}/g) || [];
		} catch (e) {
			var parts = answer;
		}

		if (answer == '') {
			continue;
		}
		for (let j = 0; j < parts.length; j++) {
			if (j == 0) {
				items.push({
					name: question,
					value: parts[j],
					inline: false,
				});
			} else {
				items.push({
					name: question.concat(' (cont.)'),
					value: parts[j],
					inline: false,
				});
			}
		}
	}

	const options = {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		payload: JSON.stringify({
			content: '‌',
			embeds: [
				{
					title: 'Some nice title here',
					color: 33023, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
					fields: items,
					footer: {
						text: 'Some footer here',
					},
				},
			],
		}),
	};

	UrlFetchApp.fetch(POST_URL, options);
}
