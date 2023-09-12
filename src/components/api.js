async function fetchImages(query, page) {
  const apiKey = '38183067-20cd9da803a0e7530f454b294';
  const perPage = 12;
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

export { fetchImages };
