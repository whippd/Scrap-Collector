  const D = x => new OmegaNum(x)
var player = {
  scraps: D(0),
  money: D(0),
  scrapPlus: D(1),
  autoScrapPlus: D(0),
  scrapValue: D(1),
  ore: D(0),
  iron: D(0),
  ironValue: D(1),
  gold: D(0),
  goldValue: D(1),
  diamond: D(0),
  diamondValue: D(1),
  autoCollectorPrice: D(25),
  autoCollectorBought: D(0),
  autoCollectorValue: D(0),
  advertisingPrice: D(200),
  advertisingBought: D(0),
  advertisingValue: D(1),
  companyPrice: D(1e7),
  companyBought: D(0),
  companyValue: D(1),
  pAdvertiserPrice: D(1e45),
  pAdvertiserBought: D(0),
  pAdvertiserValue: D(1),
  minerPrice: D("1e3600"),
  minerValue: D(0),
  minerBought: D(0),
  totalBought: D(1),
  scrapUpgrade: [false, false, false],
  autoBuyer: D(0),
  upgradeUpgrade1: false,
  pickaxe: false,
  autoSell: D(0),
  prestige: D(0),

}

function dev() {
  player.money = player.money.pow(D(1.2))
}

function resetSave() {
  player.scraps = D(0);
  player.money = D(0);
  player.scrapPlus = D(1);
  player.ore = D(0);
  player.iron = D(0);
  player.ironValue = D(0);
  player.gold = D(0);
  player.goldValue = D(0);
  player.diamond = D(0);
  player.diamondValue = D(0);
  player.autoScrapPlus = D(0);
  player.scrapValue = D(1);
  player.autoCollectorPrice = D(25);
  player.autoCollectorBought = D(0);
  player.autoCollectorValue = D(0);
  player.advertisingPrice = D(200);
  player.advertisingBought = D(0);
  player.advertisingValue = D(1);
  player.companyPrice = D(1e7);
  player.companyBought = D(0);
  player.companyValue = D(1);
  player.pAdvertiserPrice = D(1e45);
  player.pAdvertiserBought = D(0);
  player.pAdvertiserValue = D(1);
  player.minerPrice = D("1e3600");
  player.minerValue = D(0);
  player.minerBought = D(0);
  player.totalBought = D(1);
  player.scrapUpgrade = [false, false, false];
  player.autoBuyer = D(0);
  player.upgradeUpgrade1 = false;
  player.pickaxe = false;
  player.autoSell = D(0);
  player.prestige = D(0);
  save()
  $("#AutoBuyer1").css("background-color", "black")
  $("#AutoBuyer2").css("background-color", "black")
  $("#ScrapUpgrade1").css("background-color", "black")
  $("#ScrapUpgrade2").css("background-color", "black")
  $("#ScrapUpgrade3").css("background-color", "black")
  $("#UpgradeUpgrade1").css("background-color", "black")
  $("#pickaxe").css("background-color", "black")
  $("#mine").css("background", "url(https://cdn.discordapp.com/attachments/903119532959367239/910712184567394314/minelocked.png)")
  Location.reload
}
setInterval(save, 5000)
setInterval(autoBuy, 100)
setInterval(autoCollect, 25)

time = Date.now()

function save() {
  window.localStorage.setItem('ScrapCollector', JSON.stringify(player))
  console.log("Saved game!")
}

function softcap(x, s, p) {
  if (x.lt(s)) return x
  return x.div(s).pow(p).mul(s)
}

/*
  x is the number
  s is the softcap start
  p is the softcap power
*/
function autoBuy() {
  for (i = 0; i < 100; i++) {
    if (player.autoBuyer.gte(D(1))) {
      $("#AutoBuyer1").css("background-color", "green");
      buyAutoCollector();
      buyAdvertising();
      if (player.autoBuyer.gte(D(2))) {
        $("#AutoBuyer2").css("background-color", "green")
        buyCompany();
        buyPAdvertiser();
      }
    }
  }
  if (player.scrapUpgrade[0] == true) {
    $("#ScrapUpgrade1").css("background-color", "green")
  }
  if (player.scrapUpgrade[1] == true) {
    $("#ScrapUpgrade2").css("background-color", "green")
  }
  if (player.scrapUpgrade[2] == true) {
    $("#ScrapUpgrade3").css("background-color", "green")
    $("#mine").css("background", "url(https://cdn.discordapp.com/attachments/903119532959367239/910712173507006555/mine.png)")
  }
  if (player.upgradeUpgrade1 == true) {
    $("#UpgradeUpgrade1").css("background-color", "green");
    $("#ores").css("display", "block");
  }
  if (player.pickaxe == true) {
    $("#pickaxe").css("background-color", "green");
  }
  player.autoScrapPlus = player.autoCollectorValue
  if (player.scrapUpgrade[0] == true) {
    player.autoScrapPlus = (player.autoScrapPlus.mul(player.totalBought));
  }
  if (player.scrapUpgrade[1] == true) {
    player.autoScrapPlus = player.autoScrapPlus.times(player.autoScrapPlus.log10(player.autoScrapPlus.add(D(1)).add(D(1))))
  }
  if (player.scrapUpgrade[2] == true) {
    player.autoScrapPlus = player.autoScrapPlus.pow(D(1.2));
  }
  player.scrapPlus = D(1).add(player.autoScrapPlus.div(D(10)))
  changeSps();
  changeSps1();
  changeInventory();
  changePrices();
}

