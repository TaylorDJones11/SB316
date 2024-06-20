const image = document.querySelector('img');
const title = window.document.getElementById('title');
const artist = window.document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Taylor Jam',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row',
    artist: 'Jacinto Design',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Song choices function
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `image/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

// Previous Button
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
  loadForm();
}

// On Load - Select first song
loadSong(songs[songIndex]);

// Form Validation
function checkValidation() {}

// If pushed to 3rd song - Load Subscribe Form
function loadForm() {
  if (songIndex === 2) {
    console.log('loadform');

    const form = document.createElement('form');
    form.id = 'myForm';
    form.style.backgroundColor = '#242323';
    form.style.borderRadius = '10px';
    form.style.padding = '20px';

    const formHeader = document.createElement('h3');
    formHeader.textContent = 'Do you like our services? Subscribe for discount';
    formHeader.style.color = 'white';
    formHeader.style.marginBottom = '5px';
    form.appendChild(formHeader);

    // Name Input
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name:';
    nameLabel.style.color = 'white';
    nameLabel.style.marginRight = '5px';
    form.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true;
    form.appendChild(nameInput);

    // Last Name Input
    const lastnameLabel = document.createElement('label');
    lastnameLabel.setAttribute('for', 'lastname');
    lastnameLabel.textContent = 'Last Name:';
    lastnameLabel.style.color = 'white';
    lastnameLabel.style.marginRight = '5px';
    lastnameLabel.style.marginLeft = '5px';
    form.appendChild(lastnameLabel);

    const lastnameInput = document.createElement('input');
    lastnameInput.type = 'text';
    lastnameInput.id = 'lastname';
    lastnameInput.name = 'lastname';
    lastnameInput.required = true;
    form.appendChild(lastnameInput);

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Email Input
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email:';
    emailLabel.style.color = 'white';
    emailLabel.style.marginRight = '5px';
    form.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.setAttribute('required', '');
    form.appendChild(emailInput);

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    // Create submit button
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    form.appendChild(submitButton);

    // Append the form to the container
    document.getElementById('form-container').appendChild(form);

    // Add event listener for form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value;
      const lastName = lastnameInput.value;
      const email = emailInput.value;

      console.log('Name:', name);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
    });

    pauseSong();
    console.log(form);
  }
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid Nan
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
