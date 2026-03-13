import hashlib
import json
import csv
import os
import urllib.request
from urllib.error import URLError

def fetch_emails_from_url(url):
    """Fetches CSV data from a URL and returns a list of dictionaries."""
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            lines = [line.decode('utf-8') for line in response.readlines()]
            reader = csv.DictReader(lines)
            return list(reader)
    except URLError as e:
        print(f"Failed to fetch CSV from URL: {e}")
        return None
    except Exception as e:
        print(f"Error processing CSV from URL: {e}")
        return None

def fetch_emails_from_file(filepath):
    """Fetches CSV data from a local file and returns a list of dictionaries."""
    try:
        with open(filepath, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            return list(reader)
    except FileNotFoundError:
        print(f"Failed to find local CSV file: {filepath}")
        return None
    except Exception as e:
        print(f"Error processing local CSV file: {e}")
        return None

def generate_roster():
    # 1. Configuration
    script_dir = os.path.dirname(os.path.abspath(__file__))
    local_input_file = os.path.join(script_dir, 'raw_emails.csv')

    # Output file path relative to repo root
    output_dir = os.path.dirname(os.path.dirname(script_dir))
    output_file = os.path.join(output_dir, 'iff-roster.json')

    # Environment variables
    salt = os.environ.get('IFF_ROSTER_SALT', 'iff_secret_2026')
    google_sheet_url = os.environ.get('GOOGLE_SHEET_URL')

    # Ensure output directory exists (it should, as it's the root repo)
    os.makedirs(output_dir, exist_ok=True)

    hashed_roster = []

    # 2. Fetch raw emails
    rows = None
    if google_sheet_url:
        print(f"Attempting to fetch data from GOOGLE_SHEET_URL...")
        rows = fetch_emails_from_url(google_sheet_url)

    if not rows:
        print(f"Falling back to local file: {local_input_file}")
        rows = fetch_emails_from_file(local_input_file)

    if not rows:
        print("Error: Could not retrieve email data from any source.")
        return

    # 3. Process emails
    for row in rows:
        # Assuming the column name is 'Email' or similar
        email = row.get('Email') or row.get('email')
        if not email:
            continue

        # 4. Normalize: Lowercase and strip whitespace
        clean_email = email.strip().lower()

        # 5. Salt
        salted_email = f"{clean_email}+{salt}"

        # 6. Hash (SHA-256)
        email_hash = hashlib.sha256(salted_email.encode('utf-8')).hexdigest()
        hashed_roster.append(email_hash)

    # 7. Output to static site build folder
    try:
        with open(output_file, 'w') as f:
            json.dump({"valid_hashes": hashed_roster}, f, indent=2)

        print(f"Successfully generated hashed roster with {len(hashed_roster)} entries.")
        print(f"Output saved to: {output_file}")
    except Exception as e:
        print(f"Error generating roster: {e}")

if __name__ == "__main__":
    generate_roster()