function collect() {
  player.scraps = player.scraps.add(player.scrapPlus);
};

function autoCollect() {
  let diff = (Date.now() - time) / 1000
  time = Date.now()
  if (player.autoSell = D(0)) {
    player.scraps = player.scraps.add(player.autoScrapPlus.mul(diff))
  }
  if (player.pickaxe == false) {
    player.ore = player.ore.add(player.minerValue.mul(diff))
  } else if (player.pickaxe == true) {
    player.ore = player.ore.add(player.minerValue.mul(diff).pow(D(2)))
  }
  if (player.money.gte(D("e1e100"))){
    player.money = D("e1e100")
  }
}


function autoSell() {
  if (player.autoSell == true) {
    console.log(player.autosell)
    sellAll()
  }
}

function sellAll() {
  if (player.minerBought.eq(D(0))) {
    player.money = player.money.add(player.scrapValue.mul((player.scraps.floor())));
  } else if (player.minerBought.gte(D(1)) && player.pickaxe == false) {
    player.money = player.money.add(player.scrapValue.mul((player.scraps.floor())).mul(player.iron.mul(D(1)).mul(player.gold.mul(D(200))).mul(player.diamond.mul(D(2e8))).add(D(1))));
  } else if (player.minerBought.gte(D(1)) && player.pickaxe == true) {
    player.money = player.money.add(player.scrapValue.mul((player.scraps.floor())).mul(player.ironValue).mul(player.goldValue).mul(player.diamondValue));
  }
  player.scraps = player.scraps.sub(player.scraps.floor());
}

function breakOre() {
  player.iron = player.iron.add(player.ore.mul(D(0.99)));
  player.ironValue = D(2.5).pow(player.iron.pow(D(0.2)));
  player.gold = player.gold.add(player.ore.mul(D(0.00999)));
  player.goldValue = D(3).pow(player.gold.pow(D(0.33)));
  player.diamond = player.diamond.add(player.ore.mul(D(0.00001)));
  player.diamondValue = D(9).pow(player.diamond.div(D(2)));
  player.ore = D(0)
}

function buyAutoCollector() {
  if (player.money.gte(player.autoCollectorPrice)) {
    autoCollector();
  }
}

function buyAdvertising() {
  if (player.money.gte(player.advertisingPrice)) {
    advertising();
  }
}

function buyCompany() {
  if (player.money.gte(player.companyPrice)) {
    company();
  }
}

function buyPAdvertiser() {
  if (player.money.gte(player.pAdvertiserPrice)) {
    pAdvertiser();
  }
}

function buyMiner() {
  if (player.money.gte(player.minerPrice)) {
    miner();
  }
}

function buyScrapUpgrade(x) {
  if (player.money.gte(D(1e5)) && player.scrapUpgrade[0] == false && x == 0) {
    player.money = player.money.sub(D(1e5));
    player.scrapUpgrade[0] = true;
  }
  if (player.money.gte(D(1e30)) && player.scrapUpgrade[1] == false && x == 1) {
    player.money = player.money.sub(D(1e30));
    player.scrapUpgrade[1] = true;
  }
  if (player.money.gte(D("1e475")) && player.scrapUpgrade[2] == false && x == 2) {
    player.money = player.money.sub(D("1e475"));
    player.scrapUpgrade[2] = true;
  }
}


function buyAutoBuyer() {
  if (player.money.gte(D(1e50))) {
    if (player.autoBuyer.eq(D(0))) {
      player.money = player.money.sub(D(1e50));
      player.autoBuyer = player.autoBuyer.add(D(1));
    }
  }
}

function buyAutoBuyer2() {
  if (player.money.gte(D(1e200))) {
    if (player.autoBuyer.eq(D(1))) {
      player.money = player.money.sub(D(1e200));
      player.autoBuyer = player.autoBuyer.add(D(1));
    }
  }
}

