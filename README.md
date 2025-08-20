# Idea Forge Foundation Website

This repository contains the source code for the official website of the **Idea Forge Foundation**, a non-profit organization dedicated to fostering innovation and creativity in Oklahoma.

The website is a static site built with modern web technologies and is hosted on GitHub Pages.

## Tech Stack

*   **HTML5:** The core markup for the website.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
*   **[Alpine.js](https://alpinejs.dev/):** A rugged, minimal framework for composing JavaScript behavior in your markup. Used for the navigation dropdown.
*   **[Chart.js](https://www.chartjs.org/):** Used for rendering charts on the campaign page.

## Getting Started

Since this is a static website, there is no complex build process. You can simply open the `.html` files in your browser to view the site locally.

## Making Updates

This website has been designed to be easy to update, even for those with limited web development experience.

### Updating Board Members

To add, remove, or edit a board member:

1.  Open the `board.html` file.
2.  Locate the `<script>` tag at the bottom of the file.
3.  Inside the script, you will find a JavaScript array named `boardMembers`.
4.  Each board member is an object in this array. You can edit the `name`, `title`, and `bio` for each member.
5.  To add a new member, copy an existing object, paste it at the end of the list (before the closing `]`), and update its content.
6.  To change a member's photo, update the `imageUrl` property. It is recommended to add the new image to the `/images` folder and use a relative path (e.g., `images/new-member.jpg`).

### Updating Text Content

Most text content can be edited directly in the corresponding HTML files (`index.html`, `campaign.html`, etc.).

## Future Development

For a full list of planned features and improvements, please see the [ToDo.md](ToDo.md) file.

## Contributing

Contributions are welcome! Please feel free to submit a pull request with any improvements or bug fixes.

---

*This website is hosted at [ideaforgefoundation.github.io](https://ideaforgefoundation.github.io).*
