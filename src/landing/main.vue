<template>
    <b-row class="content" align-v="center">
    	<b-col lg="12" class="slideshow-container">
    		<b-table striped hover :items="teams" id="scores-table">
              <template slot="Membres" slot-scope="data">
                <div class="autoscroll-cell">
                    <span class="autoscroll-cell-content" v-html="data.value">
                    </span>
                </div>
              </template>      
            </b-table>
    	</b-col>
        <div class="announces">
            <div class="autoscroll-cell">
                <span class="autoscroll-cell-content">
                   <span v-html="announceBanner"></span>
                </span>
            </div>
        </div>
    </b-row>
</template>

<script>
import ProjectImage from "../hd-image/main.vue";
export default {
  data () {
    return {
        announcesData: [],
        announces: [],
        autoScrolls: [],
        teamsData: [],
        teams: []
    }
  },
  components: {
    "project-image" : ProjectImage
  },
  computed: {
    "announceBanner" : function() {
        var result = "";
        for (let i = 0; i < this.announces.length; i++) {
            result = result + "<span class=\"atom-announce bg-" + this.announces[i].type + "\">" + this.announces[i].content + "</span>";
        }
        return result;
    }
  },
  methods: {
    "formatAnnounces": function() {
        let result = [];
        for (let i = 0; i < this.announcesData.length; i++) {
            result.push({
                "id" : this.announcesData[i].id,
                "content" : this.announcesData[i].content,
                "type" : this.announcesData[i].type
            });
        }

        return result;
    },
    "formatTeams": function() {
        let result = [];
        for (let i = 0; i < this.teamsData.length; i++) {
            var additionnalBonus = 0;
            var additionnalMalus = 0;

            for (let j = 0; j < this.teamsData[i].persons.length; j++) {
                additionnalBonus += this.teamsData[i].persons[j].bonus;
                additionnalMalus -= this.teamsData[i].persons[j].malus;
            }

            result.push({
                "Equipe": this.teamsData[i].name,
                "Couleur": this.teamsData[i].color,
                "Membres": this.formatMembers(this.teamsData[i].persons),
                "Points des jeux": this.teamsData[i].points,
                "Bonus" : this.teamsData[i].bonus + additionnalBonus,
                "Malus" : this.teamsData[i].malus + additionnalMalus,
                "TOTAL" : this.teamsData[i].bonus - this.teamsData[i].malus + this.teamsData[i].points + additionnalBonus + additionnalMalus
            });

            result.sort(function(a, b) {
                return b.TOTAL - a.TOTAL;
            })
        }

        return result;
    },
    "formatMembers": function(list) {
        var result = "";
        for (let i = 0; i < list.length; i++) {
            result += list[i].firstname + " " + list[i].lastname + " " +
            "<span class=\"green-text\">+" + list[i].bonus + "</span> " + 
            "<span class=\"red-text\">-" + list[i].malus + "</span> ";
        }
        return result;
    },
    "updateData": function() {
        this.axios.get("https://wanaweekend.corentin-baur.fr/api/announces/").then((response) => {
          this.announcesData = response.data;
          this.announces = this.formatAnnounces(this.announcesData);
        });
        this.axios.get("https://wanaweekend.corentin-baur.fr/api/teams/").then((response) => {
          this.teamsData = response.data;
          this.teams = this.formatTeams(this.teamsData);
        });
        setTimeout(this.animateAutoscroll, 0);
    },
    "animateAutoscroll" : function() {
        // Animate autotextscroll cells
        for (let i = 0; i < this.autoScrolls.length; i++) {
            clearInterval(this.autoScrolls[i]);
        }
        this.autoScrolls = []
        var elts = document.getElementsByClassName("autoscroll-cell-content");
        var widths = [];
        this.autoScrolls.push(setInterval(() => {
            this.relativePosition -= 0.6;
            if (widths.length !== elts.length) {
                widths.length = 0;
                for (let i = 0; i < elts.length; i++) {
                    widths.push(elts[i].offsetWidth);
                }
            }
            
            for (let i = 0; i < elts.length; i++) {
                elts[i].style.left = this.relativePosition % (widths[i] + elts[i].parentElement.offsetWidth) + "px";
                elts[i].style.marginLeft = elts[i].parentElement.offsetWidth + "px";
            }
        }, 16));
    }
  },
  mounted () {
    this.updateData();
    this.relativePosition = 0;
    setInterval(this.updateData, 5000);
  }
}
</script>
<style>
.slideshow-container {
    height: 100%;
}
body {
    height: 100%;
}
#scores-table {
    background-color: white;
}
/*#scores-table thead {
    display: none;
}*/
#scores-table td {
    max-width: 650px;
}

#scores-table tr {
    height: 75px;
    line-height: 75px;
    font-size: 25px;
}

.autoscroll-cell {
    overflow: hidden;
    white-space:nowrap;
    color: black;
}

.autoscroll-cell-content {
    position: relative;
    margin-left: 650px;
}

.announces {
    position: absolute;
    bottom: 0px;
    width: 100%;
    background: white;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
}
.announces p {
    display: inline;
}
.atom-announce {
    padding-left: 50px;
    padding-right: 50px;
}

.green-text {
    color: green;
}

.red-text {
    color: red;
    margin-right: 10px;
}
</style>
