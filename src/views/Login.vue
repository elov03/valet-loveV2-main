<template>
  <div>
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
      <h1>Authentication Demo</h1>
      <p>{{ msg }}</p>

      <!-- Login form -->
       <div v-if="isLogin">
        <div class="login-form">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          <input type="button" @click="handleLogin()" value="Log in"/>
          <input type="button" @click="sendRequest('get', 'logout')" value="LOGOUT" />
        </div>
    </div>
    </div>
  </div>
</template>




<script>

export default {
  name: 'Authenficitaion',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLogin : true,
    };
  },
  methods: {

    //Sends an asynchronous HTTP request.
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


   //Manages the asynchronous user connection.
    async handleLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Call your sendRequest function here
            this.sendRequest('post', 'login', { username: username, userpass: password });
        },
    
  },
};
</script>



<style scoped>

/* Login form */
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.login-form input {
  width: 250px;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #3cb371;
  border-radius: 5px;
}

.btn-login {
  background-color: #3cb371;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #228b22;
}

/* User informationr */
.user-info {
  text-align: center;
  margin-top: 20px;
}

.user-name {
  font-weight: bold;
  color: #2e8b57;
}

.user-role {
  font-weight: bold;
  color: #3cb371;
}

.btn-logout {
  background-color: #ff6347;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #e53935;
}

/* Messages */
.status-msg {
  color: #2e8b57;
  margin-top: 10px;
  font-weight: bold;
}

  /* the buttons */
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }


  .button-container input[type="button"] {
    background-color: #4CAF50; 
    color: white; 
    border: none; 
    border-radius: 5px; 
    padding: 10px 20px; 
    font-size: 16px; 
    font-family: Arial, sans-serif;
    cursor: pointer; 
    margin: 10px; 
    transition: background-color 0.3s ease, transform 0.2s ease; 
  }

 
  .button-container input[type="button"]:hover {
    background-color: #45a049; 
    transform: scale(1.05); 
  }


  .button-container input[type="button"]:active {
    background-color: #3e8e41; 
    transform: scale(0.98); 
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
