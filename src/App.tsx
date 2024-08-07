import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useLocalStorage } from "./useLocalStorage";
import { Container } from "react-bootstrap";
import NewNote from "./NewNote";
import { useMemo } from "react";

export type Note = {
	id: string;
} & RawNoteData;

export type RawNoteData = {
	title: string;
	markdown: string;
	tagIds: String[];
};

export type Tag = {
	id: string;
	label: string;
};

export type RawNote = {
	id: string;
} & RawNoteData;

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			};
		});
	}, [notes, tags]);

	return (
		<Container className="my-4">
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route path="/new" element={<NewNote />} />
				<Route path="/:id">
					<Route index element={<h1>Show</h1>} />
					<Route path="edit" element={<h1>Edit</h1>} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	);
}

export default App;
