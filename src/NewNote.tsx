import React from "react";
import NoteForm from "./NoteForm";

const NewNote = () => {
	return (
		<div>
			<h1 className="mb-4">New Note</h1>
			<NoteForm onSubmit={() => {}} />
		</div>
	);
};

export default NewNote;
