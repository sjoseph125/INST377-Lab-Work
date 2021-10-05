async function mainEvent(evt) {
  const form = document.querySelector('.main_form');
  form.addEventListener('submit', async (submitEvent) => {
    submitEvent.preventDefault();
    console.log(submitEvent);
    console.log('form submission');
    const results = await fetch('/api');
    const resolved = await results.text();
    console.log(resolved);
  });
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());