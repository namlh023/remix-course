import { Link, useParams, useLoaderData } from "@remix-run/react";
import styles from "~/styles/note-details.css";
import { getStoredNotes } from "~/data/notes";
import { json } from "@remix-run/node";

export default function NoteDetailsPage() {
  const note: any = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note) => note.id === params.noteId);

  if (!selectedNote) {
    throw json(
      { message: "Could not find note" },
      {
        status: 404,
        statusText: "Not found",
      }
    );
  }

  return selectedNote;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta({ data }) {
  return [
    {
      title: data.title,
      description: "Manage your notes with ease.",
    },
  ];
}
