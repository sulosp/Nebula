const SCRIPT = `(function () {
  var script = document.currentScript;
  if (!script) return;
  var key = script.getAttribute("data-client");
  if (!key) return;
  var origin = new URL(script.src).origin;
  if (document.getElementById("nebula-faq-widget")) return;

  var root = document.createElement("div");
  root.id = "nebula-faq-widget";
  root.style.cssText = "position:fixed;right:16px;bottom:16px;z-index:2147483647;font-family:system-ui,sans-serif";

  var frame = document.createElement("iframe");
  frame.src = origin + "/embed/" + encodeURIComponent(key);
  frame.title = "Chat";
  frame.style.cssText = "display:none;width:360px;height:480px;border:0;border-radius:14px;box-shadow:0 16px 40px rgba(0,0,0,.35);background:transparent";
  frame.setAttribute("allow", "clipboard-write");

  var button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", "Open chat");
  button.style.cssText = "width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;background:#9184d9;color:#fff;font-size:22px;box-shadow:0 8px 24px rgba(0,0,0,.35)";
  button.textContent = "💬";

  var open = false;
  button.addEventListener("click", function () {
    open = !open;
    frame.style.display = open ? "block" : "none";
    button.style.display = open ? "none" : "inline-flex";
  });

  window.addEventListener("message", function (event) {
    if (event.origin !== origin) return;
    if (event.data && event.data.type === "nebula-close") {
      open = false;
      frame.style.display = "none";
      button.style.display = "inline-flex";
    }
    if (event.data && event.data.type === "nebula-color" && event.data.color) {
      button.style.background = event.data.color;
    }
  });

  root.appendChild(frame);
  root.appendChild(button);
  document.body.appendChild(root);
})();`;

export async function GET() {
  return new Response(SCRIPT, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
