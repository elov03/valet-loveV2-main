<template>
  <div v-if="bar">
    <header>
      <div class="logo-container">
        <img src="/image/logo.png" alt="Logo" class="logo-image">
      </div>
      <div class="navbar">
        <router-link :to="{ name: 'BarPage'}" class="barPage">HOME</router-link>
        <button @click="currentSection = 'About'">ABOUT</button>
        <button @click="currentSection = 'favorite'">FAVORITE</button>
        <router-link :to="{ name: 'Login'}" class="login">LOGIN</router-link>
      </div>
    </header> 


    <main>
      <!-- Home Section -->
      <section v-if="currentSection === 'home'" class="home-section">
        
        <div class="description">
          <h1 class="title">{{ bar.name }}</h1>
          <p v-html="bar.fool_description"></p>

        </div>

        <div class="items">
          <div class="drinks-section">
            <img src="/image/Drinks_item.png" alt="Drinks Item">
            <button @click="currentSection = 'drinks'">DRINKS</button>
          </div>

          <div class="games-section">
            <img src="/image/Games_item.png" alt="Games Item">
            <button @click="currentSection = 'games'">GAMES</button>
          </div>

          <div class="employee-section">
            <img src="/image/Employee_item.png" alt="Employee Item">
            <button @click="currentSection = 'employee'">EMPLOYEE</button>
          </div>
        </div>

        <!-- Location Section with Toggleable Hours -->
        <div class="location">
          <h3>Location</h3>
          <div class="location-content">
            <img :src="bar.image_map" alt="Map to the bar" class="map-image">
            <div class="location-details">
              <p><strong>Address:</strong> {{ bar.address }}</p>
              <div class="schedule-container">
                <p><strong>Opening times</strong></p>
                <button @click="toggleHours">
                  {{ showHours ? "See less" : "See the hours" }}
                </button>
                <div v-if="showHours" class="hoursList">
                  <ul>
                    <li v-for="(hours, day) in bar.hours" :key="day">{{ day }}: {{ hours }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section (not implemented)-->
      <section v-if="currentSection === 'About'">
        <p>About Page</p>
      </section>

      <!-- Favorite Section (not implemented)-->
      <section v-if="currentSection === 'favorite'">
        <p>Favorite Page</p>
      </section>

      <!-- Drinks Section -->
      <section v-if="currentSection === 'drinks'">
        <button @click="currentSection = 'home'" class="back-button">← Back to Home</button>
        <h2 class="centered-title">Available Drinks</h2>
        <button @click="addDrink" class="add-button">+ Add a drink</button>
        <table class="drink-table" v-if="filteredDrinks.length > 0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Price (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(drink, index) in filteredDrinks" :key="index">
              <td><img :src="drink.image" :alt="drink.name_drink" class="drink-image"></td>
              <td>{{ drink.name_drink }}</td>
              <td>{{ drink.ingredient_drink }}</td>
              <td>{{ drink.price_selling_drink }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No drinks available for this bar</p>
      </section>

      <!-- Games Section -->
      <section v-if="currentSection === 'games'">
        <button @click="currentSection = 'home'" class="back-button">← Back to Home</button>
        <h2 class="centered-title">Available Games</h2>
        <button @click="addGame" class="add-button">+ Add a game</button>
        <table class="game-table" v-if="filteredGames.length > 0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (€)</th>
              <th>Time</th>
              <th>Min Players</th>
              <th>Max Players</th>
              <th>State</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in filteredGames" :key="index">
              <td>
                <img :src="game.image" :alt="game.name_game" class="game-image">
              </td>
              <td v-if="!game.editMode">{{ game.name_game }}</td>
              <td v-else>
                <input v-model="game.name_game" placeholder="Enter game name">
              </td>
              <td v-if="!game.editMode">{{ game.price_game }}</td>
              <td v-else>
                <input v-model="game.price_game" placeholder="Enter price">
              </td>
              <td v-if="!game.editMode">{{ game.time_game }}</td>
              <td v-else>
                <input v-model="game.time_game" placeholder="Enter time">
              </td>
              <td v-if="!game.editMode">{{ game.nb_people_min_game }}</td>
              <td v-else>
                <input v-model="game.nb_people_min_game" placeholder="Enter min players">
              </td>
              <td v-if="!game.editMode">{{ game.nb_people_max_game }}</td>
              <td v-else>
                <input v-model="game.nb_people_max_game" placeholder="Enter max players">
              </td>
              <td v-if="!game.editMode">{{ game.state_game }}</td>
              <td v-else>
                <select v-model="game.state_game">
                  <option>Perfect</option>
                  <option>Available</option>
                  <option>Bad</option>
                </select>
              </td>
              <td>
                <button v-if="!game.editMode" @click="editGame(index)">Update</button>
                <button v-else @click="saveGame(index)">Save</button>
              </td>
              <td>
                <button @click="sendDeleteRequestGame(index+1)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No games available</p>
      </section>

      <!-- Employee Section -->
      <section v-if="currentSection === 'employee'">
        <button @click="currentSection = 'home'" class="back-button">← Back to Home</button>
        <h2 class="centered-title">Our Employee</h2>
        <button @click="addEmployee" class="add-button">+ Add an Employee</button>
      
        <table class="employee-table" v-if="filteredEmployee.length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Post</th>
              <th>Age</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in filteredEmployee" :key="index">
              <td v-if="!employee.editMode">{{ employee.id_employee }}</td>
              <td v-else>
                <input v-model="employee.id_employee" placeholder="Enter employee id">
              </td>
              <td v-if="!employee.editMode">{{ employee.name_employee }}</td>
              <td v-else>
                <input v-model="employee.name_employee" placeholder="Enter employee name">
              </td>
              <td v-if="!employee.editMode">{{ employee.post_employee }}</td>
              <td v-else>
                <input v-model="employee.post_employee" placeholder="Enter employee post">
              </td>
              <td v-if="!employee.editMode">{{ employee.age_employee }}</td>
              <td v-else>
                <input type="number" v-model="employee.age_employee" placeholder="Enter age">
              </td>
              <td>
                <button v-if="!employee.editMode" @click="editEmployee(index)">Update</button>
                <button v-else @click="saveEmployee(index)">Save</button>
              </td>
              <td>
                <button @click="sendDeleteRequestEmployee(employee.id_employee)">Delete</button><!--was index before but index is number of line and not id-->
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No employee available</p>
      </section>

    </main>
  </div>
</template>

<script>
import barsData from "../json/bar.json";
import drinksData from "../json/drinks.json";
import barDrinksData from "../json/bar_drinks.json";
import gamesData from "../json/games.json";
import barGamesData from "../json/bar_games.json";
import employeesData from "../json/employee.json";
import deleteFromFile from "../../js/delete.js"

export default {
  name: "Bar",
  data() {
    return {
      currentSection: "home",
      bar: null,
      barDrinks: [],
      barGames: [],
      barEmployees: [],
      showHours: false,
    };
  },




  
  mounted() {
    const barId = parseInt(this.$route.params.barId, 10);
    this.loadBarData();
    this.loadBarGames(barId);
    this.loadBarEmployees(barId); // Uses the dynamic identifier
    this.loadAllDrinks();
    this.bar = barsData.find(bar => bar.id_bar === barId);
    
    },


  computed: {
    filteredEmployee() {
      return this.barEmployees;
    },
    filteredGames() {
      return this.barGames;
    },
    filteredDrinks() {
      return this.barDrinks;
    }
  },

  methods: {
  loadBarData() {
    const barId = parseInt(this.$route.params.id, 10);
    this.bar = barsData.find(bar => bar.id_bar === barId);
  },
    
  toggleHours() {
    this.showHours = !this.showHours;
  },
  //----------------------------------------DRINKS---------------------------------------------------
  async loadAllDrinks() {
    try {
        let responseGames = await fetch('http://localhost:3000/drinks/list'); 
        this.barGames = await responseGames.json(); 
    } catch (error) {
        console.error("Error when loading drinks :", error);
    }
  },











  //----------------------------------------GAMES----------------------------------------------------
  
  async loadAllGames() {
    try {
        let responseGames = await fetch('http://localhost:3000/games/list'); // Appel API pour récupérer tous les jeux
        this.barGames = await responseGames.json(); 
    } catch (error) {
        console.error("Erreur lors du chargement des jeux :", error);
      }
  },
  async loadBarGames(barId) {
      try {
        const responsegames = await fetch('http://localhost:3000/games/list');
        if (!responsegames.ok) {
          const msg = await responsegames.text();
          alert("Erreur chargement des games: " + msg);
          return;
        }
        let allGames = await responsegames.json();
        
        const responsebargames = await fetch('http://localhost:3000/bargames/list');
        if (!responsebargames.ok) {
          const msg = await responsebargames.text();
          alert("Erreur chargement des bar games: " + msg);
          return;
        }
        let allBarGames = await responsebargames.json();
        
        const associatedGameIds = [];
        for (const bg of allBarGames) {
          if (bg.id_bar === barId) {
            associatedGameIds.push(bg.id_game);
          }
        }

        if (associatedGameIds.length === 0) {
          console.warn(`Aucun jeu associé au bar avec ID ${barId}`);
          this.barGames = [];
          return;
        }

        // Filter the games to include only those associated with the bar
        this.barGames = allGames.filter(game => associatedGameIds.includes(game.id_game));

        //this.barWorkers = allGames.filter(gmes => gmes.id_bar === barId);
        console.log("Employés chargés:", this.barGames);
      } catch (error) {
        console.error("Erreur chargement employés:", error);
      }
  },
  async addGame(){
    try {
        alert("CREATE... ");
        let response = await this.$http.get("http://localhost:3000/games/create");
        this.loadAllGames();
      }
      catch (ex) { console.log(ex); }
  },
  async addEmployee() {
      // Exemple pour ajouter un employé
      const barId = parseInt(this.$route.params.barId, 10);
      const newEmployee = {
        id_drink: 0,
        id_bar: barId
      };
      try {
        const response = await fetch("http://localhost:3000/employees/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEmployee)
        });
        if (!response.ok) throw new Error("Erreur lors de la création");
        await this.loadBarEmployees(barId);
      } catch (error) {
        console.error("Erreur ajout employé:", error);
      }
  },
  async sendDeleteRequestEmployee(employeeId) {
    try {
      const barId = parseInt(this.$route.params.barId, 10);

      // Appel GET pour supprimer l'employé
      const response = await fetch(`http://localhost:3000/employees/del/${employeeId}`, {
        method: "GET"
      });

      if (!response.ok) {
        const errMsg = await response.text();
        alert("Erreur lors de la suppression de l'employé : " + errMsg);
        return;
      }

      let result = await response.json();
      console.log("Employee deleted:", result);

      // Actualiser la liste des employés
      await this.loadBarEmployees(barId);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
      alert("Une erreur est survenue lors de la suppression de l'employé.");
    }
  },
 



  //---------------------------------------EMPLOYEES-------------------------------------------------------
  async loadAllEmployees() {
    try {
        let responseEmployees = await fetch('http://localhost:3000/employees/list'); 
        this.barEmployees = await responseEmployees.json(); 
    } catch (error) {
        console.error("Error when loading employees :", error);
    }
  },



  //displays employees according to the bar to which they are assigned using the bar id
  async loadBarEmployees(barId) {
      try {
        const response = await fetch('http://localhost:3000/employees/list');
        if (!response.ok) {
          const msg = await response.text();
          alert("Employee loading error : " + msg);
          return;
        }
        let allEmployees = await response.json();
        this.barEmployees = allEmployees.filter(emp => emp.id_bar === barId);
        console.log("Employees in charge:", this.barEmployees);
      } catch (error) {
        console.error("Employee loading error :", error);
      }
    },




//add an employee to my database
async addEmployee() {
      const barId = parseInt(this.$route.params.barId, 10);
      const newEmployee = {
        name_employee: "Default Name",
        age_employee: 0,
        gender_employee: "M",
        post_employee: "Default Post",
        salary_employee: 0,
        id_bar: barId
      };
      try {
        const response = await fetch("http://localhost:3000/employees/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEmployee)
        });
        if (!response.ok) throw new Error("Error during creation");
        await this.loadBarEmployees(barId);
      } catch (error) {
        console.error("Employee addition error :", error);
      }
    },

    //Activates edit mode for an employee
    async editEmployee(index) {
    this.$set(this.barEmployees[index], 'editMode', true);
  },
    
  //save the employee after editing it
    async saveEmployee(index) {
    try {
      const barId = parseInt(this.$route.params.barId, 10);
      const employee = this.barEmployees[index];

      // Data to be sent to the API for updating
      const updateData = {
        id_bar: employee.id_bar,
        name_employee: employee.name_employee,
        age_employee: employee.age_employee,
        gender_employee: employee.gender_employee,
        post_employee: employee.post_employee,
        salary_employee: employee.salary_employee
      };

      // Call the API to update the employee
      const response = await fetch(`http://localhost:3000/employees/update/${employee.id_employee}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        alert("Error updating employee : " + errorMessage);
        return;
      }

      const result = await response.json();
      console.log("Employee updated:", result);

      // Désactiver le mode édition
      this.$set(this.barEmployees[index], 'editMode', false);

      // Recharger la liste des employés pour refléter les changements
      await this.loadBarEmployees(barId);
    } catch (error) {
      console.error("Error updating employee :", error);
      alert("An error has occurred while updating the employee.");
    }
  },
  

  //deletes the employee acr to her id
  async sendDeleteRequestEmployee(employeeId) {
    try {
      const barId = parseInt(this.$route.params.barId, 10);

      // GET call to delete the employee
      const response = await fetch(`http://localhost:3000/employees/del/${employeeId}`, {
        method: "GET"
      });

      if (!response.ok) {
        const errMsg = await response.text();
        alert("Error when deleting employee : " + errMsg);
        return;
      }

      let result = await response.json();
      console.log("Employee deleted:", result);

      // Update the list of employees by calling the loadBarEmployees function
      await this.loadBarEmployees(barId);
    } catch (error) {
      console.error("Error when deleting employee :", error);
      alert("An error occurred when deleting the employee.");
    }
  },
}
}
</script>
  

