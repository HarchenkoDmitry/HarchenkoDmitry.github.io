"use strict";

// (function() {

	var widthCtx = 15; // ширина поля
	var heightCtx = 25; // выоста поля
	var k = 15; // размер кубика

	var first = true; // первая фигура
	var shape; // массив для хранения фигурки
	var shapeCopy = [ [0, 0, 0, 0], [0, 0, 0, 0] ]; // массив для хранения копии фигур
  var nextShape = [ [10, 10, 10, 10], [10, 10, 10, 10] ]; // массив для хранения след фигур
  var shapeNumber = -1; // Номер фигуры
  var nextShape; // следующая фигура

	var sizeFieldNextShape = 8; // размер для поля след фигуры

	var r = 1; // Для поворота фигур 4 и 5

	var timerId; // id таймера для отключения

	var tetrisField = document.querySelector('#my_canvas');
	var ctx = tetrisField.getContext('2d');

	// ширина и высота холста
	tetrisField.width = widthCtx * k + sizeFieldNextShape * k;
	tetrisField.height = heightCtx * k;

	// 0 - пустая клетка
	// 1 - застывший кубик
	// 2 - границы поля
	var field = []; // массив для хранения поля
	function createField() {
		for(var i = 0; i < widthCtx + sizeFieldNextShape; i++) {
			field[i] = [];
			for(var j = 0; j < heightCtx; j++) {
				field[i][j] = 0;
			}
		}
		// Рисуем стакан (границыы поля)
		for (var i = 0; i < widthCtx; i++) {
			field[i][heightCtx - 1] = 2;
		}
		for (var i = 0; i < heightCtx; i++) {
	    field[0][i] = 2;
	    field[widthCtx - 1][i] = 2;
		}
		// Рисуем место для след фигуры
		for (var i = widthCtx + 1; i < widthCtx + sizeFieldNextShape; i++) {
			field[i][0] = 2;
			field[i][sizeFieldNextShape - 2] = 2;
		}
		for (var i = 0; i < sizeFieldNextShape - 1; i++) {
			field[widthCtx + 1][i] = 2;
			field[widthCtx + sizeFieldNextShape - 1][i] = 2;
		}
	}
	


	// рисуем поле и фигуру на холсте
	function fillField() {
		var eccentricity = [widthCtx + sizeFieldNextShape / 2 - defineCenterShape(nextShape).x, sizeFieldNextShape / 2 - 1 - defineCenterShape(nextShape).y]
		ctx.clearRect(0, 0, tetrisField.width, tetrisField.height);
		for (var i = 0; i < widthCtx + sizeFieldNextShape; i++) {
			for (var j = 0; j < heightCtx; j++) {
				if (field[i][j] == 3) {
					ctx.fillStyle = "lightgreen";
					ctx.fillRect(i * k, j * k, k, k);
				}
				if (field[i][j] == 2) {
					ctx.fillStyle = "orange";
					ctx.fillRect(i * k, j * k, k, k);
					ctx.fillStyle = "black";
					ctx.strokeRect(i * k, j * k, k, k);
				}
				if (field[i][j] == 1) {
					ctx.fillStyle = "darkgreen";
					ctx.fillRect(i * k, j * k, k, k);
					ctx.fillStyle = "black";
					ctx.strokeRect(i * k, j * k, k, k);
				}
			}
		}
		// Отрисовки фигур происходт после появления первой фигуры
		if (shapeNumber != -1) {
			for (var i = 0; i < 4; i++) {
				ctx.fillStyle = "lightgreen";
				ctx.fillRect(shape[0][i] * k, shape[1][i] * k, k, k);
				ctx.fillRect((nextShape[0][i] + eccentricity[0]) * k, (nextShape[1][i] + eccentricity[1]) * k, k, k);
				ctx.fillStyle = "black";
				ctx.strokeRect(shape[0][i] * k, shape[1][i] * k, k, k);
				ctx.strokeRect((nextShape[0][i] + eccentricity[0]) * k, (nextShape[1][i] + eccentricity[1]) * k, k, k);
			}
		}
	}


	// функция вызова новой фигуры
	function SetShape() {
		// функция случайных чисел в заданном диапозоне
		function getRandomInRange(max) {
			return Math.floor(Math.random() * (max + 1));
		};

		// определяем центр поля (начальное положение фигуры)
		var mid = Math.floor(widthCtx / 2);

		// для первой фигуры 
		if (shapeNumber < 0) {
			shapeNumber = getRandomInRange(6);
		}

		// задаем выбор фигур (2 и 3 имеют свой центр вращения)
		function switchShape(shapeNumber) {
			var figure;
			switch (shapeNumber) {
				case 0: 
					figure = [ [mid, mid, mid, mid], [0, 1, 2, 3]]; 
					break; 
				case 1: 
					figure = [ [mid, mid, mid - 1, mid - 1], [0, 1, 0, 1] ]; 
					break;
				case 2: 
					figure = [ [mid, mid, mid, mid + 1], [0, 1, 2, 2] ];
					figure.center = true; 
					break;
				case 3: 
					figure = [ [mid, mid, mid, mid - 1], [0, 1, 2, 2] ]; 
					figure.center = true;
					break;
				case 4: 
					figure = [ [mid - 1, mid, mid, mid + 1], [1, 1, 2, 2] ]; 
					break;
				case 5: 
					figure = [ [mid + 1, mid, mid, mid - 1], [1, 1, 2, 2] ]; 
					break;
				case 6: 
					figure = [ [mid, mid - 1, mid, mid + 1], [1, 2, 2, 2] ]; 
					break;
			};
			return figure
		}

		shape = switchShape(shapeNumber);

		shapeNumber = getRandomInRange(6);
		nextShape = switchShape(shapeNumber);

		if (findMistake() && !first) {
			gameOver();
		}
		first = false;
	}


	// фунция проверки ошибки
	function findMistake() {
    for (var i = 0; i < 4; i++) {
      if (shape[0][i] >= widthCtx - 1 || shape[1][i] >= heightCtx - 1 || 
        shape[0][i] <= 0 || shape[1][i] < 0 || 
        field[shape[0][i]][shape[1][i]] != 0) {
          return true; 
        }
    }
    return false;
	}


	// падение фигуры
	function fallShape() {
		for (var i = 0; i < 4; i++) {
			shape[1][i]++;
			if (findMistake()) {
				// при ошибки фозвращаем фигуру назад
				for (i; i >= 0; i--) {
					shape[1][i]--;
				}
				// замораживаем фигуру на поле
				for (var j = 0; j < 4; j++) {
					field[shape[0][j]][shape[1][j]] = 1;
				}

				deletionLine();
				SetShape();
				break
			}
		}
		fillField();
	}


	// отработка нажатия клавиш
	document.onkeypress = function(event) {

		// движение вправо
		if (event.keyCode == 100) {
			for (var i = 0; i < 4; i++) {
				shape[0][i]++;
				if (findMistake()) {
					for (i; i >= 0; i--) {
						shape[0][i]--;
					}
					break;
				}
			}
		}

		// движение влево
		if (event.keyCode == 97) {
			for (var i = 0; i < 4; i++) {
				shape[0][i]--;
				if (findMistake()) {
					for (i; i >= 0; i--) {
						shape[0][i]++;
					}
					break;
				}
			}
		}

		// поворот фигуры
		if (event.keyCode == 119) {
			shapeCopy[0] = shape[0].slice(); // копируем фигуру
			shapeCopy[1] = shape[1].slice();

			var shapeCenter = [0, 0]; // массив для центра фигуры

			// если нет особого центра поворота, то ищем центр фигуры
			if (shape.center) {
				shapeCenter[0] = shape[0][1];
				shapeCenter[1] = shape[1][1];
			} else {
				shapeCenter[0] = defineCenterShape(shape).x;
				shapeCenter[1] = defineCenterShape(shape).y;
			}

			// поворачиваем и выравниваем фигуру
			for (var i = 0; i < 4; i++) {
				shape[0][i] = Math.round(shapeCopy[1][i] - shapeCenter[1] + shapeCenter[0] + 0.01 * r);
				shape[1][i] = Math.round(-(shapeCopy[0][i] - shapeCenter[0]) + shapeCenter[1] + 0.01 * r);
			}

			// при ошибке возвращаем обратно
			if (findMistake()) {
				shape[0] = shapeCopy[0].slice();
				shape[1] = shapeCopy[1].slice();
				r = -r;
			}

			// коэф. необходимый, чтобы фигуры не упазали при развороте
			r = -r;
		}

		// ускорение фигуры
		if (event.keyCode == 115) {
			fallShape();
		}

		// после нажатия любой клавиши перерисовываем поле
		fillField();
	}


	// поиск центра фигуры
	function defineCenterShape(fig) {
		var shapeCenter = [0, 0]; // массив для центра фигуры
		for (var i = 0; i < 4; i++) {
			shapeCenter[0] = shapeCenter[0] + fig[0][i] / 4;
			shapeCenter[1] = shapeCenter[1] + fig[1][i] / 4;
		}
		return {
			x: shapeCenter[0],
			y: shapeCenter[1]
		}
	}


	// удаление линии
	function deletionLine() {
		var line = []; // массив для хранения линий, которые надо удалить

		// проверяем все линии
		for (var j = 1; j < heightCtx - 1; j++) {
			line[j] = true;
			for (var i = 1; i < widthCtx - 1; i++) {
				if (field[i][j] == 0) {
					line[j] = false;
				}
			}
		}

		// удаляем нужные линии и смещаем остальные линии вниз
		for (var j = 1; j < heightCtx - 1; j++) {
			if (line[j]) {
				for (var m = j; m > 1; m--) {
					for (var i = 1; i < widthCtx - 1; i++) {
						field[i][m] = field[i][m - 1];
					}
				}
			}
		}
	}


	// Отрисовка главного меню
	function menuField() {
		shapeNumber = -1; // Номер фигуры
		field = [0]; // пустой массив поля

		clearInterval(timerId); // удаляем все таймеры
		
		

		tetrisField.onclick = function(e) { // обрабатываем клики мышью
			var box = tetrisField.getBoundingClientRect(); // положение поля на странице
			var x = (e.pageX - box.left - pageXOffset) / k| 0;
			var y = (e.pageY - box.top - pageYOffset)  / k| 0;
			if (3 <= x && x <= 11 && 7 <= y && y <= 8) {
				startGame();
			}
		};

		function drawingMenu() {
			for(var i = 0; i < widthCtx + sizeFieldNextShape; i++) {
				field[i] = [];
				for(var j = 0; j < heightCtx; j++) {
					if (i >= widthCtx) {
						field[i][j] = 0;
					} else {
						field[i][j] = 2;
					}
					if (3 <= i && i <= 11 && 7 <= j && j <= 8) {
						field[i][j] = 3;
					}
				}
			}

			fillField();

			ctx.fillStyle = "black";
	    ctx.font = "14pt Arial";
	    ctx.textAlign = "center";
	    ctx.textBaseline = "middle";
			ctx.fillText("Start game", (3 + (7 - 3) + 0.5) * k, (7 + (8 - 7)) * k);

		}


		 drawingMenu();
	}
	

	// Начало игры
	function startGame() {
		shape = [ [0, 0, 0, 0], [0, 0, 0, 0] ];
		first = true; // первая фигура
		tetrisField.onclick = null;
		SetShape();
		createField();
		clearInterval(timerId);
		fallShape();
		timerId = setInterval(fallShape, 500);
	}

	function gameOver() {
		menuField();
    drawingMenu();
	}


	// var gameField = document.querySelector('.tetris');
	// var btnStart = document.querySelector('#start');

	// btnStart.onclick = function() {
	// 	startGame();
	// 	gameField.classList.add('tetris--active');
	// };


	





	
	
	menuField();





// })();