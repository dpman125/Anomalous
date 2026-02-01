function startChat(character) {

    let boss;
    //determine what boss you are chatting with
    console.log(character.dept);
    document.getElementById("MC1").style.display = "none";
    document.getElementById("MC2").style.display = "none";
    document.getElementById("MC3").style.display = "none";
    document.getElementById("MC4").style.display = "none";
    document.getElementById("MC5").style.display = "none";
    document.getElementById("MC6").style.display = "none";
    document.getElementById("MC7").style.display = "none";
    document.getElementById("MC8").style.display = "none";
    document.getElementById("MC9").style.display = "none";
    document.getElementById("MC10").style.display = "none";
    document.getElementById("boss1").style.display = "none";
    document.getElementById("boss2").style.display = "none";
    document.getElementById("boss3").style.display = "none";
    document.getElementById("boss4").style.display = "none";
    document.getElementById("boss5").style.display = "none";
    document.getElementById("boss6").style.display = "none";
    document.getElementById("boss7").style.display = "none";
    document.getElementById("boss8").style.display = "none";
    document.getElementById("boss9").style.display = "none";
    document.getElementById("boss10").style.display = "none";


    switch (character.dept) {
        case "IT":
            boss = LitePlus;
            break;
        case "Files":
            boss = Hal_Emmerich;
            break;
        case "ACNS":
            boss = Babel;
            break;
        case "Security":
            boss = GMcCarthy;
            break;
        case "Finance":
            boss = ElliotBalmer;
            break;
        case "RandD":
            boss = JaceyCole;
            break;
    }
    document.getElementById("bossName").innerText = boss.name;
    document.getElementById("bossImg").src = boss.img;
    document.querySelectorAll("#bossNameChat").forEach(element => {
        element.innerText = boss.name;
    });
}