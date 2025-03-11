document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");

    const RSS_FEEDS = [
        "https://www.farsnews.ir/rss",
        "https://www.mehrnews.com/rss",
        "https://www.irna.ir/rss",
        "https://www.tasnimnews.com/rss",
        "https://www.tabnak.ir/fa/rss/allnews",
        "https://www.bbc.com/persian/rss.xml",
        "https://per.euronews.com/rss",
        "https://www.isna.ir/rss",
        "https://www.varzesh3.com/rss/all",
        "https://www.eghtesadonline.com/fa/rss/allnews"
    ];

    async function fetchNews() {
        newsContainer.innerHTML = "<p>در حال بارگذاری اخبار...</p>";

        let newsHTML = "";

        for (let feed of RSS_FEEDS) {
            try {
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed)}`);
                const data = await response.json();
                const parser = new DOMParser();
                const xml = parser.parseFromString(data.contents, "application/xml");
                const items = xml.querySelectorAll("item");

                items.forEach(item => {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;

                    newsHTML += `<div class="news-item">
                        <a href="${link}" target="_blank">${title}</a>
                    </div>`;
                });

            } catch (error) {
                console.error("خطا در دریافت اخبار:", error);
            }
        }

        newsContainer.innerHTML = newsHTML || "<p>اخباری یافت نشد.</p>";
    }

    fetchNews();
});
