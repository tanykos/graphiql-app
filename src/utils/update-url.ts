export default function updateUrl(updatedUrl: string): void {
  window.history.replaceState({}, '', updatedUrl);
}
