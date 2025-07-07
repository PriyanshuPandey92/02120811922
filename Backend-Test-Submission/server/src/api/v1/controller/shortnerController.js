import store from '../../../data/store.js';
import { generateShortcode, getExpiryTimestamp } from '../../../utils/helpers.js';
import { Log } from '../../../middleware/logger.js';

export async function createShortURL(req, res) {
  const { url, validity = 30, shortcode } = req.body;

  try {
    if (!url) {
      await Log("backend", "error", "handler", "Missing URL in request");
      return res.status(400).json({ error: "URL is required" });
    }

    let code = shortcode || generateShortcode();

    if (store.has(code)) {
      await Log("backend", "warn", "handler", `Shortcode ${code} already exists`);
      return res.status(409).json({ error: "Shortcode already in use" });
    }

    const expiry = getExpiryTimestamp(validity);
    const createdAt = new Date().toISOString();

    store.set(code, {
      url,
      expiry,
      createdAt,
      clicks: 0,
      clickHistory: []
    });

    await Log("backend", "info", "route", `Short URL created: ${code}`);
    res.status(201).json({
      shortLink: `http://localhost:${process.env.PORT || 5001}/${code}`,
      expiry
    });

  } catch (err) {
    await Log("backend", "fatal", "handler", `Error creating short URL: ${err.message}`);
    res.status(500).json({ error: "Server error" });
  }
}

export async function redirectShortURL(req, res) {
  const { code } = req.params;
  const data = store.get(code);

  if (!data) {
    await Log("backend", "warn", "handler", `Shortcode not found: ${code}`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const now = new Date().toISOString();
  if (data.expiry < now) {
    await Log("backend", "warn", "handler", `Shortcode expired: ${code}`);
    return res.status(410).json({ error: "Shortcode expired" });
  }

  data.clicks += 1;
  data.clickHistory.push({
    timestamp: now,
    referrer: req.headers.referer || "unknown",
    location: "India"
  });

  await Log("backend", "info", "route", `Redirecting to ${data.url}`);
  res.redirect(data.url);
}

export async function getStats(req, res) {
  const { code } = req.params;
  const data = store.get(code);

  if (!data) {
    await Log("backend", "warn", "handler", `Stats requested for unknown shortcode: ${code}`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  res.json({
    clicks: data.clicks,
    originalUrl: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    clickHistory: data.clickHistory
  });
}
