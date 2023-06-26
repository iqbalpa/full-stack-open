const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};
	return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	let mostFavorite = blogs[0];
	for (let blog of blogs) {
		console.log(blog.title, blog.likes);
		if (blog.likes >= mostFavorite.likes) {
			mostFavorite = blog;
		}
	}
	return {
		title: mostFavorite.title,
		author: mostFavorite.author,
		likes: mostFavorite.likes,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
