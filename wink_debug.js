// wink_debug.js
// Safe debug script for Shadowrocket/Quantumult X/Loon
// Logs request/response URLs, headers and small preview of bodies.

const url = ($request && $request.url) || ($response && $response.url) || "unknown";
const mode = (typeof $response === "undefined") ? "request" : "response";

function safeSlice(s, n = 1000) {
  try {
    return (typeof s === 'string' ? s : JSON.stringify(s)).slice(0, n);
  } catch (e) {
    return '[unserializable]';
  }
}

console.log(`[WinkDebug] mode=${mode} url=${url}`);

if (typeof $request !== 'undefined' && $request) {
  try {
    console.log('[WinkDebug] request_method=' + ($request.method || 'unknown'));
    console.log('[WinkDebug] request_headers=' + safeSlice($request.headers || {}));
    if ($request.body) {
      const b = (typeof $request.body === 'string') ? $request.body : JSON.stringify($request.body);
      console.log('[WinkDebug] request_body_preview=' + safeSlice(b, 2000));
    }
  } catch (e) {
    console.log('[WinkDebug] request_log_error=' + e);
  }
}

if (typeof $response !== 'undefined' && $response) {
  try {
    console.log('[WinkDebug] response_status=' + ($response.status || 'unknown'));
    console.log('[WinkDebug] response_headers=' + safeSlice($response.headers || {}));
    const body = $response.body || '';
    console.log('[WinkDebug] response_body_preview=' + safeSlice(body, 2000));
  } catch (e) {
    console.log('[WinkDebug] response_log_error=' + e);
  }
}

// Do not modify request/response; just finish.
$done($response || {});
