<template>
    <div>
      <!-- Header -->
      <header>
        <div class="logo-container">
          <img src="/image/logo.png" alt="Logo" class="logo-image">
        </div>
        <div class="navbar">
          <router-link to="/" class="navbar-link">
            <button>HOME</button>
          </router-link>
          <button @click="currentSection = 'About'">ABOUT</button>
          <button @click="currentSection = 'favorite'">FAVORITE</button>
          <router-link :to="{ name: 'Login'}" class="login">LOGIN</router-link>
        </div>
      </header>
  
      <!-- Favorite Page Content -->
      <main>
        <h2>Your Favorite Parks</h2>
  
        <div v-if="favoriteBars.length > 0">
          <div class="bar-item" v-for="bar in favoriteBars" :key="bar.id_bar">
            <img :src="bar.images[0]" alt="Bar image" class="bar-image" />
            <div class="bar-info">
              <h3>{{ bar.name }}</h3>
              <p>{{ bar.description }}</p>
              <router-link :to="{ name: 'Bar', params: { barId: bar.id_bar } }">See more</router-link>
            </div>
          </div>
        </div>
  
        <div v-else>
          <p>You have no favorites yet.</p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import barsData from "../json/bar.json";
  
  export default {
    name: "FavoritePage",
    data() {
      return {
        currentSection: "home", // Pour gérer la section active du header
        bars: barsData,
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      };
    },
    computed: {
      favoriteBars() {
        const userId = this.$route.params.userId; // Récupérer l'ID de l'utilisateur depuis l'URL
        const user = this.favorites.find(fav => fav.id_user === parseInt(userId)); // Trouver l'utilisateur
        if (!user) return [];
  
        // Retourner les bars favoris pour cet utilisateur
        return this.bars.filter(bar => user.favorite_parcs.includes(bar.id_bar));
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles du header */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 10px 20px;
    background-color: #333;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo-image {
    height: 50px;
    width: auto;
  }
  
  .navbar {
    display: flex;
    gap: 15px;
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
  }
  
  .navbar button:hover, .login:hover {
    background-color: #e07b37;
  }
  
  /* Styles pour la page des favoris */
  .favorites-page {
    padding: 20px;
    text-align: center;
  }
  
  .bar-item {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    overflow: hidden;
  }
  
  .bar-image {
    width: 200px;
    height: auto;
    object-fit: cover;
  }
  
  .bar-info {
    padding: 20px;
    text-align: left;
  }
  </style>
  