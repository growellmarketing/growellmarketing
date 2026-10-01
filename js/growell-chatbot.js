/**
 * ===================================================================
 * Growell Marketing - Premium AI Chatbot Widget (Light Theme)
 * Powered by n8n AI Agent Workflow (GPT-4o + Growell Knowledge Base)
 * Features: Compact mobile mode, 5-6s auto-open, permanent cancel dismissal
 * ===================================================================
 */
(function () {
  "use strict";

  var N8N_CHAT_ENDPOINT = "https://growellmarketing.app.n8n.cloud/webhook/10756f19-f3df-4f0d-af5c-7df121f0c489/chat";
  var STORAGE_KEY_SESSION = "gw_chatbot_session_id";
  var STORAGE_KEY_HISTORY = "gw_chatbot_history";
  var STORAGE_KEY_DISMISSED = "gw_chatbot_auto_dismissed";
  var AUTO_OPEN_DELAY_MS = 5500; // 5.5 seconds

  // Determine asset path relative to root (supports file:// and web server)
  var isLocalFile = window.location.protocol === "file:";
  var isSubdir = window.location.pathname.toLowerCase().indexOf('/blog/') !== -1 || 
                 window.location.pathname.toLowerCase().indexOf('/services/') !== -1 ||
                 window.location.pathname.toLowerCase().indexOf('\\blog\\') !== -1 ||
                 window.location.pathname.toLowerCase().indexOf('\\services\\') !== -1;
  var assetPrefix = isLocalFile ? (isSubdir ? "../" : "") : "/";
  var LOGO_URL = isLocalFile ? (assetPrefix + "assets/Growell_logo_circle.webp") : "/assets/Growell_logo_circle.webp";
  var CSS_URL = isLocalFile ? (assetPrefix + "css/growell-chatbot.css?v=4") : "/css/growell-chatbot.css?v=4";

  // Session ID Management
  function getSessionId() {
    var sid = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!sid) {
      sid = "gw_visitor_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem(STORAGE_KEY_SESSION, sid);
    }
    return sid;
  }

  function resetSession() {
    localStorage.removeItem(STORAGE_KEY_SESSION);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    return getSessionId();
  }

  // Load / Save Chat History
  function getChatHistory() {
    try {
      var h = localStorage.getItem(STORAGE_KEY_HISTORY);
      return h ? JSON.parse(h) : [];
    } catch (e) {
      return [];
    }
  }

  function saveChatMessage(sender, text) {
    try {
      var h = getChatHistory();
      h.push({
        sender: sender,
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      if (h.length > 30) h.shift();
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(h));
    } catch (e) {}
  }

  // Markdown to Safe HTML formatter
  function formatMarkdown(text) {
    if (!text) return "";
    var escaped = String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold **text** or *text*
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    escaped = escaped.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    // Clickable URLs
    escaped = escaped.replace(/(https?:\/\/[^\s]+)/g, function (url) {
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });

    // Bullet points: lines starting with - or *
    escaped = escaped.replace(/(?:^|\n)[-*]\s+(.+)/g, "<br>&bull; $1");

    // Newlines
    escaped = escaped.replace(/\n/g, "<br>");
    return escaped;
  }

  // Remove legacy static chatbot or mobile bottom action bars if present
  function cleanupLegacyElements() {
    var selectors = [
      "#growellChatbot",
      "#chatToggleBtn",
      "#chatWindow",
      ".mobile-sticky-lead-bar"
    ];
    selectors.forEach(function (sel) {
      var els = document.querySelectorAll(sel);
      els.forEach(function (el) {
        if (!el.id.startsWith("gw")) {
          el.remove();
        }
      });
    });
  }

  // Build UI
  function initChatbot() {
    if (document.getElementById("gwChatLauncher")) return;
    cleanupLegacyElements();

    // 1. Floating Teaser Tooltip (Desktop only)
    var teaser = document.createElement("div");
    teaser.id = "gwChatTeaser";
    teaser.className = "gw-chat-teaser";
    teaser.innerHTML =
      '<div class="gw-teaser-text"><span class="wave">👋</span> Need help growing your business? Ask our AI!</div>' +
      '<button type="button" class="gw-teaser-close" id="gwTeaserClose" aria-label="Dismiss teaser">&times;</button>';

    // 2. Launcher Button
    var launcher = document.createElement("div");
    launcher.id = "gwChatLauncher";
    launcher.className = "gw-chat-launcher";
    launcher.setAttribute("role", "button");
    launcher.setAttribute("aria-label", "Open Growell AI Chat");
    launcher.innerHTML =
      '<svg class="icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>' +
      '<svg class="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
      '<span class="gw-chat-badge" id="gwChatBadge">1</span>';

    // 3. Chat Window
    var chatWindow = document.createElement("div");
    chatWindow.id = "gwChatWindow";
    chatWindow.className = "gw-chat-window";
    chatWindow.setAttribute("role", "dialog");
    chatWindow.setAttribute("aria-label", "Growell Marketing AI Chatbot");

    chatWindow.innerHTML =
      '<div class="gw-chat-header">' +
        '<div class="gw-chat-header-profile">' +
          '<div class="gw-chat-avatar">' +
            '<img src="' + LOGO_URL + '" alt="Growell" class="gw-avatar-img" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'inline\';">' +
            '<span class="gw-avatar-fallback" style="display:none;">GM</span>' +
            '<span class="gw-chat-online-dot"></span>' +
          '</div>' +
          '<div class="gw-chat-header-info">' +
            '<h4>Growell AI Assistant</h4>' +
            '<span class="gw-status-text">Online • Quick Reply</span>' +
          '</div>' +
        '</div>' +
        '<div class="gw-chat-header-actions">' +
          '<button type="button" class="gw-chat-action-btn" id="gwChatRestartBtn" title="Restart Conversation" aria-label="Restart Conversation">' +
            '<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>' +
          '</button>' +
          '<button type="button" class="gw-chat-action-btn" id="gwChatCloseBtn" title="Close Chat" aria-label="Close Chat">' +
            '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="gw-chat-messages" id="gwChatMessages">' +
        '<div class="gw-chat-date-pill">⚡ Powered by Growell AI • 24/7 Online</div>' +
      '</div>' +
      '<div class="gw-chat-footer">' +
        '<form class="gw-chat-form" id="gwChatForm">' +
          '<input type="text" class="gw-chat-input" id="gwChatInput" placeholder="Ask about services, pricing, leads..." autocomplete="off">' +
          '<button type="submit" class="gw-chat-send-btn" id="gwChatSendBtn" aria-label="Send message">' +
            '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>' +
          '</button>' +
        '</form>' +
        '<div class="gw-chat-powered"><span class="bolt">⚡</span> Growell Marketing AI Consultant</div>' +
      '</div>';

    document.body.appendChild(teaser);
    document.body.appendChild(launcher);
    document.body.appendChild(chatWindow);

    var messagesContainer = document.getElementById("gwChatMessages");
    var chatForm = document.getElementById("gwChatForm");
    var chatInput = document.getElementById("gwChatInput");
    var sendBtn = document.getElementById("gwChatSendBtn");
    var closeBtn = document.getElementById("gwChatCloseBtn");
    var restartBtn = document.getElementById("gwChatRestartBtn");
    var badge = document.getElementById("gwChatBadge");
    var teaserClose = document.getElementById("gwTeaserClose");

    // Track auto-open timer
    var autoOpenTimer = null;

    function openChat(isUserAction) {
      if (autoOpenTimer) {
        clearTimeout(autoOpenTimer);
        autoOpenTimer = null;
      }
      chatWindow.classList.add("open");
      launcher.classList.add("active");
      if (teaser) teaser.style.display = "none";
      if (badge) badge.style.display = "none";

      // Focus input on desktop only (avoid auto-popping keyboard on mobile phones)
      if (isUserAction && window.innerWidth > 480) {
        setTimeout(function () {
          chatInput.focus();
        }, 150);
      }
    }

    function closeChat(isUserAction) {
      if (autoOpenTimer) {
        clearTimeout(autoOpenTimer);
        autoOpenTimer = null;
      }
      chatWindow.classList.remove("open");
      launcher.classList.remove("active");

      // When the customer cancels/closes the chat, remember permanently so it never auto-opens again
      if (isUserAction) {
        try {
          localStorage.setItem(STORAGE_KEY_DISMISSED, "true");
          sessionStorage.setItem(STORAGE_KEY_DISMISSED, "true");
        } catch (e) {}
      }
    }

    function toggleChat() {
      if (chatWindow.classList.contains("open")) {
        closeChat(true); // User closed/cancelled
      } else {
        openChat(true); // User opened
      }
    }

    launcher.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", function () {
      closeChat(true); // User explicitly cancelled/closed
    });

    teaser.addEventListener("click", function (e) {
      if (e.target.id === "gwTeaserClose") return;
      openChat(true);
    });

    if (teaserClose) {
      teaserClose.addEventListener("click", function (e) {
        e.stopPropagation();
        teaser.style.display = "none";
      });
    }

    // Auto-open chatbot after 5-6 seconds UNLESS previously dismissed by user
    function scheduleAutoOpen() {
      var isDismissed = false;
      try {
        isDismissed = (localStorage.getItem(STORAGE_KEY_DISMISSED) === "true") ||
                      (sessionStorage.getItem(STORAGE_KEY_DISMISSED) === "true");
      } catch (e) {}

      if (isDismissed) {
        // Customer has previously cancelled or closed the chat: NEVER auto-open again!
        return;
      }

      autoOpenTimer = setTimeout(function () {
        if (!chatWindow.classList.contains("open")) {
          openChat(false); // Auto-open without forceful keyboard popup
        }
      }, AUTO_OPEN_DELAY_MS);
    }

    scheduleAutoOpen();

    // Auto-hide teaser after 10 seconds if chat not open
    setTimeout(function () {
      if (teaser && !chatWindow.classList.contains("open")) {
        teaser.style.opacity = "0";
        setTimeout(function () { teaser.style.display = "none"; }, 400);
      }
    }, 10000);

    // Append Message to UI
    function appendMessage(sender, text, formattedHtml, time) {
      var msgDiv = document.createElement("div");
      msgDiv.className = "gw-msg " + sender;
      var timeStr = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      var contentHtml = formattedHtml || formatMarkdown(text);

      msgDiv.innerHTML =
        '<div class="gw-msg-bubble">' + contentHtml + '</div>' +
        '<span class="gw-msg-time">' + timeStr + '</span>';

      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Typing indicator
    var typingDiv = null;
    function showTyping() {
      if (typingDiv) return;
      typingDiv = document.createElement("div");
      typingDiv.className = "gw-msg bot";
      typingDiv.id = "gwTypingIndicator";
      typingDiv.innerHTML =
        '<div class="gw-typing-bubble">' +
          '<div class="gw-typing-dot"></div>' +
          '<div class="gw-typing-dot"></div>' +
          '<div class="gw-typing-dot"></div>' +
        '</div>';
      messagesContainer.appendChild(typingDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTyping() {
      if (typingDiv) {
        typingDiv.remove();
        typingDiv = null;
      }
    }

    // Send message to n8n AI webhook
    function handleUserSend(text) {
      if (!text || !text.trim()) return;
      var cleanText = text.trim();
      appendMessage("user", cleanText);
      saveChatMessage("user", cleanText);
      chatInput.value = "";
      sendBtn.disabled = true;
      showTyping();

      var sid = getSessionId();

      fetch(N8N_CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: sid,
          chatInput: cleanText
        })
      })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        hideTyping();
        sendBtn.disabled = false;
        var reply = data.output || "Thank you! Our growth team will get back to you shortly.";
        appendMessage("bot", reply);
        saveChatMessage("bot", reply);
      })
      .catch(function (err) {
        hideTyping();
        sendBtn.disabled = false;
        console.error("Growell Chatbot error:", err);
        var fallbackMsg = "Thank you for reaching out! Please leave your message or query, and our growth team will get back to you shortly.";
        appendMessage("bot", fallbackMsg);
        saveChatMessage("bot", fallbackMsg);
      });
    }

    // Render Quick Action Chips
    function appendWelcomeWithChips() {
      var welcomeText = "Namaste! Welcome to <strong>Growell Marketing</strong> 👋<br><br>I'm your 24/7 AI Growth Consultant. How can we help scale your business today?";
      var chipsHtml =
        '<div class="gw-msg-bubble">' + welcomeText +
          '<div class="gw-chat-chips">' +
            '<button type="button" class="gw-chip-btn" data-query="Mujhe Meta & Google Ads se high-quality leads chahiye"><span class="gw-chip-icon">🚀</span><span>Scale With Meta &amp; Google Ads</span></button>' +
            '<button type="button" class="gw-chip-btn" data-query="Mujhe ek High-Converting Website / Landing Page banwani hai"><span class="gw-chip-icon">💻</span><span>High-Converting Website</span></button>' +
            '<button type="button" class="gw-chip-btn" data-query="Mujhe Local SEO & Google Top Rankings chahiye"><span class="gw-chip-icon">📈</span><span>SEO &amp; Top Google Rankings</span></button>' +
            '<button type="button" class="gw-chip-btn" data-query="Mujhe Free Growth Audit claim karni hai"><span class="gw-chip-icon">🎁</span><span>Claim Free Growth Audit</span></button>' +
          '</div>' +
        '</div>' +
        '<span class="gw-msg-time">' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</span>';

      var welcomeDiv = document.createElement("div");
      welcomeDiv.className = "gw-msg bot";
      welcomeDiv.innerHTML = chipsHtml;
      messagesContainer.appendChild(welcomeDiv);

      var chipButtons = welcomeDiv.querySelectorAll(".gw-chip-btn");
      chipButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var query = this.getAttribute("data-query");
          handleUserSend(query);
        });
      });
    }

    // Restart Conversation
    restartBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to restart this chat?")) {
        resetSession();
        messagesContainer.innerHTML = '<div class="gw-chat-date-pill">⚡ Powered by Growell AI • 24/7 Online</div>';
        appendWelcomeWithChips();
      }
    });

    // Load existing history or show welcome
    var history = getChatHistory();
    if (history.length > 0) {
      history.forEach(function (m) {
        appendMessage(m.sender, m.text, null, m.time);
      });
    } else {
      appendWelcomeWithChips();
    }

    // Form submit
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleUserSend(chatInput.value);
    });
  }

  // Load stylesheet dynamically if not already linked
  function ensureStyles() {
    if (!document.getElementById("gwChatbotStyles")) {
      var link = document.createElement("link");
      link.id = "gwChatbotStyles";
      link.rel = "stylesheet";
      link.href = CSS_URL;
      document.head.appendChild(link);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      ensureStyles();
      initChatbot();
    });
  } else {
    ensureStyles();
    initChatbot();
  }
})();
