$(document).ready(function(){

	var thronesGame = {
		hero_list: 4,
		enemy_list: 0,
		user_character: {},
		enemy_selection: {},
		text_box: $("#comment-box"),
		attack_button: $("#attack"),
		reset_button: $("#reset"),
		characters: $(".characters"),
		health: $(".hp"),
		heroes: [{
			name: "Tormund",
			base_hp: "100",
			hp: "100",
			base_ap: "10",
			ap: "10",
			counter_ap: "10",
			char_id: "0",
		}, {
			name: "The Mountain",
			base_hp: "120",
			hp: "120",
			base_ap: "15",
			ap: "15",
			counter_ap: "15",
			char_id: "1",
		}, {
			name: "Jon Snow",
			base_hp: "140",
			hp: "140",
			base_ap: "20",
			ap: "20",
			counter_ap: "20",
			char_id: "2",
		}, {
			name: "Night King",
			base_hp: "160",
			hp: "160",
			base_ap: "25",
			ap: "25",
			counter_ap: "25",
			char_id: "3",
		}],

		startGame: function () {

// Reset game functions

			$(this.text_box).html("Select your hero.");
			$(this.attack_button).prop('disabled', true);
			$(this.reset_button).prop('disabled', true);

//Reset character attributes

			for (var i = 0; i < 4; i++) {

				// Set HP
				this.heroes[i].hp = this.heroes[i].base_hp;
				$(this.health[i]).html(this.characters[i].base_hp);

				// Set AP
				this.heroes[i].ap = this.heroes[i].base_ap;

				// Zombify (return from dead) heroes
				$(this.characters).find("img").removeClass("dead");
			}

//Reset Character Positioning
			$("#hero-1").css({
				"top": "0",
				"right": "75%",
			});
			$("#hero-2").css({
				"top": "0",
				"right": "55%",
			});
			$("#hero-3").css({
				"top": "0",
				"right": "35%",
			});
			$("#hero-4").css({
				"top": "0",
				"right": "0%",
			});

			this.hero_list = 4; 

			this.enemy_list = 0;

			this.user_character = {};

			this.enemy_selection = {};

		},

		// User Choose Hero Function

		chooseHero: function (player) {
			for (var i = 0; i < this.hero_list; i++) {
				if (this.heroes[i].name === $(player).find(".name").text()) {
					this.user_character = this.heroes[i];
					} 
				} 
				this.hero_list--;
				player.animate({
					top: "250px",
					right: "60%"
					}, 200);

			$(this.text_box).html("Select an enemy to attack.");
			},

		// User Choose Enemy Function

		chooseEnemy: function (enemy) {
			if (this.enemy_list === 0) {

				for (var i = 0; i < this.characters_length; i++) {
					
					if (this.characters[i].name === $(enemy).find(".name").text()) {

						this.active_enemy = this.characters[i];
					} 
				}

				this.hero_list--;

				enemy.animate({
					top: "250px",
					right: "20%"
				}, 200);

				this.enemy_list = 1;

				$(this.attack_button).prop('disabled', false);
			}
		},

	attack: function () {
			// Attack
			this.enemy_selection.hp = this.enemy_selection.hp - this.user_character.ap;

			this.user_character.ap = this.user_character.ap + this.user_character.base_ap;

			$(this.health[this.enemy_selection.char_id]).html(this.enemy_selection.hp);

			if (this.enemy_selection.hp <= 0) {

				if (this.hero_list !== 0) {
					$(this.text_box).html("You have killed " + this.enemy_selection.name + "<br>Select another enemy to fight.");
				} else {
					$(this.text_box).html("You have killed " + this.enemy_selection.name + "<br>Congratulations! The Iron Throne is yours!");
					$(this.restart_button).prop('disabled', false);

				} 

				$(this.health[this.enemy_selection.char_id]).html("0");
				$(this.characters[this.enemy_selection.char_id]).animate({right: "0%"}, 200).fadeOut(1000);
				$(this.characters[this.enemy_selection.char_id]).find("img").addClass("graveyard");

				this.enemy_selection = {};
				this.enemy_list = 0;
				$(this.attack_button).prop('disabled', true);

			} 


			// Counter Attack Section
			if (this.enemy_selection.char_id !== undefined) {
				this.user_character.hp = this.user_character.hp - this.enemy_selection.counter_ap;
				$(this.health[this.user_character.char_id]).html(this.user_character.hp);
				$(this.text_box).html(this.enemy_selection.name + " received " + this.user_character.ap + " damage. <br>" + this.user_character.name + " received " + this.enemy_selection.counter_ap + " damage.");

			}

			// Select next character
			if (this.user_character.hp <= 0) {
				$(this.health[this.user_character.char_id]).html("0");
				$(this.characters[this.user_character.char_id]).find("img").addClass("graveyard");
				$(this.text_box).html("You have been killed by " + this.enemy_selection.name + "...and here ends your quest for the Iron Throne.");
				$(this.attack_button).prop('disabled', true);
				$(this.restart_button).prop('disabled', false);

			}
		}
	}

thronesGame.startGame();

	$(thronesGame.characters).on("click", function (e) {

		if (thronesGame.hero_list === 4) {

			thronesGame.chooseHero($(this));

		} else {

			thronesGame.chooseEnemy($(this));

		} 

	}); 

	$(thronesGame.attack_button).on("click", function (e) {

		thronesGame.attack();

	});

	$(thronesGame.restart_button).on("click", function (e) {

		thronesGame.startGame();

	})

});