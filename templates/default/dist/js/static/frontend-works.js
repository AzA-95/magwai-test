document.addEventListener(
	'DOMContentLoaded',
	() => {
		// For popups
		document.addEventListener('click', (e) => {
			const target = e.target.closest('[data-ajax]');

			if (target) {
				e.preventDefault();

				const url = target.getAttribute('data-url');
				const modiferClass = target.getAttribute('data-modifer-popup-class');

				fetch(url)
					.then((response) => response.text())
					.then((html) => {
						// eslint-disable-next-line no-undef
						globalPopup
							.options({
								addClassNamePopup: modiferClass || null,
								closeButtons: '.js-popup-close-btn',
							})
							.html(html)
							.show();
					});
			}
		});

		// Load more articles
		const articles = document.querySelector('.js-articles');
		const loadMoreBtn = document.querySelector('.js-load-more-articles-btn');

		const renderArticleTemplate = (data) => `<article class="article">
											<div class="article__pic">
												<a href="#">
													<picture>
														<source data-srcset="images/articles/1.webp, images/articles/1@2x.webp 2x" type="image/webp">
														<img class="lazyload" data-srcset="images/articles/1.jpg, images/articles/1@2x.jpg 2x" data-src="article/pic.jpg" alt="pic">
													</picture>
												</a>
											</div>
											<div class="article__desc">
												<div class="article__category" data-mh><a href="#">bridge</a></div>
												<h3 class="article__name" data-mh>
													<a href="#">${data.title}</a>
												</h3>
												<div class="article__text">${data.body}</div>
												<div class="article__author">Posted by <span>Eugenia</span>, on July  24, 2019</div>
												<div class="article__btn">
													<a href="#">Continue reading</a>
												</div>
											</div>
										</article>`;

		if (articles && loadMoreBtn) {
			const loadPosts = async (page) => {
				try {
					const limit = 5;
					const response = await fetch(
						`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
					);

					if (!response.ok) {
						throw new Error('Возникла проблема с запросом');
					}

					const data = await response.json();
					return Promise.resolve(data);
				} catch (e) {
					return Promise.reject(e);
				}
			};

			let currentPageIndex = 1;

			loadMoreBtn.addEventListener('click', () => {
				loadMoreBtn.classList.add('loading');
				loadMoreBtn.setAttribute('disabled', true);

				loadPosts(currentPageIndex)
					.then((posts) => {
						currentPageIndex += 1;
						const result = posts.map((post) => renderArticleTemplate(post)).join('');
						articles.insertAdjacentHTML('beforeend', result);

						MatchHeight.init();
					})
					.catch((e) => {
						if (navigator.onLine) {
							alert('Что то пошло не так попробуйте загрузить посты еще раз');
						} else {
							alert('Проверьте интернет сойдинение');
						}

						console.error(e);
					})
					.finally(() => {
						loadMoreBtn.classList.remove('loading');
						loadMoreBtn.removeAttribute('disabled');

						// Если загрузились 20 постов то удаляем кнопку (Загрузить еще)
						if (currentPageIndex === 5) {
							loadMoreBtn.parentNode.remove();
						}
					});
			});
		}
	},
	false,
);
