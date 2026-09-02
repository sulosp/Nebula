import { updateBranding } from "@/app/dashboard/actions";
import type { ClientRow } from "@/lib/types";

export function BrandingForm({ client }: { client: ClientRow }) {
  return (
    <form className="branding-form" action={updateBranding}>
      <div className="field">
        <label htmlFor="name">Widget name</label>
        <input
          className="input"
          id="name"
          name="name"
          defaultValue={client.name}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="color">Widget color</label>
        <input
          className="input color-input"
          id="color"
          name="color"
          type="color"
          defaultValue={client.color}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Save branding
      </button>
    </form>
  );
}
