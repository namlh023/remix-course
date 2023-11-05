import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NoteList, { links as NoteListLinks } from "~/components/NoteList";

export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote></NewNote>
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not found",
      }
    );
  }

  return json(notes);
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "Invalid tittle - must be at least 5 characters long." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  // await new Promise((resolve, reject) => setTimeout(() => resolve(0), 2000));
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...NoteListLinks()];
}
