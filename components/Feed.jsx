'use client';
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};
const Feed = () => {
	const [posts, setPosts] = useState([]);

	// Search States
	const [searchText, setSearchText] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchResults, setSearchResults] = useState([]);

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, 'i');
		return posts.filter(
			(post) =>
				regex.test(post.creator.username) ||
				regex.test(post.creator.email) ||
				regex.test(post.prompt) ||
				regex.test(post.tag)
		);
	};
	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
		const searchResult = filterPrompts(tag);
		setSearchResults(searchResult);
	};
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch('/api/prompt');
			const data = await res.json();
			setPosts(data);
		};

		fetchPosts();
	}, []);
	const SearchResult = () => {
		if (searchResults.length > 0) {
			return (
				<PromptCardList
					data={searchResults}
					handleTagClick={handleTagClick}
				/>
			);
		} else {
			return <p className="text-red-500 mt-5">No Result Found</p>;
		}
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					className="search_input peer"
					placeholder="Search for anything..."
					value={searchText}
					onChange={handleSearchChange}
					required
				/>
			</form>
			{searchText ? (
				<SearchResult />
			) : (
				<PromptCardList
					data={posts}
					handleTagClick={handleTagClick}
				/>
			)}
		</section>
	);
};

export default Feed;
