import operator as op
import functools

def ncr(n, r):
    r = min(r, n-r)
    if r == 0:
        return 1
    if r > n or r < 0:
        return 0

    numer = functools.reduce(op.mul, range(n, n-r, -1))
    denom = functools.reduce(op.mul, range(1, r+1))
    return numer//denom

def seq_to_index(Nseq, Eseq, Sseq):
    Nindex = 0
    Eindex = 0
    Sindex = 0

    for ind in range(13, 0, -1):
        Nindex = Nindex + ncr(Nseq[ind - 1], ind)
        Eindex = Eindex + ncr(Eseq[ind - 1], ind)
        Sindex = Sindex + ncr(Sseq[ind - 1], ind)

    Nmax = ncr(52, 13)
    Emax = ncr(39, 13)
    Smax = ncr(26, 13)

    DealIndex = Nindex * Emax * Smax + Eindex * Smax + Sindex

    return DealIndex

def index_to_seq(DealIndex):
    Nmax = ncr(52, 13)
    Emax = ncr(39, 13)
    Smax = ncr(26, 13)

    Sindex = DealIndex % Smax
    Q1 = (DealIndex - Sindex) // Smax

    Eindex = Q1 % Emax
    Nindex = (Q1 - Eindex) // Emax

    Nseq = []
    Eseq = []
    Sseq = []

    for i in range(13, 0, -1):
        for j in range(i, 39 + i):
            if ncr(j, i) > Nindex:
                Nseq.append(j - 1)
                Nindex = Nindex - ncr(j - 1, i)
                break
            elif j == 39 + i - 1:
                Nseq.append(j)
                Nindex = Nindex - ncr(j, i)


    for i in range(13, 0, -1):
        for j in range(i, 26 + i):
            if ncr(j, i) > Eindex:
                Eseq.append(j - 1)
                Eindex = Eindex - ncr(j - 1, i)
                break
            elif j == 26 + i - 1:
                Eseq.append(j)
                Eindex = Eindex - ncr(j, i)

    for i in range(13, 0, -1):
        for j in range(i, 26):
            if ncr(j, i) > Sindex:
                Sseq.append(j - 1)
                Sindex = Sindex - ncr(j - 1, i)
                break
            elif j == 13 + i - 1:
                Sseq.append(j)
                Sindex = Sindex - ncr(j, i)

    Nseq = Nseq[::-1]
    Eseq = Eseq[::-1]
    Sseq = Sseq[::-1]
    return (Nseq, Eseq, Sseq)


def seq_to_hands(Nseq, Eseq, Sseq):
    full_hand = []
    card_count = 0

    Eindex = 0
    Sindex = 0

    Ecard = 0
    Scard = 0

    for i in range(0, 52):
        full_hand.append(" ")

    for i in range(0, 52):
        for Ncard in Nseq:
            if i == Ncard:
                full_hand[i] = "N"


    while (full_hand[Eindex] is not " "):
        Eindex = Eindex + 1

    while (Eindex < 52):
        if card_count == Eseq[Ecard]:
            full_hand[Eindex] = "E"
            Ecard = Ecard + 1
            if Ecard == 13:
                break
        Eindex = Eindex + 1

        if Eindex == 52:
            break
        if full_hand[Eindex] is " ":
            card_count = card_count + 1


    card_count = 0
    while (full_hand[Sindex] is not " "):
        Sindex = Sindex + 1

    while (Sindex < 52):
        if card_count == Sseq[Scard]:
            full_hand[Sindex] = "S"
            Scard = Scard + 1
            if Scard == 13:
                break
        Sindex = Sindex + 1

        if Sindex == 52:
            break
        if full_hand[Sindex] is " ":
            card_count = card_count + 1

    for i in range(0, 52):
        if full_hand[i] is " ":
            full_hand[i] = "W"

    return full_hand

def hands_to_seq(HandString):
    temp_board = list(HandString)
    Nseq = []
    Eseq = []
    Sseq = []

    for i in range(len(temp_board) - 1, -1, -1):
        if temp_board[i] == "N":
            Nseq.append(i)
            del temp_board[i]

    for i in range(len(temp_board) - 1, -1, -1):
        if temp_board[i] == "E":
            Eseq.append(i)
            del temp_board[i]

    for i in range(len(temp_board) - 1, -1, -1):
        if temp_board[i] == "S":
            Sseq.append(i)
            del temp_board[i]

    Nseq = Nseq[::-1]
    Eseq = Eseq[::-1]
    Sseq = Sseq[::-1]

    return (Nseq, Eseq, Sseq)

def hand_conversion(HandString):
    Nhand = []
    Ehand = []
    Shand = []
    Whand = []

    for i in range(0, 52):
        card_string = ""
        if i < 13:
            card_string = card_string + "Spade "
        elif i < 26:
            card_string = card_string + "Heart "
        elif i < 39:
            card_string = card_string + "Diamond "
        else:
            card_string = card_string + "Club "

        card_string = card_string + str(13 - (i % 13))

        if HandString[i] == "N":
            Nhand.append(card_string)
        elif HandString[i] == "E":
            Ehand.append(card_string)
        elif HandString[i] == "S":
            Shand.append(card_string)
        else:
            Whand.append(card_string)

    return (Nhand, Ehand, Shand, Whand)
