const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC9rMiEjNaCSsebs31MRDCRA&part=snippet%2Cid&order=date&maxResults=9';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b72177852amsh8109ed9bf6acf6bp1f897djsn938972ba37f5',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

const videosContainer = null || document.getElementById('videos-container');

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(API);
        let videoCards = `
            ${videos.items.map(video => `
                <div class="rounded shadow font-poppins flex flex-col justify-between">
                    <img src="${ video.snippet.thumbnails.high.url }" alt="${ video.snippet.title }">
                    <div class="p-2 flex flex-col gap-5">
                        <h4 class="font-medium">${ video.snippet.title }</h4>
                        <p>${ video.snippet.description }</p>
                    </div>
                    <a class="rounded self-center bg-slate-700 mb-4 text-white hover:bg-slate-900 transition-all p-4" href="https://www.youtube.com/watch?v=${ video.id.videoId }" target="_blank">Watch Video</a>
                </div>
            `).join('')}
        `;
        videosContainer.innerHTML = videoCards;
    } catch(error) {
        console.error(error);
    }
})();