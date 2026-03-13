# IFF Roster Integration with Zoho Makerspace

This directory contains the necessary scripts and documentation to integrate the Idea Forge Foundation (IFF) affiliate list with a Zoho Makerspace environment in a secure, privacy-preserving way.

## Architecture Overview

The system operates on a zero-infrastructure, high-privacy model:

1.  **IFF Side (Generation):** A Python script (`generate_roster.py`) securely hashes a list of verified IFF affiliate emails and outputs a static JSON file (`iff-roster.json`). This file contains *only* cryptographic hashes, ensuring no personal data is exposed.
2.  **Makerspace Side (Verification):** A Zoho Webhook written in Deluge (`zoho_webhook_example.dg`) runs when a user logs in or signs up at the makerspace. It applies the exact same hashing logic to the user's email and checks if the resulting hash exists in the public `iff-roster.json` file.

This means Zoho never has access to the raw IFF email list, and IFF doesn't need to maintain a live API server for Zoho to query.

---

## 1. Setting Up the Roster Generation (IFF Side)

The roster generation is automated via a GitHub Action (`.github/workflows/generate-roster.yml`), but it can also be run locally.

### Data Source

The `generate_roster.py` script requires a source of raw email addresses. It will try the following in order:

1.  **Google Sheets Export URL (Recommended):** If the `GOOGLE_SHEET_URL` environment variable is set, the script will fetch the CSV data directly from that URL. This allows you to manage the list in a secure Google Sheet and have the Action pull it automatically. To get this URL, go to your Google Sheet -> File -> Share -> Publish to Web -> Choose "Comma-separated values (.csv)".
2.  **Local Fallback (`raw_emails.csv`):** If the URL fails or isn't provided, it will fall back to reading `raw_emails.csv` in this directory.

### Security (Salting)

To prevent reverse-engineering of the hashes via rainbow tables, a "salt" (a secret string) is appended to every email before hashing (e.g., `user@example.com+my_secret_salt`).

Both the Python generation script and the Zoho Deluge verification script *must* use the exact same salt.

### Automating via GitHub Actions

To fully automate the process, configure the following **Repository Secrets** in your GitHub repository settings (Settings -> Secrets and variables -> Actions):

*   `GOOGLE_SHEET_URL`: The published CSV export link from your Google Sheet.
*   `IFF_ROSTER_SALT`: A strong, random string used to salt the hashes (e.g., a long passphrase).

Once these are set, the GitHub Action will automatically run daily (or can be triggered manually) to fetch the latest list, hash it, and update `iff-roster.json` at the root of the repository (hosted at `https://ideaforge.org/iff-roster.json`).

### Running Locally

You can run the script manually to test the generation process:

```bash
# Optional: Set the environment variables
export GOOGLE_SHEET_URL="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
export IFF_ROSTER_SALT="my_local_test_salt_123"

# Run the script from the repository root
python scripts/zoho_integration/generate_roster.py
```

---

## 2. Setting Up Zoho Verification (Makerspace Side)

To verify users on the Zoho side, you need to implement a workflow using Deluge.

1.  In your Zoho CRM/Creator/Makerspace environment, create a new Workflow Rule triggered by a user action (e.g., "On User Registration" or "On Record Update").
2.  Set the action to execute a Custom Function (Deluge Script).
3.  Use the contents of `zoho_webhook_example.dg` as a starting template.

### Critical Zoho Configurations

When adapting the Deluge script, pay close attention to the following:

*   **User Email Variable:** Ensure you correctly retrieve the user's email address from the Zoho payload (e.g., replacing `zoho_customer.get("email")` with the actual variable name in your workflow).
*   **The Salt:** You **must** define the `salt` variable in the Deluge script to exactly match the `IFF_ROSTER_SALT` you configured in your GitHub Action secrets. If they don't match, the hashes will be completely different, and verification will always fail.
*   **The Roster URL:** Ensure `roster_url` points to the correct, public location of your generated JSON file (e.g., `https://ideaforge.org/iff-roster.json`).
*   **Action Upon Verification:** Modify the `if(iff_response.get("valid_hashes").contains(email_hash))` block to perform the desired action when a user is verified (e.g., update a field, grant access, apply a discount).

### The Hashing Standard

For this integration to work reliably, both scripts must rigidly adhere to the following standard:

1.  **Normalization:** Strip all leading and trailing whitespace from the email.
2.  **Lowercase:** Convert the entire email string to lowercase.
3.  **Salt:** Append a `+` followed by the secret salt (e.g., `user@example.com+my_secret_salt`).
4.  **Hash:** Apply a SHA-256 cryptographic hash to the resulting salted string.