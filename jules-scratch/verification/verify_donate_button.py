from playwright.sync_api import sync_playwright, Page, expect
import os

def test_donate_button_is_correct():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        file_path = os.path.abspath('index.html')
        page.goto(f'file://{file_path}')

        # Find the donate button by its text
        donate_button = page.get_by_role("link", name="Donate Securely with Stripe")

        # Assert that the button is visible
        expect(donate_button).to_be_visible()

        # Assert that the button has the correct href attribute
        expect(donate_button).to_have_attribute("href", "https://donate.stripe.com/3cI00jfo9dqkbFK9xCcbC00")

        # Find the donate section by its ID
        donate_section = page.locator("#donate")

        # Take a screenshot of the donate section
        donate_section.screenshot(path="jules-scratch/verification/donate_section.png")

        browser.close()

test_donate_button_is_correct()
