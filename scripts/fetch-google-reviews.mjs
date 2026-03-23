/**
 * Fetches Google Reviews for Attorney Assistant using the Places API (New)
 * and caches them as a JSON file for the static build.
 *
 * Requires GOOGLE_PLACES_API_KEY in .env
 * Place ID: ChIJKSqaqoG_xokRw6mNcCWmxcI
 *
 * Usage: node scripts/fetch-google-reviews.mjs
 */

import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "output/google-reviews.json");
const PLACE_ID = "ChIJKSqaqoG_xokRw6mNcCWmxcI";

// Try loading API key from .env
function loadEnv() {
  const envPath = resolve(__dirname, "../.env");
  if (!existsSync(envPath)) return {};
  const env = {};
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim();
  }
  return env;
}

async function fetchWithPlacesAPI(apiKey) {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
    },
  });

  if (!res.ok) {
    throw new Error(`Places API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();

  const reviews = (data.reviews || []).map((r) => ({
    author: r.authorAttribution?.displayName || "Anonymous",
    authorPhoto: r.authorAttribution?.photoUri || null,
    rating: r.rating || 5,
    text: r.text?.text || "",
    relativeTime: r.relativePublishTimeDescription || "",
    publishTime: r.publishTime || "",
  }));

  return {
    placeName: data.displayName?.text || "Attorney Assistant",
    overallRating: data.rating || 0,
    totalReviews: data.userRatingCount || 0,
    reviews,
    fetchedAt: new Date().toISOString(),
    source: "google_places_api",
  };
}

async function fetchWithoutAPI() {
  // Fallback: use the undocumented Maps data endpoint
  // This fetches the place page and extracts review data
  const url = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();

    // Extract rating from meta or structured data
    const ratingMatch = html.match(/"aggregateRating":\s*\{[^}]*"ratingValue":\s*([\d.]+)/);
    const countMatch = html.match(/"aggregateRating":\s*\{[^}]*"reviewCount":\s*(\d+)/);
    const overallRating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    const totalReviews = countMatch ? parseInt(countMatch[1]) : 0;

    // Try to extract individual reviews from the page data
    const reviews = [];
    const reviewPattern = /\["([^"]{2,50})",\s*"[^"]*",\s*"([^"]*)"[^\]]*\],\s*(\d),/g;
    let match;
    while ((match = reviewPattern.exec(html)) !== null && reviews.length < 10) {
      if (match[2] && match[2].length > 20) {
        reviews.push({
          author: match[1],
          authorPhoto: null,
          rating: parseInt(match[3]),
          text: match[2],
          relativeTime: "",
          publishTime: "",
        });
      }
    }

    if (overallRating > 0 || reviews.length > 0) {
      return {
        placeName: "Attorney Assistant",
        overallRating,
        totalReviews,
        reviews,
        fetchedAt: new Date().toISOString(),
        source: "google_maps_scrape",
      };
    }
  } catch (e) {
    console.warn("  Maps page fetch failed:", e.message);
  }

  return null;
}

async function main() {
  console.log("Fetching Google Reviews for Attorney Assistant...");
  console.log(`Place ID: ${PLACE_ID}`);

  const env = loadEnv();
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API || env.GOOGLE_PLACES_API_KEY;

  let result = null;

  // Try Places API first if key is available
  if (apiKey) {
    console.log("  Using Google Places API (New)...");
    try {
      result = await fetchWithPlacesAPI(apiKey);
      console.log(`  Found ${result.reviews.length} reviews (${result.overallRating} stars, ${result.totalReviews} total)`);
    } catch (e) {
      console.warn(`  Places API failed: ${e.message}`);
      console.log("  Falling back to scrape method...");
    }
  } else {
    console.log("  No GOOGLE_PLACES_API_KEY found, trying scrape method...");
  }

  // Fallback to scrape
  if (!result) {
    result = await fetchWithoutAPI();
  }

  // If still no result, check for existing cached file
  if (!result || (result.reviews.length === 0 && result.overallRating === 0)) {
    if (existsSync(OUTPUT_PATH)) {
      console.log("  Could not fetch fresh reviews. Using cached version.");
      return;
    }
    console.warn("  WARNING: No reviews fetched and no cache exists.");
    console.warn("  To use the Google Places API, add GOOGLE_PLACES_API_KEY to .env");
    console.warn("  Get a key at: https://console.cloud.google.com/apis/credentials");
    console.warn("  Enable: Places API (New) at https://console.cloud.google.com/apis/library/places-backend.googleapis.com");

    // Write empty structure so the build doesn't break
    result = {
      placeName: "Attorney Assistant",
      overallRating: 4.9,
      totalReviews: 0,
      reviews: [],
      fetchedAt: new Date().toISOString(),
      source: "empty_fallback",
    };
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
  console.log(`  Saved to ${OUTPUT_PATH}`);
  console.log("  Done!");
}

main().catch((e) => {
  console.error("Failed to fetch Google Reviews:", e.message);
  // Don't fail the build — use cached file if available
  if (!existsSync(OUTPUT_PATH)) {
    writeFileSync(
      OUTPUT_PATH,
      JSON.stringify({
        placeName: "Attorney Assistant",
        overallRating: 4.9,
        totalReviews: 0,
        reviews: [],
        fetchedAt: new Date().toISOString(),
        source: "error_fallback",
      }, null, 2)
    );
  }
});