<style scoped>


/* Body Style */
body {
  background-color: #f0f0f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header Section */
header {
  display: flex; /* Flexbox for layout */
  justify-content: space-between; /* Align logo and buttons */
  align-items: center; /* Vertical alignment */
  color: white;
  padding: 10px 20px; /* Inner spacing */
}

.logo-container {
  display: flex; /* For flexibility */
  align-items: center; /* Center vertically */
}

.logo-image {
  height: 50px; /* Adjust logo height */
  width: auto; /* Maintain proportions */
}

/* Navbar */
.navbar {
  display: flex; /* Align buttons in a row */
  gap: 15px; /* Space between buttons */
}

.navbar button, .barPage, .login {
  padding: 10px 20px;
  background-color: #05a04b;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar button:hover, .barPage:hover, .login:hover {
  background-color: #e07b37;
}

/* Section Titles */
.centered-title {
  text-align: center;
  margin: 20px 0;
  font-size: 1,8em;
}

/* Home Section */
.home-section .drinks, .games{
  text-align: center;
  margin-top: 20px;
}

.description {
  margin: 20px 0;
  text-align: center;
}




.items {
  display: flex;
  justify-content: center;
  gap: 20px; /* Space between elements */
  margin-top: 20px;
}
.items button{
  border: 2px solid red; /* Debug visual */
}

/* Buttons in Sections */
.drinks-section,
.games-section,
.employee-section {
  display: flex;
  flex-direction: column; 
  align-items: center;    
  
}

.drinks-section button, .games-section button, .employee-section button {
  padding: 10px 20px;
  background-color: #05a04b;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.drinks-section img,
.games-section img,
.employee-section img {
  width: 300px;   /* Ajustez la taille de l'image */
  height: auto;
  margin-bottom: 10px; /* Espacement entre l'image et le bouton */
}

.employee-image{
  width: 100px;
  height: auto;
}


.drinks-section button:hover, .games-section button:hover, .employee-section button:hover {
  background-color: #e07b37;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Table Styles */
.drink-table, .game-table, .employee-table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.drink-table th, .drink-table td, .game-table th, .game-table td, .employee-table th, .employee-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.drink-table th, .game-table th, .employee-table th {
  background-color: #ff8c42;
  color: white;
  font-weight: bold;
}

.drink-table tr:nth-child(even), .game-table tr:nth-child(even), .employee-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.drink-table tr:hover, .game-table tr:hover, .employee-table tr:hover {
  background-color: #f1f1f1;
}

/* Images in Tables */
.drink-image, .game-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

/* Location Section */
.location {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
}

.location-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
}

.location-details {
  padding-left: 20px;
}

.map-image {
  width: 400px;
  height: auto;
  margin-right: 20px;
  border-radius: 8px;
}

/* Schedule Section */
.schedule-container {
  margin-top: 10px;
}

.schedule-container button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff8c42;
  color: white;
  border: none;
  cursor: pointer;
}

.schedule-container button:hover {
  background-color: #ff7b2d;
}

.hoursList ul {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.hoursList li {
  margin: 5px 0;
}

/*bar section*/
.bar-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

</style>