function buyUpgradeUpgrade1() {
  if (player.money.gte(D("1e680"))) {
    if (player.upgradeUpgrade1 == false) {
      player.money = player.money.sub(D("1e680"));
      player.upgradeUpgrade1 = true;
    }
  }
}

function pickaxe() {
  if (player.money.gte(D("1e3820")) && player.pickaxe == false) {
    player.money = player.money.sub(D("1e3820"));
    player.pickaxe = true;
  }
}

function travel() {
  switchMenu("marketplace");
};

function travelUpgrade() {
  switchMenu("upgradeplace")
};

function travelPerm() {
  switchMenu("permupgradeplace")
};

function travelMine() {
  if (player.upgradeUpgrade1 == true) {
    switchMenu("mine")
  }
}

function goback() {
  switchMenu("main");
};

function autoCollector() {
  player.autoCollectorBought = player.autoCollectorBought.add(D(1))
  player.money = player.money.sub(player.autoCollectorPrice);
  player.autoCollectorValue = D(1.4).pow(player.autoCollectorBought);
  if (player.autoCollectorValue.gt(D(1e35))) {
    player.autoCollectorValue = softcap(player.autoCollectorValue, D(1e35), D(0.3))
  }
  player.autoCollectorPrice = D(25).mul(D(1.5).pow(player.autoCollectorBought));
  if (player.autoCollectorPrice.gt(D(1e60))) {
    player.autoCollectorPrice = softcap(player.autoCollectorPrice, D(1e60), D(2))
  }
  player.scrapPlus = D(1).add(player.autoScrapPlus.div(D(10)))
  changePrices();
  player.totalBought = player.totalBought.add(D(0.2))
}

function advertising() {
  player.advertisingBought = player.advertisingBought.add(D(1))
  player.money = player.money.sub(player.advertisingPrice);
  player.advertisingValue = D(1.45).pow(player.advertisingBought);
  if (player.advertisingValue.gt(D(1e20))) {
    player.advertisingValue = softcap(player.advertisingValue, D(1e50), D(.41));
  }
  player.advertisingPrice = D(200).mul(D(1.525).pow(player.advertisingBought));
  if (player.advertisingPrice.gt(D(1e50))) {
    player.advertisingPrice = softcap(player.advertisingPrice, D(1e50), D(2))
  }
  changePrices();
  player.totalBought = player.totalBought.add(D(0.2))
}

function company() {
  player.companyBought = player.companyBought.add(D(1))
  player.money = player.money.sub(player.companyPrice)
  player.companyValue = D(35).pow(player.companyBought)
  if (player.companyValue.gte(D(1e100))) {
    player.companyValue = softcap(player.companyValue, D(1e100), D(0.3))
  }
  player.companyPrice = D(1e7).mul(D(1e5).pow(player.companyBought));
  if (player.companyPrice.gt(D(1e100))) {
    player.companyPrice = softcap(player.companyPrice, D(1e100), D(2))
  }
  changePrices();
  player.totalBought = player.totalBought.add(D(0.5))
}

function pAdvertiser() {
  if (player.pAdvertiserBought.lt(D(10))) {
    player.pAdvertiserBought = player.pAdvertiserBought.add(D(1))
    player.money = player.money.sub(player.pAdvertiserPrice)
    player.pAdvertiserValue = D(1).add(D(0.1).mul(player.pAdvertiserBought))
    player.pAdvertiserPrice = D(1e45).pow(D(1.3).pow(player.pAdvertiserBought));
  } else if (player.upgradeUpgrade1 == true && player.pAdvertiserBought.lt(D(15))) {
    player.totalBought = player.totalBought.add(D(5))
    player.pAdvertiserBought = player.pAdvertiserBought.add(D(1))
    player.money = player.money.sub(player.pAdvertiserPrice)
    player.pAdvertiserValue = D(1).add(D(0.15).mul(player.pAdvertiserBought))
    player.pAdvertiserPrice = D(1e45).pow(D(1.3).pow(player.pAdvertiserBought));
    player.totalBought = player.totalBought.add(D(5))
  }
  changePrices();
}

function miner() {
  player.minerBought = player.minerBought.add(1)
  player.money = player.money.sub(player.minerPrice)
  player.minerValue = D(1.2).pow(player.minerBought);
  player.minerPrice = D("1e3600").pow(D(1.001).pow(player.minerBought));
  if (player.minerPrice.gt(D("1e3820"))) {
    player.minerPrice = softcap(player.minerPrice, D("1e3820"), D("10"))
    player.minerPrice = softcap(player.minerPrice, D("1e3820"), D("10"))
  }
  changePrices();
}

