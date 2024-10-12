import json


cards = []
out = []
with open('cards.csv', 'r') as file:
    for line in file:
        cards.append(line.strip().replace('"', '').split("|"))
     
for card in cards[1:]:
    name, name2, rarity, card_type, color, cost, power, tag, edition, amount, effect, effect2 = card

    thisCard = {
        "name": name,
        "name2": name2,
        "rarity": rarity,
        "color": color,
        "type": card_type,
        "cost": cost,
        "power": power,
        "tag": tag,
        "set": edition,
        "amount": amount,
        "effect": effect,
        "effect2": effect2
    }  

    out.append(thisCard)   

with open('card_data.json', 'w') as f:
    json.dump(out, f, indent=4)