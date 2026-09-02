"use client";

import { useState } from "react";
import { addFaq, deleteFaq, updateFaq } from "@/app/dashboard/actions";
import { PhIcon } from "@/components/ph-icon";
import type { FaqEntry } from "@/lib/types";

export function FaqTable({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className="faq">
      <form className="faq-add" action={addFaq}>
        <div className="field">
          <label htmlFor="question">Question</label>
          <input className="input" id="question" name="question" required />
        </div>
        <div className="field">
          <label htmlFor="answer">Answer</label>
          <textarea className="input" id="answer" name="answer" required />
        </div>
        <button className="btn btn-primary" type="submit">
          <PhIcon name="ph-plus" />
          Add
        </button>
      </form>

      {entries.length === 0 ? (
        <p className="text-muted">No FAQ entries yet. Add a few Q&amp;A pairs.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <FaqRow key={entry.id} entry={entry} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FaqRow({ entry }: { entry: FaqEntry }) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <tr>
        <td>{entry.question}</td>
        <td>{entry.answer}</td>
        <td className="faq-actions">
          <button className="btn btn-ghost" type="button" onClick={() => setEditing(true)}>
            Edit
          </button>
          <form action={deleteFaq}>
            <input type="hidden" name="id" value={entry.id} />
            <button className="btn btn-icon" type="submit" aria-label="Delete">
              <PhIcon name="ph-trash" />
            </button>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td colSpan={3}>
        <form
          className="faq-edit"
          action={async (formData) => {
            await updateFaq(formData);
            setEditing(false);
          }}
        >
          <input type="hidden" name="id" value={entry.id} />
          <input className="input" name="question" defaultValue={entry.question} required />
          <textarea className="input" name="answer" defaultValue={entry.answer} required />
          <div className="faq-actions">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
}