function changeInventory() {
  $("#money").html("Money: $" + format(player.money, 3) + "");
  if (player.autoScrapPlus.eq(D(1))) {
    changeSps1()
  } else {
    if (player.autoScrapPlus.gt(D(4000)))
      changeSps()
  }
  if (player.scraps.eq(D(1))) {
    $("#scraps").html("You have " + format(player.scraps) + " piece of scrap.");
  } else {
    $("#scraps").html("You have " + format(player.scraps) + " pieces of scraps.");
  }
}

// (below) functions for above
function changeSps1() {
  if (player.autoScrapPlus.lt(D(2)) && player.autoScrapPlus.gt(D(0))) {
    $("#autoScrapPlus").html("You are gaining " + format(player.autoScrapPlus) + " piece of scrap per second.");
  }
}
function changeSps() {
  if (player.autoScrapPlus.gt(D(1))) {
    $("#autoScrapPlus").html("You are gaining " + format(player.autoScrapPlus) + " pieces of scraps per second.");
  }
}

function changePrices() {
  if (player.scrapUpgrade[0] == false) {
    player.scrapValue = player.companyValue.mul(player.advertisingValue).pow(player.pAdvertiserValue);
  } else if (player.scrapUpgrade[0] == true) {
    player.scrapValue = player.totalBought.mul(player.companyValue.mul(player.advertisingValue).pow(player.pAdvertiserValue));
  }
  $("#autoCollector").html("Upgrade your Auto-Collector ($" + format(player.autoCollectorPrice) + ")");
  $("#advertising").html("Advertise ($" + format(player.advertisingPrice) + ")");
  $("#scrapValue").html("Scrap is currently worth $" + format(player.scrapValue) + " per piece of scrap.");
  $("#scrapValue2").html("Scrap is currently worth $" + format(player.scrapValue) + " per piece of scrap.");
  $("#scrapPerClick").html("You are currently getting " + format(player.scrapPlus) + " scrap(s) per click.")
  $("#scrapPerClick2").html("You are currently getting " + format(player.scrapPlus) + " scrap(s) per click.")
  $("#sisterCompany").html("Buy a Sister Company ($" + format(player.companyPrice) + ")")
  if (player.pAdvertiserBought.lt(D(10))) {
    $("#professionalAdvertiser").html("Buy a Professional Advertiser ($" + format(player.pAdvertiserPrice) + ") (^" + format(player.pAdvertiserValue) + ")")
  }
  if (player.pAdvertiserBought.eq(D(10)) && player.upgradeUpgrade1 == false || player.pAdvertiserBought.eq(D(15))) {
    $("#professionalAdvertiser").html("Buy a Professional Advertiser (MAX) (^" + format(player.pAdvertiserValue) + ")")
  } else if (player.upgradeUpgrade1 == true) {
    $("#professionalAdvertiser").html("Buy a Professional Advertiser ($" + format(player.pAdvertiserPrice) + ") (^" + format(player.pAdvertiserValue) + ")")
  }
  $("#miner").html("Buy a Miner ($" + format(player.minerPrice) + ")");
  $("#ore").html("You have " + format(player.ore) + " chunks of ore.");
  $("#iron").html("You have " + format(player.iron) + " pieces of iron.");
  $("#gold").html("You have " + format(player.gold) + " pieces of gold.");
  $("#diamond").html("You have " + format(player.diamond) + " diamonds.");
}

function switchMenu(x) {
  $(".menus").children().css("display", "none");
  $("." + x).css("display", "block");
}
function load() {
  let savedata = JSON.parse(window.localStorage.getItem('ScrapCollector'))
  if (savedata !== undefined) fixSave(player, savedata)
  // get save data, if it exists then fix it
}
function fixSave(main, data) {
  if ((typeof data) == "object" && data != null) {
    // check if it's an object and if it's null because null is a type of object
    Object.keys(data).forEach(i => {
      // loop through each thing in the object
      if (main[i] instanceof OmegaNum) {
        main[i] = new OmegaNum(data[i] || main[i])
        // if it should be a decimal then convert it
      } else if (typeof main[i] == "object") {
        fixSave(main[i], data[i])
        // if it's an object then run through this function with that object
      } else {
        main[i] = data[i]
        // else just set the game data to the save data
      }
    })
    return main
    // returns main to end the function
  }
  else return main
  // if the savedata is undefined/null then don't do anything
}

// copied from UC:R which was made by Flamemaster#9696
load()
changeInventory()
changePrices()