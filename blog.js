async function loadBlogListing() {
    const container = document.getElementById("blog-posts-container");

    try {
        const api = "https://api.github.com/repos/growwithboss/portfolio/contents/posts";
        const response = await fetch(api);
        const files = await response.json();

        const posts = files
            .filter(f => f.name.endsWith(".md"))
            .sort((a, b) => b.name.localeCompare(a.name)); // Newest first

        container.innerHTML = posts.map(file => {
            const slug = file.name.replace(".md", "");

            const parts = slug.split("-");
            const date = `${parts[0]}-${parts[1]}-${parts[2]}`;
            const title = parts.slice(3).join(" ").replace(/-/g, " ").toUpperCase();

            return `
            <a href="post.html?slug=${slug}" class="project-card">
                <h3>${title}</h3>
                <p>${date}</p>
            </a>`;
        }).join("");

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p style="color:red;">Failed to load posts.</p>`;
    }
}

loadBlogListing();
