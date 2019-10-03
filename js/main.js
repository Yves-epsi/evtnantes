var apiURL =
  "https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=";
var config = {
  headers: {
    Authorization: "Bearer 2cd67fced32aab17238dfd9138524bd9f39815e1"
  }
};

/**
 * Actual demo
 */
var demo = new Vue({
  el: "#demo",

  data: {
    branches: ["master", "dev"],
    currentBranch: "master",
    commits: null
  },

  created: function() {
    //au moment de la création
    //il aurait été possible de mettre mounted mais created le lance plutôt
    //lors de la création lancement de la méthode
    this.fetchData();
  },

  watch: {
    //permet de surveiller la valeur de currentBranch en temps réeel, si elle change, la fct fetchData est lancé.
    currentBranch: "fetchData"
  },

  filters: {
    truncate: function(v) {
      var newline = v.indexOf("\n");
      return newline > 0 ? v.slice(0, newline) : v;
    },
    formatDate: function(v) {
      return v.replace(/T|Z/g, " ");
    }
  },

  methods: {
    fetchData: function() {
      //authentification et accès à apiURL du prof
      var self = this;
      axios
        .get(apiURL + self.currentBranch, config)
        .then(function(response) {
          console.log(response);
          self.commits = response.data;
          console.log(self.commits[0].html_url);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
