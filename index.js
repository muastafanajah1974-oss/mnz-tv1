export default async function handler(req, res) {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        res.status(400).send("❌ Missing URL");
        return;
    }

    try {
        const response = await fetch(videoUrl);
        let html = await response.text();

        // حذف السكربتات والإعلانات
        html = html.replace(/<script.*?>.*?<\/script>/gis, "")
                   .replace(/<iframe.*?>.*?<\/iframe>/gis, "");

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(html);
    } catch (err) {
        res.status(500).send("❌ Error fetching video");
    }
}