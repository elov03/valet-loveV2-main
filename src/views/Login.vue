<template>
    <div> <!-- Ajouter une div enveloppante -->
      <header>
        <div class="logo-container">
          <img src="/image/logo.png" alt="Logo" class="logo-image">
        </div>
        <div class="navbar">
          <router-link :to="{ name: 'BarPage' }" class="barPage">HOME</router-link>
          <button @click="currentSection = 'About'">ABOUT</button>
          <button @click="currentSection = 'favorite'">FAVORITE</button>
          <button @click="currentSection = 'login'">LOGIN</button>
        </div>
      </header>
  
      <div class="hello">
    <h1>Authentication demo</h1>
    <p>{{ msg }}</p>
    <div class="button-container">
    <input type="button" @click="sendRequest('post', 'login', { username: 'joeuser', userpass: 'joeXXX' })" value="LOGIN BAD" />
    <input type="button" @click="sendRequest('post', 'login', { username: 'john_doe', userpass: 'johnpass' })" value="LOGIN USER" />
    <input type="button" @click="sendRequest('post', 'login', { username: 'admin', userpass: 'adminpass' })" value="LOGIN ADMIN" />
    <input type="button" @click="sendRequest('get', 'protected')" value="ACCESS /protected" />
    <input type="button" @click="sendRequest('get', 'user')" value="ACCESS /user" />
    <input type="button" @click="sendRequest('get', 'admin')" value="ACCESS /admin" />
    <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
  </div>
      </div>


    </div>
</template>

<script>
import usersData from "../json/users.json";

export default {
  data() {
    return {
      
       msg: 'Welcome to Your Vue.js App',
       usersData: [],
       isAuthenticated: false, // État d'authentification
      userRole: '', // Rôle de l'utilisateur
      userName: '', // Nom d'utilisateur connecté

    };
  },
  methods: {

    async loadAllUsers() {
    try {
        let responseUsers = await fetch('http://localhost:3000/users/list'); 
        this.usersData = await responseUsers.json(); 
    } catch (error) {
        console.error("Erreur lors du chargement des users :", error);
    }
  },

  async loadUser() {
      try {
        const response = await fetch('http://localhost:3000/users/list');
        if (!response.ok) {
          const msg = await response.text();
          alert("Erreur chargement users: " + msg);
          return;
        }
        let allUsers = await response.json();
        this.usersData = allUsers.filter(emp => emp.id_bar === barId);
        console.log("Employés chargés:", this.usersData);
      } catch (error) {
        console.error("Erreur chargement users:", error);
      }
    },


    
    async sendRequest(method, endpoint, params) {
      try {
        let response = null;
        if (method === "post") 
          response = await this.$http.post("http://localhost:3000/auth/"+endpoint, params);
        else
          response = await this.$http.get("http://localhost:3000/auth/"+endpoint);
        this.msg = JSON.stringify(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    
     // Fonction pour gérer la connexion
     async loginUser(username, password) {
      try {
        const response = await this.$http.post("http://localhost:3000/auth/login", {
          username: username,
          userpass: password,
        });

        if (response.data && response.data.loginResult) {
          // Mettre à jour les informations utilisateur
          const userResponse = await this.$http.get("http://localhost:3000/auth/user");
          if (userResponse.data) {
            this.isAuthenticated = true;
            this.userName = userResponse.data.user_name;
            this.userRole = userResponse.data.user_role;
            this.msg = `Login successful for ${this.userName}`;
          }
        } else {
          this.isAuthenticated = false;
          this.msg = "Invalid credentials.";
        }
      } catch (error) {
        console.error("Login error:", error);
        this.msg = "An error occurred during login.";
      }
    },

    // Fonction pour gérer la déconnexion
    async logoutUser() {
      try {
        const response = await this.$http.get("http://localhost:3000/auth/logout");
        if (response.data && response.data.logoutResult) {
          this.isAuthenticated = false;
          this.userName = '';
          this.userRole = '';
          this.msg = "Logout successful.";
        } else {
          this.msg = "Logout failed.";
        }
      } catch (error) {
        console.error("Logout error:", error);
        this.msg = "An error occurred during logout.";
      }
    },

    // Fonction pour accéder aux routes protégées
    async accessProtected(endpoint) {
      try {
        const response = await this.$http.get(`http://localhost:3000/auth/${endpoint}`);
        if (response.data) {
          this.msg = `Access to ${endpoint}: ${JSON.stringify(response.data)}`;
        } else {
          this.msg = `Access denied to ${endpoint}`;
        }
      } catch (error) {
        console.error("Protected route access error:", error);
        this.msg = "An error occurred while accessing the route.";
      }
    },
    
},

  }

</script>


  
  <style scoped>



  /* Centrer les boutons */
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  /* Style des boutons */
  .button-container input[type="button"] {
    background-color: #4CAF50; /* Vert */
    color: white; /* Texte blanc */
    border: none; /* Pas de bordure */
    border-radius: 5px; /* Coins arrondis */
    padding: 10px 20px; /* Espacement interne */
    font-size: 16px; /* Taille du texte */
    font-family: Arial, sans-serif; /* Police moderne */
    cursor: pointer; /* Curseur en forme de main */
    margin: 10px; /* Espacement entre les boutons */
    transition: background-color 0.3s ease, transform 0.2s ease; /* Effets de survol */
  }

  /* Effet au survol */
  .button-container input[type="button"]:hover {
    background-color: #45a049; /* Vert un peu plus foncé */
    transform: scale(1.05); /* Léger agrandissement */
  }

  /* Effet au clic */
  .button-container input[type="button"]:active {
    background-color: #3e8e41; /* Vert encore plus foncé */
    transform: scale(0.98); /* Léger rétrécissement */
  }
  /* Global Header Styles */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 10px 20px;
  }
  
  .logo-image {
    height: 50px;
    width: auto;
  }
  
  .navbar {
    display: flex;
    gap: 15px;
  }
  
  .navbar button, .barPage, .login {
    padding: 10px 20px;
    background-color: #05a04b;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1em;
    border-radius: 4px;
  }
  
  .navbar button:hover, .login:hover {
    background-color: #e07b37;
  }
  
  /* Centered Form Styles */
  .form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .form-container h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
  }
  
  .form-container button {
    background-color: #05a04b;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1em;
  }
  
  .form-container button:hover {
    background-color: #e07b37;
  }
  
  .create-account-button {
    margin-top: 15px;
    background-color: transparent;
    color: #333;
    text-decoration: underline;
    border: none;
    cursor: pointer;
    font-size: 1em;
  }
  
  
  .success-message {
    margin-top: 15px;
    color: green;
    font-weight: bold;
  }
  </style>