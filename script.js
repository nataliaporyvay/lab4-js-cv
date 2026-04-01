function saveBrowserInfo() {
  const browserInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine
  };

  localStorage.setItem("browserInfo", JSON.stringify(browserInfo));
}

function showBrowserInfo() {
  const storageInfo = document.getElementById("storageInfo");
  const data = localStorage.getItem("browserInfo");

  if (!data) {
    storageInfo.innerHTML = "<p class='storage-item'>Дані у localStorage відсутні.</p>";
    return;
  }

  const info = JSON.parse(data);

  storageInfo.innerHTML = `
    <p class="storage-item"><strong>User Agent:</strong> ${info.userAgent}</p>
    <p class="storage-item"><strong>Платформа:</strong> ${info.platform}</p>
    <p class="storage-item"><strong>Мова браузера:</strong> ${info.language}</p>
    <p class="storage-item"><strong>Cookies увімкнені:</strong> ${info.cookieEnabled ? "Так" : "Ні"}</p>
    <p class="storage-item"><strong>Статус мережі:</strong> ${info.onlineStatus ? "Онлайн" : "Офлайн"}</p>
  `;
}

async function loadComments() {
  const commentsBox = document.getElementById("comments");
  commentsBox.innerHTML = "<p class='storage-item'>Завантаження коментарів...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/20/comments");
    const comments = await response.json();

    commentsBox.innerHTML = "";

    comments.forEach((comment) => {
      const commentCard = document.createElement("div");
      commentCard.classList.add("comment-card");

      commentCard.innerHTML = `
        <h3 class="comment-name">${comment.name}</h3>
        <p class="comment-email"><strong>Email:</strong> ${comment.email}</p>
        <p class="comment-body">${comment.body}</p>
      `;

      commentsBox.appendChild(commentCard);
    });
  } catch (error) {
    commentsBox.innerHTML = "<p class='storage-item'>Не вдалося завантажити коментарі.</p>";
    console.error("Помилка завантаження коментарів:", error);
  }
}

function applyTheme(theme) {
  const body = document.body;
  const themeStatus = document.getElementById("themeStatus");

  if (theme === "dark") {
    body.classList.add("dark-theme");
    themeStatus.textContent = "Поточна тема: темна";
  } else {
    body.classList.remove("dark-theme");
    themeStatus.textContent = "Поточна тема: світла";
  }

  localStorage.setItem("siteTheme", theme);
}

function getThemeByTime() {
  const currentHour = new Date().getHours();

  if (currentHour >= 7 && currentHour < 21) {
    return "light";
  }

  return "dark";
}

function setupTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("siteTheme");

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(getThemeByTime());
  }

  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      applyTheme("light");
    } else {
      applyTheme("dark");
    }
  });
}

function setupModal() {
  const modal = document.getElementById("feedbackModal");
  const closeModal = document.getElementById("closeModal");

  setTimeout(() => {
    modal.classList.remove("hidden");
  }, 2000);

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  saveBrowserInfo();
  showBrowserInfo();
  setupTheme();
  setupModal();

  const loadCommentsBtn = document.getElementById("loadCommentsBtn");
  loadCommentsBtn.addEventListener("click", loadComments);
});