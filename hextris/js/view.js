// t: current time, b: begInnIng value, c: change In value, d: duration
function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function renderText(x, y, fontSize, color, text, font) {
    ctx.save();
    if (!font) {
        // font = 'px/0 Roboto';
        font = 'px/0 dosis';
    }

    fontSize *= settings.scale;
    ctx.font = fontSize + font;
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y + (fontSize / 2) - 9 * settings.scale);
    ctx.restore();
}

function drawScoreboard() {
    if (scoreOpacity < 1) {
        scoreOpacity += 0.01;
        textOpacity += 0.01;
    }

    ctx.globalAlpha = textOpacity;
    var scoreSize = 50;
    var scoreString = String(score);
    if (scoreString.length == 6) {
        scoreSize = 43;
    } else if (scoreString.length == 7) {
        scoreSize = 35;
    } else if (scoreString.length == 8) {
        scoreSize = 31;
    } else if (scoreString.length == 9) {
        scoreSize = 27;
    }

    if (gameState === 0) {
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), 'px FontAwesome');
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 170 * settings.scale, 140, "#2c3e50", "HexTaris");
        // renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, trueCanvas.height / 2 + gdy + 100 * settings.scale, 30, "rgb(44,62,80)", 'Play!');
    } else if (gameState != 0 && textOpacity > 0) {
        textOpacity -= 0.05;
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), 'px FontAwesome');
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 170 * settings.scale, 140, "#2c3e50", "HexTaris");
        // renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, trueCanvas.height / 2 + gdy + 100 * settings.scale, 30, "rgb(44,62,80)", 'Play!');
        ctx.globalAlpha = scoreOpacity;
        renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, "rgb(236, 240, 241)", score);
    } else {
        ctx.globalAlpha = scoreOpacity;
        renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, "rgb(236, 240, 241)", score);
    }

    ctx.globalAlpha = 1;
}

function clearGameBoard() {
    drawPolygon(trueCanvas.width / 2, trueCanvas.height / 2, 6, trueCanvas.width / 2, 30, hexagonBackgroundColor, 0, 'rgba(0,0,0,0)');
}

function drawPolygon(x, y, sides, radius, theta, fillColor, lineWidth, lineColor) {
    ctx.fillStyle = fillColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    ctx.beginPath();
    var coords = rotatePoint(0, radius, theta);
    ctx.moveTo(coords.x + x, coords.y + y);
    var oldX = coords.x;
    var oldY = coords.y;
    for (var i = 0; i < sides; i++) {
        coords = rotatePoint(oldX, oldY, 360 / sides);
        ctx.lineTo(coords.x + x, coords.y + y);
        oldX = coords.x;
        oldY = coords.y;
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0)';
}

function toggleClass(element, active) {
    if ($(element).hasClass(active)) {
        $(element).removeClass(active);
    } else {
        $(element).addClass(active);
    }
}

function showText(text) {


    var messages = {
        'paused': "<div class='centeredHeader unselectable'>Paused</div><br><div class='unselectable centeredSubHeader'>Press p to resume</div><div style='height:100px;line-height:100px;cursor:pointer;'></div>",
        // 'pausedMobile': "<div class='centeredHeader unselectable'>Paused</div><br><div class='unselectable centeredSubHeader'>Press <i class='fa fa-play'></i> to resume</div><div style='height:100px;line-height:100px;cursor:pointer;'></div>",
        'pausedMobile': "<div class='centeredHeader unselectable'>Paused</div><div style='height:100px;line-height:100px;cursor:pointer;'></div>",
        'start': "<div class='centeredHeader unselectable' style='line-height:80px;'>Press enter to start</div>",
        'gameover': "<div class='centeredHeader unselectable'>HexTaris</div><br> <div class='centeredHeader unselectable'> Game Over: " + score + " points</div><br><div style='font-size:24px;' class='centeredHeader unselectable'> High Scores:</div><table class='tg' style='margin:0px auto; margin-top: 10px;'> "
         
    };

    if (text == 'paused') {
        if (settings.platform == 'mobile') {
            text = 'pausedMobile';
        }
    }

    if (text == 'gameover') {
        window.lastGameScore = score;

        var allZ = 1;
        var i;

        for (i = 0; i < 3; i++) {
            if (highscores.length > i) {
                messages['gameover'] += "<tr> <th class='tg-031e'>" + (i + 1) + ".</th> <th class='tg-031e'>" + highscores[i] + " points</th> </tr>";
            }
        }

        var restartText;
        if (settings.platform == 'mobile') {
            restartText = 'Tap anywhere to restart!';
        } else {
            restartText = 'Press enter (or click anywhere!) to restart!';
        }

        // messages['gameover'] += "</table><br><div class='unselectable centeredSubHeader'>" + restartText + "</div>";
        messages['gameover'] += "</table><br>";

        if (allZ) {
            for (i = 0; i < highscores.length; i++) {
                if (highscores[i] !== 0) {
                    allZ = 0;
                }
            }
        }

        // $('#startBtn').show();
    }
    //messages['gameover'] += "<div class='fltrt' id='tweetStuff'><a class='tweet' href='https://twitter.com/intent/tweet?text=Can you beat my score of "+ score +" points in  &url=https://itunes.apple.com/us/app/tblock-dx/id909324563?l=ko&ls=1&mt=8' data-lang='en' data-related='hextaris:hextaris'>Share Your Score on Twitter!!!</a></div>"
    //messages['gameover'] += "<div class='fltrt' id='tweetStuff'><a class='tweet share-facebook'><i class='fa fa-facebook' style='width:20px;'></i> Share on Facebook</a></div>"
    //messages['gameover'] += "<br><div class='fltrt' id='tweetStuff'><a class='tweet share-twitter'><i class='fa fa-twitter' style='width:20px;'></i> Share on Twitter</a></div>"
    messages['gameover'] += "<br><br><br><div class='fltrt' id='tweetStuff'><a class='tweet new-game'>Play Again</a></div>"

    $("#overlay").html(messages[text]);
    $("#overlay").fadeIn("1000", "swing");

    if (text == 'gameover') {

        if (settings.platform == 'mobile') {
            $('.tg').css('margin-top', '4px');
        }
    }
}

