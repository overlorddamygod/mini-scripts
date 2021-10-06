posiibilities = {
	"rock":"100",
	"paper":"010",
	"scissor":"001"
}

def binaries(player):
	return map(int,list(player))

def winner(player1, player2):
	r1, p1, s1 = binaries(player1)
	r2, p2, s2 = binaries(player2)
    
	w1 = ~((s1 & r2) | (p1 & s2) | (r1 & p2))
	w2 = ~((s1 & p2) | (r1 & s2) | (p1 & r2))

	return "Draw" if w1==w2 else "Player " + ("1" if w1 > w2 else "2")

player1 = posiibilities["scissor"]
player2 = posiibilities["paper"]

print(winner(player1, player2))