<template>
  <div>
    <header>
      <div class="logo-container">
        <img src="/image/logo.png" alt="Logo" class="logo-image">
      </div>
      <!--button already here in all page-->
      <div class="navbar">
        <button @click="currentSection = 'home'">HOME</button>
        <button @click="currentSection = 'About'">ABOUT</button>
        <button @click="currentSection = 'favorite'">FAVORITE</button>
        <router-link :to="{ name: 'Login'}" class="login">LOGIN</router-link>
      </div>
    </header>  

    

    <main>
      <!-- Home Section -->
      <section v-if="currentSection === 'home'" class="home-section">
        <section class="intro">
          <h2>Choose the bar you want to go to</h2>
        </section>

        <section class="bars">
          <div class="bar-item" v-for="(bar, index) in bars" :key="bar.id_bar" :class="{'reverse': index % 2 !== 0}">
            
            <!-- Carousel of images for each bar -->
            <section v-if="bar.images && bar.images.length > 0" class="carousel">
              
              <div class="carousel-controls">
                <button @click="prevImage(index)" class="carousel-button prev-button">&#10094;</button>
                <img :src="bar.images[currentImageIndex(bar)]" alt="Image bar" class="bar-image">
                <button @click="nextImage(index)" class="carousel-button next-button">&#10095;</button>
              </div>
            </section>
          
            <div class="bar-info">
              <h3>{{ bar.name }}</h3>
              <p>{{ bar.description }}</p>
              <p>Address : {{ bar.address }}</p>
              <div class="schedule-container">
                <p>Opening times</p>
                <button @click="toggleHours(index)" class="hours-button">
                  {{ bar.showHours ? "See less" : "See the hours" }}
                </button>
                <div v-if="bar.showHours" class="hoursList">
                  <ul>
                    <li v-for="(hours, day) in bar.hours" :key="day">{{ day }} : {{ hours }}</li>
                  </ul>
                </div>
              </div>
              
              <router-link :to="{ name: 'Bar', params: { barId: bar.id_bar } }" class="bar-id">
                See more
              </router-link>

            </div>
          </div>
        </section>
      </section>
       <!-- Favorite Section (not implemented)-->
       <section v-if="currentSection === 'favorite'">
        <p>Pareil que pour about</p>
      </section>

      <!-- Login Section (not implemented)-->
      <section v-if="currentSection === 'login'">
        <p>pareil que pour favorite</p>
      </section>
    </main>
  </div>
</template>

<script>
import barsData from "../json/bar.json";

export default {
  name: 'BarPage',
  data() {
    return { 
      currentSection: "home",
      bars: barsData,
    };
  },
  
  methods: {
  prevImage(barIndex) {
    const bar = this.bars[barIndex];
    bar.currentImageIndex = (bar.currentImageIndex - 1 + bar.images.length) % bar.images.length;
  },
  nextImage(barIndex) {
    const bar = this.bars[barIndex];
    bar.currentImageIndex = (bar.currentImageIndex + 1) % bar.images.length;
  },
  currentImageIndex(bar) {
    if (bar.currentImageIndex === undefined) {
      this.$set(bar, 'currentImageIndex', 0); // Initialisation si non défini
    }
    return bar.currentImageIndex;
  },
  toggleHours(index) {
      this.bars[index].showHours = !this.bars[index].showHours;
    },
},


};
</script>

<style scoped>

/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

/* Body Style */
body {
  background-color: #f0f0f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header Section */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 50px;
  width: auto;
}

/* Navbar */
.navbar {
  display: flex;
  gap: 15px; /* Space between buttons */
}

.navbar button, .login {
  padding: 10px 20px;
  background-color: #05a04b;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  border-radius: 4px;
  transition: background-color 0.3s;
  border: 2px solid red;
}

.navbar button:hover, .login:hover {
  background-color: #e07b37;
}

/* Intro Section */
.intro {
  margin: 20px 0;
  text-align: center;
}

.intro h2 {
  font-size: 1.8em;
  color: #333;
}

/* Bars Section */

.bar-id{
  background-color: rgba(126, 65, 0, 0.39);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;
  max-width: 800px;
}

.bar-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.bar-item:hover {
  transform: scale(1.02);
}

.bar-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.bar-info {
  padding: 20px;
  width: 60%;
}

.bar-info h3 {
  font-size: 1.5em;
  color: #ff8c42;
}

.bar-info p {
  margin: 10px 0;
  color: #555;
}

.bar-link {
  text-decoration: none;
  color: #ff8c42;
  font-weight: bold;
}

.bar-link:hover {
  color: #ff5722;
}

.reverse {
  flex-direction: row-reverse;
}

/* Carousel Section */
.carousel {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: auto;
}

.carousel-image {
  width: 100%;
  height: auto;
}

.carousel-controls {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: auto;
  display: flex;
  align-items: center; 
  justify-content: space-between;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  border-radius: 50%;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

/* Hours Section */
.schedule-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.hours-button {
  background-color: rgba(126, 65, 0, 0.76);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.hoursList ul {
  list-style: none;
  padding: 0;
}

.hoursList li {
  background-color: #eaeaea;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* Heart Icon */
.heart-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.heart-icon:hover {
  transform: scale(1.1);
}

</style>