// New handlers
window.APP_DOWNLOAD_URL = 'https://itunes.apple.com/us/app/tblock-dx/id909324563?l=ko&ls=1&mt=8';
// alert('a');
$(document).on('touchstart', '.share-facebook', function() {
    // alert('hi');
    var shareText = 'I scored ' + window.lastGameScore + ' points in #HexTaris!';                                                        
    window.open('sharefacebook://?action=shareFacebook&shareName='
        + encodeURIComponent(shareText) + '&shareLink=' + encodeURIComponent(window.APP_DOWNLOAD_URL)
        + '&includeScreenshot=1');
    return false;
});

$(document).on('touchstart', '.share-twitter', function() {
    // alert('yo');
    var shareText = 'I scored ' + window.lastGameScore + ' points in #HexTaris!';                                                        
    window.open('sharetwitter://?action=shareTwitter&shareText='
        + encodeURIComponent(shareText) + '&shareLink=' + encodeURIComponent(window.APP_DOWNLOAD_URL)
        + '&includeScreenshot=1');
    return false;
});

$(document).on('touchstart', '.new-game', function() {
    // alert('hello');
    if (gameState == 2 && canRestart) {
        init(1);
        return;
    }
});


function setMainMenu() {
    gameState = 4;
    canRestart = false;
    setTimeout(function() {
        canRestart = 's';
    }, 500);
    $('#restartBtn').show();
    if ($($("#pauseBtn").children()[0]).attr('class').indexOf('pause') == -1) {
        $("#pauseBtnInner").html('<i class="fa fa-pause fa-2x"></i>');
    } else {
        $("#pauseBtnInner").html('<i class="fa fa-play fa-2x"></i>');
    }
}

function hideText() {
    $("#overlay").fadeOut("1000", function() {
        $("#overlay").html("");
    })
}

function gameOverDisplay() {
    $("#attributions").show();
    var c = document.getElementById("canvas");
    c.className = "blur";
    showText('gameover');
    showbottombar();
}

function pause(o) {
    writeHighScores();
    var message;
    if (o) {
        message = '';
    } else {
        message = 'paused';
    }

    var c = document.getElementById("canvas");
    if (gameState == -1) {
        if ($('#helpScreen').is(':visible')) {
            $('#helpScreen').fadeOut(150, "linear");
        }

        $("#pauseBtnInner").html('<i class="fa fa-pause fa-2x"></i>');
        $('.helpText').fadeOut(200, 'linear');
        hideText();
        hidebottombar();
        setTimeout(function() {
            gameState = prevGameState;
        }, 200)

    } else if (gameState != -2 && gameState !== 0 && gameState !== 2) {
        $('.helpText').fadeIn(200, 'linear');
        showbottombar();
        if (message == 'paused') {
            showText(message);
        }

        $("#pauseBtnInner").html('<i class="fa fa-play fa-2x"></i>');
        prevGameState = gameState;
        gameState = -1;
    }
}
