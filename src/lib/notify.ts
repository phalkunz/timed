export default function notify(msg: string): void {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.warn('Notification feature is not available.');
    return;
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(msg);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification(msg);
      }
    });
  }
};

export function requestNotificationPermission(): void {
  if (!("Notification" in window)) {
    console.warn('Notification feature is not available.');
    return;
  } else if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}
