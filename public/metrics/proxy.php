<?php
/**
 * Google Tag Gateway proxy for advertisers.
 * Forwards requests from /metrics/* to gtm-wcb9jxdc.fps.goog/metrics/*
 * so the Google tag loads from a first-party domain.
 */

$origin = 'https://gtm-wcb9jxdc.fps.goog';

// Build the upstream path: everything after /metrics
$requestUri = $_SERVER['REQUEST_URI'];
$path = $requestUri; // Already includes /metrics/...

$upstreamUrl = $origin . $path;

// Determine approximate geo from server vars (if available via LiteSpeed/CloudLinux)
$country = $_SERVER['HTTP_CF_IPCOUNTRY']
    ?? $_SERVER['GEOIP_COUNTRY_CODE']
    ?? $_SERVER['HTTP_X_COUNTRY_CODE']
    ?? '';
$region = $_SERVER['HTTP_CF_REGION']
    ?? $_SERVER['GEOIP_REGION']
    ?? $_SERVER['HTTP_X_REGION_CODE']
    ?? '';

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $upstreamUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS      => 5,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_HTTPHEADER     => array_filter([
        'Host: gtm-wcb9jxdc.fps.goog',
        $country ? "X-Forwarded-Country: $country" : null,
        $region  ? "X-Forwarded-Region: $region"   : null,
        'X-Forwarded-For: ' . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']),
    ]),
    CURLOPT_HEADER         => true,
    CURLOPT_SSL_VERIFYPEER => true,
]);

// Forward the request method and body for POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
}

$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(502);
    exit('Gateway error');
}

$httpCode   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

$responseHeaders = substr($response, 0, $headerSize);
$responseBody    = substr($response, $headerSize);

// Forward select response headers
$allowedHeaders = ['content-type', 'cache-control', 'expires', 'etag', 'last-modified'];
foreach (explode("\r\n", $responseHeaders) as $line) {
    if (strpos($line, ':') === false) continue;
    [$name, $value] = explode(':', $line, 2);
    if (in_array(strtolower(trim($name)), $allowedHeaders)) {
        header(trim($name) . ':' . trim($value));
    }
}

http_response_code($httpCode);
echo $responseBody;
